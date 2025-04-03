"use server";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import {
  imageSchema,
  profileSchema,
  propertySchema,
  reviewSchema,
  validateWithZodSchema,
} from "./schemas";
import { redirect } from "next/navigation";
import db from "./db";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./supabase";
import { string } from "zod";
import { calculateTotals } from "./calculateTotals";

const getClerkUser = async () => {
  const user = await currentUser();

  if (!user) throw new Error("You must be logged in to access this route.");
  if (!user.privateMetadata.hasProfile) redirect("/profile/create");

  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "Something went wrong...",
  };
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await currentUser();

    if (!user) throw new Error("Please login to create a profile");

    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validatedFields,
      },
    });

    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: { hasProfile: true },
    });
  } catch (error) {
    console.log(error);

    return renderError(error);
  }

  redirect("/");
};

export const fetchProfileImage = async () => {
  const user = await currentUser();

  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: { clerkId: user.id },
    select: { profileImage: true },
  });

  return profile?.profileImage;
};

export const fetchProfileAction = async () => {
  const user = await getClerkUser();
  const profile = await db.profile.findUnique({ where: { clerkId: user.id } });

  if (!profile) redirect("/profile/create");
  return profile;
};

export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getClerkUser();
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await db.profile.update({
      where: { clerkId: user.id },
      data: { ...validatedFields },
    });
    revalidatePath("/profile");
    return { message: "Profile updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getClerkUser();
    const image = formData.get("image");
    const validatedFile = validateWithZodSchema(imageSchema, { image });

    const imageUrl = await uploadImage(validatedFile.image);

    await db.profile.update({
      where: { clerkId: user.id },
      data: { profileImage: imageUrl },
    });
    revalidatePath("/profile");
    return { message: "Image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const createPropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getClerkUser();

  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;

    const validatedFields = validateWithZodSchema(propertySchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    const fullPath = await uploadImage(validatedFile.image);

    await db.property.create({
      data: {
        ...validatedFields,
        image: fullPath,
        profileId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/");
};

export const fetchAllProperties = async ({
  search = "",
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const properties = await db.property.findMany({
    where: {
      category,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { tagline: { contains: search, mode: "insensitive" } },
      ],
    },
    select: {
      image: true,
      id: true,
      name: true,
      country: true,
      price: true,
      tagline: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return properties;
};

export const fetchFavoriteId = async ({
  propertyId,
}: {
  propertyId: string;
}) => {
  const user = await getClerkUser();

  const favorite = await db.favorite.findFirst({
    where: { profileId: user.id, propertyId },
  });

  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  favoriteId: string | null;
  propertyId: string;
  pathname: string;
}): Promise<{ message: string }> => {
  const { propertyId, favoriteId, pathname } = prevState;

  try {
    const user = await getClerkUser();

    if (favoriteId) {
      await db.favorite.delete({ where: { id: favoriteId } });
    } else {
      await db.favorite.create({ data: { profileId: user.id, propertyId } });
    }

    revalidatePath(pathname);
    return {
      message: favoriteId ? "Removed from favorite" : "Added to favorite",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAllFavorites = async () => {
  const user = await getClerkUser();
  const properties = await db.favorite.findMany({
    where: { profileId: user.id },
    select: {
      property: {
        select: {
          id: true,
          image: true,
          name: true,
          tagline: true,
          country: true,
          price: true,
        },
      },
    },
  });

  return properties.map((favorite) => {
    return favorite.property;
  });
};

export const fetchPropertyDetails = async (propertyId: string) => {
  const property = await db.property.findUnique({
    where: { id: propertyId },
    include: {
      profile: true,
      bookings: { select: { checkIn: true, checkOut: true } },
    },
  });

  return property;
};

export const createReviewAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getClerkUser();

  try {
    const rawData = Object.fromEntries(formData);
    const validatedData = validateWithZodSchema(reviewSchema, rawData);
    await db.review.create({ data: { ...validatedData, profileId: user.id } });

    revalidatePath(`/properties/${validatedData.propertyId}`);
    return { message: "Review created successfully." };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchPropertyReviews = async (propertyId: string) => {
  const reviews = await db.review.findMany({
    where: { propertyId },
    select: {
      id: true,
      rating: true,
      comment: true,
      profile: { select: { profileImage: true, firstName: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return reviews;
};

export const fetchPropertyReviewsByUser = async () => {
  const user = await getClerkUser();

  const reviews = await db.review.findMany({
    where: { profileId: user.id },
    select: {
      id: true,
      rating: true,
      comment: true,
      property: { select: { image: true, name: true } },
    },
  });

  return reviews;
};

export const deleteReviewAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getClerkUser();
  const reviewId = formData.get("reviewId") as string;

  try {
    await db.review.delete({ where: { id: reviewId, profileId: user.id } });
    revalidatePath("/reviews");

    return { message: "Review deleted successfully." };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchPropertyRating = async (propertyId: string) => {
  const ratings = await db.review.groupBy({
    by: ["propertyId"],
    _avg: { rating: true },
    _count: { rating: true },
    where: { propertyId },
  });

  return {
    rating: ratings[0]?._avg.rating?.toFixed(1) ?? 0,
    count: ratings[0]?._count.rating ?? 0,
  };
};

export const reviewExistsByUser = async (propertyId: string) => {
  const user = await getClerkUser();

  const review = await db.review.findFirst({
    where: { propertyId, profileId: user.id },
    select: { id: true },
  });

  return review;
};

export const createBookingAction = async (prevState: {
  propertyId: string;
  checkIn: Date;
  checkOut: Date;
}): Promise<{ message: string }> => {
  const user = await getClerkUser();
  const { propertyId, checkIn, checkOut } = prevState;

  const property = await db.property.findUnique({
    where: { id: propertyId },
    select: { price: true },
  });

  if (!property) {
    return { message: "Property does not exists" };
  }

  const { totalNights, subTotal, cleaning, service, taxes, orderTotal } =
    calculateTotals({ checkIn, checkOut, price: property?.price });

  try {
    await db.booking.create({
      data: {
        profileId: user.id,
        propertyId,
        orderTotal,
        totalNights,
        checkIn,
        checkOut,
      },
    });
  } catch (error) {
    return renderError(error);
  }

  redirect("/bookings");
};

export const fetchAllBookings = async () => {
  const user = await getClerkUser();

  const bookings = await db.booking.findMany({
    where: { profileId: user.id },
    include: { property: { select: { name: true, country: true, id: true } } },
    orderBy: { createdAt: "desc" },
  });

  return bookings;
};

export const deleteBookingAction = async (prevState: {
  bookingId: string;
}): Promise<{ message: string }> => {
  const user = await getClerkUser();

  try {
    await db.booking.delete({
      where: { id: prevState.bookingId, profileId: user.id },
    });
    revalidatePath("/bookings");
    return { message: "Booking deleted successfully" };
  } catch (error) {
    return renderError(error);
  }
};


export const fetchRentals = async () => {
  
  const user = await getClerkUser();
  
  const rentals = await db.property.findMany({where: {profileId: user.id}})
}

export const deleteRentalAction = async (prevState: {
  propertyId: string;
}): Promise<{ message: string }> => {

  const user = await getClerkUser();
  const { propertyId } = prevState;

  try {
    await db.property.delete({ where: { id: propertyId, profileId: user.id } });
    revalidatePath("/rentals");

    return { message: "Property deleted successfully." };
  } catch (error) {
    return renderError(error);
  }
};



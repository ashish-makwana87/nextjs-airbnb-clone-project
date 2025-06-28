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
import { calculateTotals } from "./calculateTotals";
import { formatDate } from "./format";
import { count } from "console";

const getClerkUser = async () => {
  const user = await currentUser();

  if (!user) throw new Error("You must be logged in to access this route.");
  if (!user.privateMetadata.hasProfile) redirect("/profile/create");

  return user;
};

const getAdminUser = async () => {
  const user = await getClerkUser();

  if (user.id !== process.env.ADMIN_USERID) redirect("/");
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
      city: true,
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
          city: true,
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

export const reviewExistsByUser = async ({
  propertyId,
  userId,
}: {
  propertyId: string;
  userId: string;
}) => {
  const review = await db.review.findFirst({
    where: { propertyId, profileId: userId },
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

  const rentals = await db.property.findMany({
    where: { profileId: user.id },
    select: { id: true, name: true, price: true },
  });

  const rentalsWithTotals = await Promise.all(
    rentals.map(async (rental) => {
      const totalNightSum = await db.booking.aggregate({
        where: { propertyId: rental.id },
        _sum: { totalNights: true },
      });

      const totalRevenueSum = await db.booking.aggregate({
        where: { propertyId: rental.id },
        _sum: { orderTotal: true },
      });

      return {
        ...rental,
        totalNightsSum: totalNightSum._sum.totalNights,
        totalRevenueSum: totalRevenueSum._sum.orderTotal,
      };
    })
  );

  return rentalsWithTotals;
};

export const deleteRentalAction = async (prevState: {
  propertyId: string;
}): Promise<{ message: string }> => {
  const user = await getClerkUser();
  const { propertyId } = prevState;

  try {
    await db.property.delete({ where: { id: propertyId, profileId: user.id } });
    revalidatePath("/rentals");
    return { message: "Property deleted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchRentalDetails = async (propertyId: string) => {
  const user = await getClerkUser();

  const rental = await db.property.findUnique({
    where: { id: propertyId, profileId: user.id },
  });

  return rental;
};

export const updatePropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getClerkUser();
  const propertyId = formData.get("id") as string;

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(propertySchema, rawData);

    await db.property.update({
      where: { id: propertyId, profileId: user.id },
      data: { ...validatedFields },
    });
    revalidatePath(`rentals/${propertyId}/edit`);
    return { message: "Property updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const updatePropertyImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getClerkUser();
  const image = formData.get("image") as File;
  const propertyId = formData.get("id") as string;
  const validatedFile = validateWithZodSchema(imageSchema, { image });
  const imageUrl = await uploadImage(validatedFile.image);

  try {
    await db.property.update({
      where: { id: propertyId, profileId: user.id },
      data: { image: imageUrl },
    });

    revalidatePath(`/property/${propertyId}/edit`);

    return { message: "Image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchStats = async () => {
  const user = await getAdminUser();

  const totalUsers = await db.profile.count();
  const totalProperties = await db.property.count();
  const totalBookings = await db.booking.count();

  return { totalBookings, totalProperties, totalUsers };
};

export const fetchChartsData = async () => {
  const user = await getAdminUser();

  const date = new Date();
  date.setMonth(date.getMonth() - 6);
  const sixMonthsAgo = date;

  const bookings = await db.booking.findMany({
    where: { createdAt: { gte: sixMonthsAgo } },
    orderBy: { createdAt: "asc" },
  });

  const bookingsPerMonth = bookings.reduce((total, current) => {
    const month = formatDate(current.createdAt, true);
 
   const existingMonth = total.find((item) => item.month === month); 
   
   if(!existingMonth) {total.push({month: month, count: 1})} else {
    existingMonth.count = existingMonth.count + 1; 
   } 

    return total;

  }, [] as Array<{month:string, count:number}>);
  
  console.log(bookingsPerMonth)

  return bookingsPerMonth;
};

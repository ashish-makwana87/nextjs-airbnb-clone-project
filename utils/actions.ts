"use server";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { imageSchema, profileSchema, propertySchema, validateWithZodSchema } from "./schemas";
import { redirect } from "next/navigation";
import db from "./db";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./supabase";

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

export const createPropertyAction = async (prevState:any, formData:FormData):Promise<{message: string}> => {

try {
  const user = await getClerkUser();
  const rawData = Object.fromEntries(formData.entries())
  const validatedFields = validateWithZodSchema(propertySchema, rawData)

  return {message: 'Property created successfully'}
} catch (error) {
  
  return renderError(error)
}


} 


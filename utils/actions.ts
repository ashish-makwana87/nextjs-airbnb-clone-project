"use server";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { profileSchema } from "./schemas";
import { redirect } from "next/navigation";
import db from "./db";

const getClerkUser = async () => {
  const user = await currentUser();

  if (!user) throw new Error("You must be logged in to access this route.");
  if (!user.privateMetadata.hasProfile) redirect("/profile/create");

  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "something went wrong...",
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
    const validatedFields = profileSchema.parse(rawData);

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

  const profileImage = await db.profile.findUnique({
    where: { id: user.id },
    select: { profileImage: true },
  });

  return profileImage?.profileImage;
};

export const fetchProfileAction = async () => {
  const user = await getClerkUser();
  const profile = await db.profile.findUnique({ where: { clerkId: user.id } });

  if (!profile) redirect("/profile/create");
  return profile;
};

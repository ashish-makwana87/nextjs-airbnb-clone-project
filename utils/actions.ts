'use server'
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { profileSchema } from "./schemas";
import { redirect } from "next/navigation";
import db from './db';

const getClerkUser = async () => {
 
 const user = await currentUser()
 
 if(!user) {
  redirect('/')
 }
 return user; 
}


const renderError = (error:unknown): {message: string} => {

 return {message: error instanceof Error ? error.message : 'something went wrong...'}
}

export const createProfileAction = async (prevState:any, formData:FormData):Promise<{message: string}> => {

const user = await getClerkUser();

try {
 const rawData = Object.fromEntries(formData);
 const validatedFields = profileSchema.parse(rawData);

 await db.profile.create({data: {
  clerkId: user.id,
  email: user.emailAddresses[0].emailAddress,
  profileImage: user.imageUrl ?? '',
  ...validatedFields
 }});

 await clerkClient.users.updateUserMetadata(user.id, {
  privateMetadata: {hasProfile: true}
 })

} catch (error) {
 console.log(error);

 return renderError(error);
}

redirect('/');
}
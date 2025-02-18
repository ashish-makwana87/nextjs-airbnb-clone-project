import { z, ZodSchema } from "zod";

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be of at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be of at least 2 characters" }),
  username: z
    .string()
    .min(2, { message: "Username must be of at least 2 characters" }),
});

export const propertySchema = z.object({
 name: z.string().min(2, {message: 'Name must be of at least 2 characters'})
})


export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((item) => item.message);

    throw new Error(errors.join(", "));
  }

  return result.data;
}

export const imageSchema = z.object({
  image: validateImage(),
});

function validateImage() {
  const maxSize = 1024 * 1024;
  const acceptedFileTypes = ["image/"];

  return z
    .instanceof(File)
    .refine((file) => {
      return file.size <= maxSize;
    }, "Image must be less than 1MB")
    .refine((file) => {
      return acceptedFileTypes.some((item) => {
        return file.type.startsWith(item);
      });
    }, "Invalid file type");
}

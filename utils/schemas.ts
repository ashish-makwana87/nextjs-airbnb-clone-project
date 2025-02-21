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
  name: z
    .string()
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .max(100, {
      message: "name must be less than 100 characters.",
    }),
  tagline: z
    .string()
    .min(2, {
      message: "tagline must be at least 2 characters.",
    })
    .max(100, {
      message: "tagline must be less than 100 characters.",
    }),
  category: z.string(),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "description must be between 10 and 1000 words.",
    }
  ),
  country: z.string(),
  amenities: z.string(),
  price: z.coerce.number().int().min(0, {
    message: "price must be a positive number.",
  }),
  guests: z.coerce.number().int().min(0, {
    message: 'guest amount must be a positive number.',
  }),
  bedrooms: z.coerce.number().int().min(0, {
    message: 'bedrooms amount must be a positive number.',
  }),
  beds: z.coerce.number().int().min(0, {
    message: 'beds amount must be a positive number.',
  }),
  baths: z.coerce.number().int().min(0, {
    message: 'baths amount must be a positive number.',
  })
});

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

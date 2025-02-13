import { z, ZodSchema } from 'zod';


export const profileSchema = z.object({
 firstName: z.string().min(2, {message: 'First name must be of at least 2 characters'}),
 lastName: z.string().min(2, {message: 'Last name must be of at least 2 characters'}),
 username: z.string().min(2, {message: 'Username must be of at least 2 characters'})
})



export function validateWithZodSchema<T>(schema:ZodSchema<T>, data:unknown):T {

const result = schema.safeParse(data);

if(!result.success) {
 const errors = result.error.errors.map((item) => item.message);

throw new Error(errors.join(', '))
}

return result.data;
}









































































































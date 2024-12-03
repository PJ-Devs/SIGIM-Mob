import { z } from 'zod';

export const supplierSchema = z.object({
  name: z
    .string({ message: "El nombre del proveedor es obligatorio." })
    .min(5, { message: "El nombre del proveedor es obligatorio." })
    .max(60, {
      message: "El nombre del proveedor no debe exceder 60 caracteres.",
    }),
  email: z.optional(
    z.string()
    .email({ message: "El correo electrónico no es válido." })),
  phone_number: z.optional(z.string()),
  NIT: z.optional(z.string())
});

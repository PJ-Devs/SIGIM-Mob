import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string({ message: "El nombre de la categoría es obligatorio." })
    .min(5, { message: "El nombre de la categoría es obligatorio." })
    .max(60, { message: "El nombre de la categoría no debe exceder 60 caracteres." }),
  description: z.string({ message: "La descripción de la categoría es obligatoria." })
    .min(10, { message: "La descripción de la categoría es obligatoria." })
    .max(255, { message: "La descripción de la categoría no debe exceder 255 caracteres." }),
});
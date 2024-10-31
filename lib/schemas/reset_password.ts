import * as z from "zod";
const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;

export const resetPasswordSchema = z
.object({
  password: z
    .string({ message: "Este campo es obligatorio" })
    .regex(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]*$/, {
      message:
        "La contraseña solo puede contener caracteres alfanuméricos y caracteres especiales válidos.",
    })
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .refine((val) => !val.includes("ñ"), {
      message: "La contraseña no puede contener la letra 'ñ'.",
    })
    .refine((val) => specialCharacters.test(val), {
      message:
        "La contraseña debe contener al menos un carácter especial válido.",
    }),
    confirm_password: z.string({ message: "Este campo es obligatorio" }),
})
.refine((data) => data.password === data.confirm_password, {
  message: "Las contraseñas deben ser iguales",
  path: ["confirm_password"],
});
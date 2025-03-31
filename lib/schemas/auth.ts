import { z } from 'zod';

const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;

export const LoginSchema = z.object({
    email: z.string({ message: "El correo es obligatorio." })
      .email({ message: "El correo electrónico no es válido." })
      .min(1, { message: "El correo es obligatorio." }),
  
      password: z.string({ message: "Este campo es obligatorio" })
      .regex(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]*$/, { message: "La contraseña solo puede contener caracteres alfanuméricos y caracteres especiales válidos." })
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
      .refine(val => !val.includes('ñ') && !val.includes('Ñ'), { message: "La contraseña no puede contener la letra 'ñ' ni 'Ñ'." })    
/*       .refine(val => specialCharacters.test(val), { message: "La contraseña debe contener al menos un carácter especial válido." })
 */  });

export const RegisterSchema  = z.object({
    enterprise_email: z.string({ message: "El correo es obligatorio." })
      .email({ message: "El correo electrónico no es válido." })
      .min(1, { message: "El correo es obligatorio." }),
    
    enterprise_name: z.string({ message: "El nombre de la empresa es obligatorio." })
      .min(1, { message: "El nombre de la empresa es obligatorio." })
      .max(100, { message: "El nombre de la empresa no debe exceder 100 caracteres." }),
      phone_number: z.preprocess(
        (val) => (typeof val === "string" ? parseInt(val, 10) : val),
        z.number({ message: "El valor debe ser un numero" })
      ),
    enterprise_NIT: z.string({ message: "El NIT de la empresa es obligatorio." })
      .min(1, { message: "El NIT de la empresa es obligatorio." }),

    owner_password:z.string({ message: "Este campo es obligatorio" })
    .regex(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]*$/, { message: "La contraseña solo puede contener caracteres alfanuméricos y caracteres especiales válidos." })
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .refine(val => !val.includes('ñ'), { message: "La contraseña no puede contener la letra 'ñ'." })
    .refine(val => specialCharacters.test(val), { message: "La contraseña debe contener al menos un carácter especial válido." }),
    owner_name: z.string({ message: "El nombre del propietario es obligatorio." })
      .min(1, { message: "El nombre del propietario es obligatorio." })
      .max(100, { message: "El nombre del propietario no debe exceder 100 caracteres." }),
  
    owner_email: z.string({ message: "El correo electrónico es obligatorio." })
      .email({ message: "El correo electrónico no es válido." })
      .min(1, { message: "El correo electrónico es obligatorio." }),
  });

export const EmployeeSchema = z.object({
    email: z.string({ message: "El correo es obligatorio." })
      .email({ message: "El correo electrónico no es válido." })
      .min(1, { message: "El correo es obligatorio." }),
    
    name: z.string({ message: "El nombre es obligatorio." })
      .min(1, { message: "El nombre es obligatorio." })
      .max(100, { message: "El nombre no debe exceder 100 caracteres." }),
  });
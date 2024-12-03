import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string({ message: "El nombre de la categoría es obligatorio." })
    .min(5, { message: "El nombre de la categoría es obligatorio." })
    .max(60, {
      message: "El nombre de la categoría no debe exceder 60 caracteres.",
    }),
  description: z
    .string({ message: "La descripción de la categoría es obligatoria." })
    .min(10, { message: "La descripción de la categoría es obligatoria." })
    .max(255, {
      message: "La descripción de la categoría no debe exceder 255 caracteres.",
    }),
});

export const createProductSchema = z
  .object({
    name: z
      .string({ message: "El nombre del producto es obligatorio." })
      .min(5, {
        message: "El nombre del producto debe tener al menos 5 caracteres.",
      })
      .max(60, {
        message: "El nombre del producto no debe exceder 60 caracteres.",
      }),
    description: z
      .string({ message: "La descripción del producto es obligatoria." })
      .min(10, { message: "La descripción debe tener al menos 10 caracteres." })
      .max(255, { message: "La descripción no debe exceder 255 caracteres." }),
    supplier_price: z.preprocess(
      (val) => (typeof val === "string" ? parseFloat(val) : val),
      z.number({ message: "El precio de proveedor es obligatorio." }).min(1, {
        message: "El precio de proveedor debe ser mayor a 0.",
      })
    ),
    sale_price: z.preprocess(
      (val) => (typeof val === "string" ? parseFloat(val) : val),
      z.number({ message: "El precio de venta es obligatorio." }).min(1, {
        message: "El precio de venta debe ser mayor a 0.",
      })
    ),
    stock: z.preprocess(
      (val) => (typeof val === "string" ? parseInt(val, 10) : val),
      z.number({ message: "El stock del producto es obligatorio." }).min(1, {
        message: "El stock debe ser al menos 1 unidad.",
      })
    ),
    minimal_safe_stock: z.preprocess(
      (val) => (typeof val === "string" ? parseInt(val, 10) : val),
      z.number({ message: "El stock mínimo seguro es obligatorio." }).min(1, {
        message: "El stock mínimo seguro debe ser al menos 1 unidad.",
      })
    ),
    discount: z.preprocess(
      (val) => (typeof val === "string" ? parseFloat(val) : val),
      z
        .number({ message: "El descuento del producto es obligatorio." })
        .min(0, { message: "El descuento no puede ser menor a 0%." })
        .max(100, { message: "El descuento no puede exceder el 100%." })
    ),
  })
  .refine((data) => data.sale_price > data.supplier_price, {
    message: "El precio de venta debe ser mayor que el precio de proveedor.",
    path: ["sale_price"],
  });

export const updateStockSchema = z.object({
  stock_change: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z
      .number({ message: "La cantidad es obligatoria." })
      .min(1, { message: "La cantidad debe ser mayor a 0" })
  ),
});

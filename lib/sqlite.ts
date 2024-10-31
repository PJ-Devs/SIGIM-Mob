import * as SQLite from "expo-sqlite";
import { Product, User } from "../types/products";

let db: any = null;

export const initializeDB = async (db: SQLite.SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT,
      description TEXT,
      status TEXT,
      stock INTEGER,
      supplier_price REAL,
      sale_price REAL,
      thumbnail TEXT,
      barcode TEXT,
      minimal_safe_stock INTEGER,
      enterprise_id INTEGER,
      category_id INTEGER,
      supplier_id INTEGER
    );
    CREATE TABLE IF NOT EXISTS user_sessions (
      email TEXT NOT NULL,
      name TEXT NOT NULL
    );
  `);
};

export const saveProduct = async (db: SQLite.SQLiteDatabase, product: Product): Promise<void> => {
  const query = `
    INSERT OR REPLACE INTO products (
      id, name, description, status, stock, supplier_price, sale_price, thumbnail, barcode, minimal_safe_stock, enterprise_id, category_id, supplier_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    const result = await db.runAsync(query, [
      product.id?.toString() || null,
      product.name,
      product.description,
      product.status,
      product.stock,
      product.supplier_price,
      product.sale_price,
      product.thumbnail,
      product.barcode,
      product.minimal_safe_stock,
      product.enterprise_id,
      product.category_id,
      product.supplier_id,
    ]);

    console.log("Producto guardado localmente:", result);
  } catch (error) {
    console.error("Error al guardar producto:", error);
  }
};

export const saveUserData = async (db: SQLite.SQLiteDatabase, user: User): Promise<void> => {
  const query = `
    INSERT OR REPLACE INTO user_sessions (
       name, email
    ) VALUES (?, ?);
  `;
      const result = await db.runAsync(query, [user.name, user.email]);

      console.log(
        "Información del usuario guardada localmente:",
        result.changes
      );
  
};

export const getProducts = async (db: SQLite.SQLiteDatabase): Promise<Product[]> => {
  const query = "SELECT * FROM products";
  const results = await db.getAllAsync<Product>(query);
  return results;
};

export const closeDBConnection = async (): Promise<void> => {
  if (db) {
    await db.closeAsync();
    console.log("Conexión a la base de datos cerrada.");
  }
};

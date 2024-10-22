import * as SQLite  from 'expo-sqlite';
import { Product,   User } from "../types/products";

let db: any = null;

const initializeDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('test.db'); 

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
      CREATE TABLE IF NOT EXISTS User_sessions (
        email TEXT NOT NULL,
        name TEXT NOT NULL
      );
        CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT
    );
    `);

 
  }
};

export const saveProduct = async (product: Product): Promise<void> => {
  const query = `
    INSERT OR REPLACE INTO products (
      id, name, description, status, stock, supplier_price, sale_price, thumbnail, barcode, minimal_safe_stock, enterprise_id, category_id, supplier_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  await initializeDB(); 

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
      product.supplier_id
    ]);
    
    console.log('Producto guardado localmente:', result);
  } catch (error) {
    console.error('Error al guardar producto:', error);
  }
};

export const saveUserData = async (user: User): Promise<void> => {
  const query = `
    INSERT OR REPLACE INTO User_sessions (
       name, email
    ) VALUES (?, ?);
  `;

  await initializeDB(); 

  try {
    await db.withTransactionAsync(async () => {
      const result = await db.runAsync(query, [
        user.name,        
        user.email,        
      ]);
      
      console.log('Información del usuario guardada localmente:', result.changes);
    });
  } catch (error) {
    console.error('Error al guardar usuario:', error);
  }
};

export const getProducts = async (callback: (products: Product[]) => void): Promise<void> => {
  const query = 'SELECT * FROM products';
  await initializeDB(); 
  const results = await db.getAllAsync<Product>(query);
  callback(results);
};

export const saveUserToken = async (token: string): Promise<void> => {
  const query = `
    INSERT OR REPLACE INTO users (id, token) 
    VALUES (1, ?);
  `;

  await initializeDB(); 
  
  await db.runAsync(query, [token]);
  console.log('Token de usuario guardado.');
};

export const getOfflineToken = async (): Promise<string | null> => {
  const query = 'SELECT token FROM user WHERE id = 1';
  
  await initializeDB(); 
  
  const resultSet = await db.getAllAsync<{ token: string }>(query);
  if (resultSet.length > 0) {
    return resultSet[0].token;
  }
  
  return null; 
};

export const deleteUserToken = async (): Promise<void> => {
  const query = 'DELETE FROM user WHERE id = 1';
  await initializeDB(); 
  await db.runAsync(query);
  console.log('Token de usuario eliminado.');
};

export const closeDBConnection = async (): Promise<void> => {
  if (db) {
    await db.closeAsync();
    console.log('Conexión a la base de datos cerrada.');
  }
};
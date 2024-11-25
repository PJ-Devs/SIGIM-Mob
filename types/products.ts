type Product = {
  id?: number; 
  name: string;
  description: string;
  stock: number;
  supplier_price: number;
  sale_price: number;
  thumbnail: string;
  barcode: string;
  minimal_safe_stock: number;
  discount: number;
  enterprise_id: number;
  category: Category;
  supplier_id: number;
}

type Category = {
  id: number;
  name: string;
  status: string;
  description: string;
}

// ----------------------------------------------------------

type RootObject = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

type DTOEnterprise = {
  name: string;
  NIT: string;
  email: string;
  phoneNumber: string;
};

type RegisterEnterpriseFormat = {
  enterprise_name: string,
  enterprise_NIT:string,
  enterprise_email: string,
  phone_number: string,
}

type RegisterOwnerFormat = {
 owner_name: string,
  owner_email: string,
  owner_password: string,
}

type DTOEnterpriseColaborator = {
  name: string;
  email: string;
  accessCode?: string;
};

type Role = {
  id: number;
  name: string;
}

type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
}


export type { RootObject, Product,Role, DTOEnterprise, DTOEnterpriseColaborator, RegisterEnterpriseFormat, RegisterOwnerFormat, User, Category };
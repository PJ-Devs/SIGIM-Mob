type RootObject = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

type Meta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

type Dimensions = {
  width: number;
  height: number;
  depth: number;
}

type DTOEnterprise = {
  name: string;
  NIT: string;
  email: string;
  phoneNumber: string;
  currency: 'USD' | 'COP';
};

type RegisterEnterpriseFormat= {
    enterprise_name: string,
  enterprise_NIT:string,
  enterprise_email: string,
  phone_number: string,
  currency: 'USD' | 'COP',
}

type RegisterOwnerFormat= {
 owner_name: string,
  owner_email: string,
  owner_password: string,
}

type DTOEnterpriseColaborator = {
  name: string;
  email: string;
  accessCode?: string;
};

export type { RootObject, Product, Meta, Review, Dimensions, DTOEnterprise, DTOEnterpriseColaborator, RegisterEnterpriseFormat, RegisterOwnerFormat };
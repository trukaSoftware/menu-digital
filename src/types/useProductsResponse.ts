export interface ProductResponse {
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  discount: null;
  companyId: string;
  productCategoriesId: string;
  createdAt: Date;
  updatedAt: Date;
  productsImages: ProductsImage[];
  productsComplements: ProductsComplement[];
}

export interface ProductsComplement {
  productsId: string;
  complementId: string;
  complements: Complements;
}

export interface Complements {
  id: string;
  name: string;
  maxAmount: number;
  createdAt: Date;
  updatedAt: Date;
  items: any[];
}

export interface ProductsImage {
  id: string;
  name: string;
  imageUrl: string;
  alt: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

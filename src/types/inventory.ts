
export interface Product {
  id: string;
  name: string;
  code: string;
  description?: string;
  price: number;
  costPrice?: number;
  quantity: number;
  category?: string;
  unit?: string;
  barcode?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface Product {
  id: string;
  code: string;
  name: string;
  description?: string;
  price: number;
  cost?: number;
  quantity?: number;
  unit?: string;
  category?: string;
  categoryId?: string;
  subcategory?: string;
  subcategoryId?: string;
  brand?: string;
  brandId?: string;
  barcode?: string;
  sku?: string;
  image?: string;
  taxRate?: number;
  createdAt?: string;
  updatedAt?: string;
}

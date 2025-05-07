
export interface Product {
  id: string;
  code: string;
  name: string;
  description?: string;
  category?: string;
  price: number;
  purchasePrice?: number;
  quantity: number;
  inStock: boolean;
  minQuantity?: number;
  maxQuantity?: number;
  unit?: string;
  barcode?: string;
  image?: string;
  status: 'active' | 'inactive' | 'out_of_stock';
  vendorId?: string;
  vendorName?: string;
  warehouseId?: string;
  warehouseName?: string;
  tags?: string[];
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  manager?: string;
  contactInfo?: string;
  status: 'active' | 'inactive';
  notes?: string;
}

export interface StockMovement {
  id: string;
  date: string;
  productId: string;
  productName: string;
  quantity: number;
  type: 'in' | 'out' | 'transfer' | 'adjustment';
  referenceNumber?: string;
  referenceType?: 'purchase' | 'sale' | 'return' | 'transfer' | 'count' | 'adjustment';
  sourceWarehouseId?: string;
  sourceWarehouseName?: string;
  destinationWarehouseId?: string;
  destinationWarehouseName?: string;
  userId: string;
  userName: string;
  notes?: string;
}

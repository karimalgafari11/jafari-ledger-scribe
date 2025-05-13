
export interface Product {
  id: string;
  code: string;
  name: string;
  description?: string;
  category?: string;
  price: number;
  purchasePrice?: number;
  unit?: string;
  quantity: number;
  reorderLevel?: number;
  manufacturer?: string;
  barcode?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  images?: string[];
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  isMain: boolean;
  isActive: boolean;
}

export interface InventoryMovement {
  id: string;
  productId: string;
  warehouseId: string;
  quantity: number;
  direction: 'in' | 'out';
  referenceType: 'purchase' | 'sale' | 'return' | 'transfer' | 'adjustment';
  referenceId: string;
  date: string;
  cost: number;
  notes?: string;
}

export interface StockBalance {
  productId: string;
  warehouseId: string;
  quantity: number;
  lastUpdated: string;
}

export interface InventoryCount {
  id: string;
  name: string;
  date: string;
  warehouseId: string;
  status: 'draft' | 'in-progress' | 'completed';
  notes?: string;
  createdBy: string;
  createdAt: string;
  completedAt?: string;
}

export interface InventoryCountItem {
  id: string;
  countId: string;
  productId: string;
  expectedQuantity: number;
  actualQuantity: number;
  difference: number;
  notes?: string;
}

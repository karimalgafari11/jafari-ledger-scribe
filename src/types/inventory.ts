
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
  // Adding missing properties referenced in the codebase
  isActive?: boolean;
  reorderLevel?: number;
}

export interface FilterOptions {
  category: string;
  status: string;
  warehouse: string;
  minPrice: number;
  maxPrice: number;
}

export interface ReorderItem {
  itemId: string;
  itemName: string;
  availableQuantity: number;
  reorderThreshold: number;
  suggestedOrderQuantity: number;
  warehouseId: string;
  warehouseName: string;
}

export interface StockMovement {
  id: string;
  date: Date;
  type: 'purchase' | 'sale' | 'return' | 'transfer' | 'adjustment' | 'damaged';
  productId: string;
  productName?: string;
  itemName?: string; // Alias for backward compatibility
  quantity: number;
  sourceWarehouse?: string;
  sourceWarehouseName?: string;
  destinationWarehouse?: string;
  destinationWarehouseName?: string;
  userId: string;
  userName: string;
  notes?: string;
}

export interface InventoryCountItem {
  itemId: string;
  itemName: string;
  expectedQuantity: number;
  actualQuantity: number;
  difference: number;
  notes?: string;
}

export interface InventoryCount {
  id: string;
  date: Date;
  warehouseId: string;
  warehouseName: string;
  status: 'draft' | 'in_progress' | 'completed';
  items: InventoryCountItem[];
  notes?: string;
}

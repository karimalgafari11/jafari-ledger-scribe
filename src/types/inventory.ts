
export interface Product {
  id: string;
  code: string;
  name: string;
  description?: string;
  category?: string;
  price: number;
  purchasePrice?: number;
  costPrice?: number;
  unit?: string;
  quantity: number;
  reorderLevel?: number;
  manufacturer?: string;
  barcode?: string;
  brand?: string;
  size?: string;
  sku?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  images?: string[];
  cost?: number; // Added for EditProductPage
  taxRate?: number; // Added for EditProductPage
  subcategory?: string; // Added for EditProductPage
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
  warehouseName: string;
  status: 'draft' | 'in_progress' | 'completed';
  notes?: string;
  createdBy: string;
  createdAt: string;
  completedAt?: string;
  items: InventoryCountItem[];
}

export interface InventoryCountItem {
  id: string;
  countId: string;
  productId: string;
  itemId: string;
  expectedQuantity: number;
  actualQuantity: number;
  difference: number;
  itemName: string;
  notes?: string;
}

export interface StockMovement {
  id: string;
  date: string; // Changed from Date to string for consistency
  productId: string;
  productName: string;
  productCode?: string;
  fromWarehouseId?: string;
  fromWarehouseName?: string;
  toWarehouseId?: string;
  toWarehouseName?: string;
  quantity: number;
  movementType: 'purchase' | 'sale' | 'transfer' | 'adjustment' | 'return';
  referenceNumber?: string;
  notes?: string;
  createdBy?: string;
  createdAt: string;
  // Additional fields for compatibility
  type: 'purchase' | 'sale' | 'transfer' | 'adjustment' | 'return' | 'inbound' | 'outbound' | 'damaged';
  sourceWarehouse?: string;
  sourceWarehouseName?: string;
  destinationWarehouse?: string;
  destinationWarehouseName?: string;
  itemName?: string;
  userId?: string;
  userName?: string;
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

export interface FilterOptions {
  category: string;
  subcategory: string;
  brand: string;
  priceRange: { min: number; max: number };
  inStock: boolean | null;
  status: string;
  warehouse: string;
  minPrice: number;
  maxPrice: number;
}

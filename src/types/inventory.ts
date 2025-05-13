
export interface Product {
  id: string;
  code: string;
  name: string;
  description?: string;
  category?: string;
  price: number;
  purchasePrice?: number;
  costPrice?: number;  // Added for compatibility with existing code
  unit?: string;
  quantity: number;
  reorderLevel?: number;
  manufacturer?: string;
  barcode?: string;
  brand?: string;     // Added for compatibility with existing code
  size?: string;      // Added for compatibility with existing code
  sku?: string;       // Added for compatibility with existing components
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
  warehouseName: string;  // Added for compatibility with existing code
  status: 'draft' | 'in_progress' | 'completed';
  notes?: string;
  createdBy: string;
  createdAt: string;
  completedAt?: string;
  items?: InventoryCountItem[];  // Added for compatibility with existing code
}

export interface InventoryCountItem {
  id: string;
  countId: string;
  productId: string;
  itemId?: string;      // Added for compatibility with existing code
  expectedQuantity: number;
  actualQuantity: number;
  difference: number;
  itemName?: string;    // Added for compatibility with existing code
  notes?: string;
}

// Add missing types referenced in error messages
export interface StockMovement {
  id: string;
  date: string;
  productId: string;
  productName: string;
  productCode: string;
  fromWarehouseId?: string;
  fromWarehouseName?: string;
  toWarehouseId?: string;
  toWarehouseName?: string;
  quantity: number;
  movementType: 'purchase' | 'sale' | 'transfer' | 'adjustment' | 'return';
  referenceNumber: string;
  notes?: string;
  createdBy?: string;
  createdAt: string;
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

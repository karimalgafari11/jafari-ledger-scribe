
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
  
  // Adding missing properties
  isActive: boolean;
  reorderLevel: number;
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
  date: Date; // Changed from string to Date
  productId: string;
  productName: string;
  quantity: number;
  type: 'inbound' | 'outbound' | 'transfer'; // Changed to match usage in code
  referenceNumber?: string;
  referenceType?: 'purchase' | 'sale' | 'return' | 'transfer' | 'count' | 'adjustment';
  sourceWarehouseId?: string;
  sourceWarehouseName?: string;
  destinationWarehouseId?: string;
  destinationWarehouseName?: string;
  userId: string;
  userName: string;
  notes?: string;
  
  // Adding aliases to support existing code
  itemName?: string; // Alias for productName
  sourceWarehouse?: string; // Alias for sourceWarehouseName
  destinationWarehouse?: string; // Alias for destinationWarehouseName
}

// Add missing interfaces referenced in errors
export interface InventoryCountItem {
  itemId: string;
  itemName: string;
  expectedQuantity: number;
  actualQuantity: number;
  difference: number;
  notes: string;
}

export interface InventoryCount {
  id: string;
  date: Date;
  warehouseId: string;
  warehouseName: string;
  status: 'draft' | 'in_progress' | 'completed';
  items: InventoryCountItem[];
  notes: string;
}

export interface FilterOptions {
  category: string;
  status: string;
  warehouse: string;
  minQuantity?: number;
  maxQuantity?: number;
  minPrice?: number;
  maxPrice?: number;
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

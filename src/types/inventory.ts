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
  
  // Add missing properties that are being used in the codebase
  costPrice?: number;
  reorderLevel?: number;
  isActive?: boolean;
  productId?: string; // Used in QuoteToInvoicePage
  size?: string; // Added size property to fix the errors
}

// Add missing inventory-related interfaces
export interface StockMovement {
  id: string;
  date: Date;
  productId: string;
  productName: string;
  itemName: string;
  quantity: number;
  type: "inbound" | "outbound" | "transfer" | "purchase" | "sale" | "return" | "adjustment" | "damaged";
  sourceWarehouse: string;
  sourceWarehouseName: string;
  destinationWarehouse?: string;
  destinationWarehouseName?: string;
  userId: string;
  userName: string;
  notes?: string;
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
  
  // Add the missing properties that are being used in the codebase
  status?: string;
  warehouse?: string;
  minPrice?: number;
  maxPrice?: number;
}

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


export interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
  reorderLevel: number;
  isActive: boolean;
}

export interface FilterOptions {
  category: string;
  status: string;
  minPrice: number;
  maxPrice: number;
}

export interface StockMovement {
  id: string;
  date: Date;
  type: 'inbound' | 'outbound' | 'transfer';
  itemId: string;
  itemName: string;
  quantity: number;
  sourceWarehouse: string;
  destinationWarehouse: string;
  notes: string;
}

export interface InventoryCount {
  id: string;
  date: Date;
  warehouseId: string;
  warehouseName: string;
  status: 'draft' | 'completed';
  items: InventoryCountItem[];
  notes: string;
}

export interface InventoryCountItem {
  itemId: string;
  itemName: string;
  expectedQuantity: number;
  actualQuantity: number;
  difference: number;
  notes: string;
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

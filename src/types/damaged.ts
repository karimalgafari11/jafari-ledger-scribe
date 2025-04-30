
import { Product } from "@/types/inventory";

export interface DamagedItem {
  id: string;
  productId: string;
  productName: string;
  productCode: string;
  manufacturer: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  warehouseId: string;
  warehouseName: string;
  reason: string;
  notes: string;
  date: Date;
  reorderLevel: number;
}

export interface DamagedItemFilterOptions {
  reason: string;
  warehouseId: string;
  startDate: Date | null;
  endDate: Date | null;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

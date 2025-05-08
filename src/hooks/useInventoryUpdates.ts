
import { useState } from "react";
import { InvoiceItem } from "@/types/invoices";
import { Product } from "@/types/inventory";
import { toast } from "sonner";

interface InventoryUpdateOptions {
  allowNegativeInventory?: boolean;
  createMovementRecords?: boolean;
  warehouseId?: string;
  documentId?: string;
  documentType?: 'invoice' | 'purchase' | 'return' | 'transfer';
}

interface InventoryUpdateItem {
  productId: string;
  quantity: number;
  direction: 'increase' | 'decrease';
  success: boolean;
  message?: string;
}

interface UseInventoryUpdatesReturn {
  validateInventory: (items: InvoiceItem[]) => Promise<boolean>;
  updateInventory: (items: InvoiceItem[], type: 'increase' | 'decrease', options?: InventoryUpdateOptions) => Promise<InventoryUpdateItem[]>;
  insufficientItems: InvoiceItem[];
  isValidating: boolean;
  isUpdating: boolean;
}

export const useInventoryUpdates = (): UseInventoryUpdatesReturn => {
  const [insufficientItems, setInsufficientItems] = useState<InvoiceItem[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Simulate fetching a product from inventory
  const getProductFromInventory = async (productId: string): Promise<Product | null> => {
    // In a real app, this would make an API call to get the current product data
    // For now, we'll simulate with mock data
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API delay
    
    // Mock product data - in a real app, this would come from your API
    const mockProduct: Product = {
      id: productId,
      name: "Mock Product",
      code: "MP001",
      price: 100,
      quantity: 10, // For demonstration, assuming we have 10 in stock
      isActive: true,
      reorderLevel: 5
    };
    
    return mockProduct;
  };

  // Validate if inventory has sufficient quantities for all invoice items
  const validateInventory = async (items: InvoiceItem[]): Promise<boolean> => {
    setIsValidating(true);
    try {
      const insufficientItems: InvoiceItem[] = [];
      
      // Check each item against inventory
      for (const item of items) {
        const product = await getProductFromInventory(item.productId);
        if (!product) {
          insufficientItems.push(item);
          continue;
        }

        if (product.quantity < item.quantity) {
          insufficientItems.push(item);
        }
      }

      setInsufficientItems(insufficientItems);
      return insufficientItems.length === 0;
    } finally {
      setIsValidating(false);
    }
  };

  // Update inventory quantities based on invoice items
  const updateInventory = async (
    items: InvoiceItem[], 
    type: 'increase' | 'decrease',
    options: InventoryUpdateOptions = {}
  ): Promise<InventoryUpdateItem[]> => {
    setIsUpdating(true);
    const results: InventoryUpdateItem[] = [];
    
    try {
      // Process each item
      for (const item of items) {
        // Get current product data
        const product = await getProductFromInventory(item.productId);
        if (!product) {
          results.push({
            productId: item.productId,
            quantity: item.quantity,
            direction: type,
            success: false,
            message: "المنتج غير موجود"
          });
          continue;
        }

        // For decrease operations, check if we have enough stock
        if (type === 'decrease' && product.quantity < item.quantity && !options.allowNegativeInventory) {
          results.push({
            productId: item.productId,
            quantity: item.quantity,
            direction: type,
            success: false,
            message: "الكمية غير متوفرة في المخزون"
          });
          continue;
        }

        // In a real app, this would make an API call to update the inventory
        // For simulation, just log what would happen
        console.log(`Update inventory for ${product.name}: ${type === 'decrease' ? '-' : '+'}${item.quantity}`);

        // If createMovementRecords is true, we would also create a movement record
        if (options.createMovementRecords) {
          console.log(`Create movement record: ${options.documentType || 'unknown'} ${options.documentId || 'unknown'}`);
        }

        results.push({
          productId: item.productId,
          quantity: item.quantity,
          direction: type,
          success: true
        });
      }

      return results;
    } catch (error) {
      console.error("Error updating inventory:", error);
      toast.error("حدث خطأ أثناء تحديث المخزون");
      return results;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    validateInventory,
    updateInventory,
    insufficientItems,
    isValidating,
    isUpdating
  };
};


import { useState, useEffect } from "react";
import { ReorderItem } from "@/types/inventory";
import { mockReorderItems } from "@/data/mockReorderItems";

export const useReorderLevels = () => {
  const [reorderItems, setReorderItems] = useState<ReorderItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ReorderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  // Load initial data
  useEffect(() => {
    // In a real app, this would be an API call
    setReorderItems(mockReorderItems);
    setFilteredItems(mockReorderItems);
  }, []);
  
  // Apply filters
  useEffect(() => {
    let result = [...reorderItems];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.itemName.toLowerCase().includes(query)
      );
    }
    
    // Apply warehouse filter
    if (warehouseFilter) {
      result = result.filter(item => 
        item.warehouseName.toLowerCase().includes(warehouseFilter.toLowerCase())
      );
    }
    
    setFilteredItems(result);
  }, [reorderItems, searchQuery, warehouseFilter]);
  
  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  
  const clearSelectedItems = () => {
    setSelectedItems([]);
  };
  
  const createPurchaseOrder = () => {
    // In a real app, this would create a purchase order
    console.log("Creating purchase order for items:", 
      selectedItems.map(id => reorderItems.find(item => item.itemId === id)));
    clearSelectedItems();
  };

  return {
    reorderItems: filteredItems,
    searchQuery,
    setSearchQuery,
    warehouseFilter,
    setWarehouseFilter,
    selectedItems,
    toggleItemSelection,
    clearSelectedItems,
    createPurchaseOrder
  };
};

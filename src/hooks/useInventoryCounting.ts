
import { useState, useEffect } from "react";
import { InventoryCount, InventoryCountItem } from "@/types/inventory";
import { mockInventoryCounts } from "@/data/mockInventoryCounts";

export const useInventoryCounting = () => {
  const [counts, setCounts] = useState<InventoryCount[]>([]);
  const [filteredCounts, setFilteredCounts] = useState<InventoryCount[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"draft" | "completed" | "in_progress" | "">("");
  
  // For viewing a specific count
  const [currentCount, setCurrentCount] = useState<InventoryCount | null>(null);
  
  // For creating a new count
  const [isCreatingCount, setIsCreatingCount] = useState(false);
  const [newCountWarehouse, setNewCountWarehouse] = useState("");
  const [newCountItems, setNewCountItems] = useState<InventoryCountItem[]>([]);

  // Load initial data
  useEffect(() => {
    // In a real app, this would be an API call
    setCounts(mockInventoryCounts);
    setFilteredCounts(mockInventoryCounts);
  }, []);
  
  // Apply filters
  useEffect(() => {
    let result = [...counts];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(count => 
        count.warehouseName.toLowerCase().includes(query) ||
        count.items.some(item => item.itemName.toLowerCase().includes(query))
      );
    }
    
    // Apply warehouse filter
    if (warehouseFilter) {
      result = result.filter(count => 
        count.warehouseName.toLowerCase().includes(warehouseFilter.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter) {
      result = result.filter(count => count.status === statusFilter);
    }
    
    setFilteredCounts(result);
  }, [counts, searchQuery, warehouseFilter, statusFilter]);
  
  const viewCount = (id: string) => {
    const count = counts.find(c => c.id === id);
    if (count) {
      setCurrentCount(count);
    }
  };
  
  const closeCountView = () => {
    setCurrentCount(null);
  };
  
  const startNewCount = () => {
    setIsCreatingCount(true);
    // In a real app, we would fetch items for the specified warehouse
    setNewCountItems([]);
  };
  
  const cancelNewCount = () => {
    setIsCreatingCount(false);
    setNewCountWarehouse("");
    setNewCountItems([]);
  };
  
  const updateItemCount = (itemId: string, actualQuantity: number) => {
    setNewCountItems(prev => 
      prev.map(item => 
        item.itemId === itemId 
          ? { 
              ...item, 
              actualQuantity, 
              difference: actualQuantity - item.expectedQuantity 
            } 
          : item
      )
    );
  };
  
  const saveNewCount = (notes: string) => {
    const newCount: InventoryCount = {
      id: `new-${Date.now()}`,
      date: new Date().toISOString(), // Changed from Date to string
      warehouseId: "new",
      warehouseName: newCountWarehouse,
      status: "draft",
      items: newCountItems,
      notes,
      createdBy: "user-1",
      createdAt: new Date().toISOString(),
      name: `Inventory Count ${Date.now()}`
    };
    
    setCounts(prev => [newCount, ...prev]);
    cancelNewCount();
  };
  
  const completeCount = (id: string) => {
    setCounts(prev => 
      prev.map(count => 
        count.id === id ? { ...count, status: "completed" as const } : count
      )
    );
  };

  return {
    counts: filteredCounts,
    searchQuery,
    setSearchQuery,
    warehouseFilter,
    setWarehouseFilter,
    statusFilter,
    setStatusFilter,
    currentCount,
    viewCount,
    closeCountView,
    isCreatingCount,
    startNewCount,
    cancelNewCount,
    newCountWarehouse,
    setNewCountWarehouse,
    newCountItems,
    setNewCountItems,
    updateItemCount,
    saveNewCount,
    completeCount
  };
};

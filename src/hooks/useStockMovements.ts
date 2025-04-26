
import { useState, useEffect } from "react";
import { StockMovement } from "@/types/inventory";
import { mockStockMovements } from "@/data/mockStockMovements";

interface FilterOptions {
  type: string;
  warehouse: string;
  startDate: Date | null;
  endDate: Date | null;
}

export const useStockMovements = () => {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [filteredMovements, setFilteredMovements] = useState<StockMovement[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    type: "",
    warehouse: "",
    startDate: null,
    endDate: null
  });
  const [selectedMovements, setSelectedMovements] = useState<string[]>([]);

  // Load initial data
  useEffect(() => {
    // In a real app, this would be an API call
    setMovements(mockStockMovements);
    setFilteredMovements(mockStockMovements);
  }, []);

  // Apply search and filters
  useEffect(() => {
    let result = [...movements];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.itemName.toLowerCase().includes(query) ||
        item.sourceWarehouse.toLowerCase().includes(query) || 
        item.destinationWarehouse.toLowerCase().includes(query)
      );
    }
    
    // Apply type filter
    if (filterOptions.type) {
      result = result.filter(item => item.type === filterOptions.type);
    }
    
    // Apply warehouse filter (source or destination)
    if (filterOptions.warehouse) {
      result = result.filter(item => 
        item.sourceWarehouse.toLowerCase().includes(filterOptions.warehouse.toLowerCase()) ||
        item.destinationWarehouse.toLowerCase().includes(filterOptions.warehouse.toLowerCase())
      );
    }
    
    // Apply date range filter
    if (filterOptions.startDate) {
      result = result.filter(item => item.date >= filterOptions.startDate!);
    }
    
    if (filterOptions.endDate) {
      result = result.filter(item => item.date <= filterOptions.endDate!);
    }
    
    setFilteredMovements(result);
  }, [movements, searchQuery, filterOptions]);

  const deleteMovement = (id: string) => {
    setMovements(prev => prev.filter(item => item.id !== id));
    setSelectedMovements(prev => prev.filter(itemId => itemId !== id));
  };

  const toggleMovementSelection = (id: string) => {
    setSelectedMovements(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const clearSelectedMovements = () => {
    setSelectedMovements([]);
  };

  return {
    movements: filteredMovements,
    searchQuery,
    setSearchQuery,
    filterOptions,
    setFilterOptions,
    deleteMovement,
    selectedMovements,
    toggleMovementSelection,
    clearSelectedMovements,
  };
};

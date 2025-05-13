
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
  const [isLoading, setIsLoading] = useState(true);

  // تحميل البيانات الأولية
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // في تطبيق حقيقي، سيكون هنا استدعاء للـ API
        setMovements(mockStockMovements);
        setFilteredMovements(mockStockMovements);
        setIsLoading(false);
      } catch (error) {
        console.error("خطأ في تحميل بيانات المخزون:", error);
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  // تطبيق البحث والتصفية
  useEffect(() => {
    let result = [...movements];
    
    // تطبيق البحث
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.productName?.toLowerCase().includes(query) ||
        item.sourceWarehouseName?.toLowerCase().includes(query) || 
        item.destinationWarehouseName?.toLowerCase().includes(query)
      );
    }
    
    // تطبيق تصفية النوع
    if (filterOptions.type) {
      result = result.filter(item => item.type === filterOptions.type);
    }
    
    // تطبيق تصفية المستودع (المصدر أو الوجهة)
    if (filterOptions.warehouse) {
      result = result.filter(item => 
        (item.sourceWarehouseName?.toLowerCase() || "").includes(filterOptions.warehouse.toLowerCase()) ||
        (item.destinationWarehouseName?.toLowerCase() || "").includes(filterOptions.warehouse.toLowerCase())
      );
    }
    
    // تطبيق تصفية نطاق التاريخ
    if (filterOptions.startDate) {
      result = result.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= filterOptions.startDate!;
      });
    }
    
    if (filterOptions.endDate) {
      result = result.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate <= filterOptions.endDate!;
      });
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
    setMovements,
    searchQuery,
    setSearchQuery,
    filterOptions,
    setFilterOptions,
    deleteMovement,
    selectedMovements,
    toggleMovementSelection,
    clearSelectedMovements,
    isLoading
  };
};

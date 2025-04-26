
import { useState, useEffect } from "react";
import { Product, FilterOptions } from "@/types/inventory";
import { mockProducts } from "@/data/mockProducts";

export const useInventoryProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: "",
    status: "",
    minPrice: 0,
    maxPrice: 0
  });
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Load initial data
  useEffect(() => {
    // Here you would typically fetch from an API
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Apply search and filters
  useEffect(() => {
    let result = [...products];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.code.toLowerCase().includes(query) || 
        item.name.toLowerCase().includes(query) || 
        item.price.toString().includes(query)
      );
    }
    
    // Apply filters
    if (filterOptions.category) {
      result = result.filter(item => 
        item.category.toLowerCase() === filterOptions.category.toLowerCase()
      );
    }
    
    if (filterOptions.status) {
      const isActive = filterOptions.status.toLowerCase() === "active" || 
                      filterOptions.status === "نشط";
      result = result.filter(item => item.isActive === isActive);
    }
    
    if (filterOptions.minPrice > 0) {
      result = result.filter(item => item.price >= filterOptions.minPrice);
    }
    
    if (filterOptions.maxPrice > 0) {
      result = result.filter(item => item.price <= filterOptions.maxPrice);
    }
    
    setFilteredProducts(result);
  }, [products, searchQuery, filterOptions]);

  const deleteProduct = (id: string) => {
    setProducts(prevProducts => prevProducts.filter(item => item.id !== id));
    setSelectedProducts(prev => prev.filter(itemId => itemId !== id));
  };

  const bulkDeleteProducts = () => {
    setProducts(prevProducts => 
      prevProducts.filter(item => !selectedProducts.includes(item.id))
    );
    setSelectedProducts([]);
  };

  const toggleProductSelection = (id: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const clearSelectedProducts = () => {
    setSelectedProducts([]);
  };

  return {
    products: filteredProducts,
    searchQuery,
    setSearchQuery,
    filterOptions,
    setFilterOptions,
    deleteProduct,
    bulkDeleteProducts,
    selectedProducts,
    toggleProductSelection,
    clearSelectedProducts,
  };
};

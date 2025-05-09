
import { useState, useEffect, useRef } from "react";
import { Product } from "@/types/inventory";
import { mockProducts } from "@/data/mockProducts";

export function useProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Update filtered products when search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(mockProducts.slice(0, 50)); // Show first 50 products by default
    } else {
      const term = searchTerm.toLowerCase().trim();
      const filtered = mockProducts.filter(
        product => 
          product.name.toLowerCase().includes(term) ||
          product.code.toLowerCase().includes(term) ||
          (product.category && product.category.toLowerCase().includes(term)) ||
          (product.barcode && product.barcode.toLowerCase().includes(term))
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm]);

  // Get stock level indicator class
  const getStockLevelClass = (quantity?: number) => {
    if (quantity === undefined) return "";
    if (quantity <= 0) return "text-red-700 font-bold";
    if (quantity < 5) return "text-orange-500 font-bold";
    return "text-green-600";
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredProducts,
    selectedProductId,
    setSelectedProductId,
    viewMode,
    setViewMode,
    searchInputRef,
    getStockLevelClass
  };
}

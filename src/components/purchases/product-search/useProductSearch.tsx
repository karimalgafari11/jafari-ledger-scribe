
import { useState, useEffect, useRef } from "react";
import { Product } from "@/types/inventory";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";

export function useProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const { products, searchQuery, setSearchQuery } = useInventoryProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Focus search input when dialog opens
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Update search query when search term changes
  useEffect(() => {
    setSearchQuery(searchTerm);
  }, [searchTerm, setSearchQuery]);

  // Update filtered products when products or search query change
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products.slice(0, 50)); // Show first 50 products by default
    } else {
      const term = searchTerm.toLowerCase().trim();
      const filtered = products.filter(
        product => 
          product.name.toLowerCase().includes(term) ||
          product.code.toLowerCase().includes(term) ||
          (product.category && product.category.toLowerCase().includes(term)) ||
          (product.barcode && product.barcode.toLowerCase().includes(term))
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchTerm]);

  // Get stock level indicator class
  const getStockLevelClass = (quantity?: number) => {
    if (!quantity && quantity !== 0) return "";
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

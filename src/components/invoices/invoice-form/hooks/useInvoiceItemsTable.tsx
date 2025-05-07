
import { useState, useEffect } from "react";
import { InvoiceItem } from "@/types/invoices";
import { mockProducts } from "@/data/mockProducts";
import { toast } from "sonner";

export const useInvoiceItemsTable = (
  items: InvoiceItem[],
  onAddItem: (item: Partial<InvoiceItem>) => void,
  onRemoveItem: (index: number) => void,
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof mockProducts>([]);
  const [quickSearchActive, setQuickSearchActive] = useState(false);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [showItemForm, setShowItemForm] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState<InvoiceItem | null>(null);
  
  // Auto-open item form when there are no items
  useEffect(() => {
    if (items.length === 0 && !isSearching && !quickSearchActive && !showItemForm) {
      setQuickSearchActive(true);
    }
  }, [items.length, isSearching, quickSearchActive, showItemForm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 1) {
      const results = mockProducts.filter(
        product => 
          product.name.toLowerCase().includes(term.toLowerCase()) ||
          product.code.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleQuickSelect = (product: any) => {
    console.log("Adding product from quick select:", product);
    const newItem = {
      productId: product.id,
      code: product.code,
      name: product.name,
      quantity: 1,
      price: product.price,
      discount: 0,
      discountType: "percentage" as const,
      tax: 15,
      notes: ""
    };
    
    onAddItem(newItem);
    setSearchTerm("");
    setSearchResults([]);
    setQuickSearchActive(false);
    toast.success(`تم إضافة ${product.name} إلى الفاتورة`);
  };

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    if (!isSearching) {
      setSearchTerm("");
      setSearchResults([]);
    }
  };

  const handleRowClick = (index: number) => {
    setActiveRowIndex(index);
    const clickedItem = items[index];
    setCurrentEditItem(clickedItem);
    setShowItemForm(true);
  };

  const handleAddNewItem = () => {
    setQuickSearchActive(true);
  };

  const handleFormCancel = () => {
    setShowItemForm(false);
    setCurrentEditItem(null);
  };

  const handleFormSubmit = (item: Partial<InvoiceItem>) => {
    if (currentEditItem) {
      const index = items.findIndex(i => i.id === currentEditItem.id);
      if (index !== -1) {
        onAddItem(item); // Using the addItem function which will update
      }
    } else {
      onAddItem(item);
    }
    setShowItemForm(false);
    setCurrentEditItem(null);
  };

  return {
    searchTerm,
    isSearching,
    searchResults,
    quickSearchActive,
    showItemForm,
    currentEditItem,
    handleSearchChange,
    toggleSearch,
    handleQuickSelect,
    handleRowClick,
    handleAddNewItem,
    handleFormCancel,
    handleFormSubmit,
    setQuickSearchActive,
    setShowItemForm,
  };
};

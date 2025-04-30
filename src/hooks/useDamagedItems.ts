
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { DamagedItem, DamagedItemFilterOptions, Currency } from "@/types/damaged";
import { mockProducts } from "@/data/mockProducts";

// Mock data for damaged items
const initialDamagedItems: DamagedItem[] = [
  {
    id: uuid(),
    productId: "1",
    productName: "قميص قطني",
    productCode: "P001",
    manufacturer: "شركة النسيج العربية",
    purchasePrice: 35.50,
    sellingPrice: 59.99,
    quantity: 5,
    warehouseId: "w1",
    warehouseName: "المستودع الرئيسي",
    reason: "damaged",
    notes: "تلف بسبب سوء التخزين",
    date: new Date(2025, 3, 28),
    reorderLevel: 10
  },
  {
    id: uuid(),
    productId: "3",
    productName: "حذاء رياضي",
    productCode: "P003",
    manufacturer: "شركة الأحذية العالمية",
    purchasePrice: 75.25,
    sellingPrice: 129.99,
    quantity: 2,
    warehouseId: "w2",
    warehouseName: "مستودع جدة",
    reason: "broken",
    notes: "كسر في الحذاء أثناء النقل",
    date: new Date(2025, 3, 25),
    reorderLevel: 10
  },
  {
    id: uuid(),
    productId: "5",
    productName: "نظارة شمسية",
    productCode: "P005",
    manufacturer: "شركة النظارات المتحدة",
    purchasePrice: 45.00,
    sellingPrice: 79.99,
    quantity: 3,
    warehouseId: "w1",
    warehouseName: "المستودع الرئيسي",
    reason: "quality",
    notes: "مشاكل في الجودة - خدوش على العدسات",
    date: new Date(2025, 3, 23),
    reorderLevel: 8
  },
  {
    id: uuid(),
    productId: "9",
    productName: "عطر رجالي",
    productCode: "P009",
    manufacturer: "شركة العطور الفاخرة",
    purchasePrice: 120.50,
    sellingPrice: 199.99,
    quantity: 1,
    warehouseId: "w3",
    warehouseName: "مستودع الدمام",
    reason: "expired",
    notes: "منتهي الصلاحية",
    date: new Date(2025, 3, 20),
    reorderLevel: 5
  }
];

// Available currencies
const availableCurrencies: Currency[] = [
  { code: "SAR", name: "ريال سعودي", symbol: "ر.س" },
  { code: "USD", name: "دولار أمريكي", symbol: "$" },
  { code: "EUR", name: "يورو", symbol: "€" },
  { code: "AED", name: "درهم إماراتي", symbol: "د.إ" }
];

export function useDamagedItems() {
  const [items, setItems] = useState<DamagedItem[]>(initialDamagedItems);
  const [filteredItems, setFilteredItems] = useState<DamagedItem[]>(initialDamagedItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState<DamagedItemFilterOptions>({
    reason: "all",
    warehouseId: "all",
    startDate: null,
    endDate: null
  });
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("SAR");
  const [currencies] = useState<Currency[]>(availableCurrencies);

  // Apply search and filters
  useEffect(() => {
    let result = [...items];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.productName.toLowerCase().includes(query) ||
        item.productCode.toLowerCase().includes(query) ||
        item.manufacturer.toLowerCase().includes(query)
      );
    }
    
    // Apply reason filter
    if (filterOptions.reason && filterOptions.reason !== "all") {
      result = result.filter(item => item.reason === filterOptions.reason);
    }
    
    // Apply warehouse filter
    if (filterOptions.warehouseId && filterOptions.warehouseId !== "all") {
      result = result.filter(item => item.warehouseId === filterOptions.warehouseId);
    }
    
    // Apply date range filter
    if (filterOptions.startDate) {
      result = result.filter(item => item.date >= filterOptions.startDate!);
    }
    
    if (filterOptions.endDate) {
      result = result.filter(item => item.date <= filterOptions.endDate!);
    }
    
    setFilteredItems(result);
  }, [items, searchQuery, filterOptions]);

  // Add a new damaged item
  const addItem = (item: Omit<DamagedItem, "id">): DamagedItem => {
    const newItem: DamagedItem = {
      ...item,
      id: uuid()
    };
    
    setItems(prev => [newItem, ...prev]);
    return newItem;
  };

  // Update an existing damaged item
  const updateItem = (id: string, updates: Partial<DamagedItem>) => {
    setItems(prev => 
      prev.map(item => item.id === id ? { ...item, ...updates } : item)
    );
  };

  // Delete a damaged item
  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
  };

  // Toggle item selection
  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Clear all selected items
  const clearSelectedItems = () => {
    setSelectedItems([]);
  };

  // Get item by id
  const getItemById = (id: string | null) => {
    if (!id) return null;
    return items.find(item => item.id === id) || null;
  };

  // Get product details for a given product ID
  const getProductDetails = (productId: string) => {
    return mockProducts.find(product => product.id === productId);
  };

  // Calculate totals
  const calculateTotals = (itemsToCalculate: DamagedItem[]) => {
    const totalQuantity = itemsToCalculate.reduce((sum, item) => sum + item.quantity, 0);
    const totalValue = itemsToCalculate.reduce((sum, item) => sum + (item.purchasePrice * item.quantity), 0);
    
    return {
      totalQuantity,
      totalValue
    };
  };

  return {
    items: filteredItems,
    searchQuery,
    setSearchQuery,
    filterOptions,
    setFilterOptions,
    addItem,
    updateItem,
    deleteItem,
    selectedItems,
    toggleItemSelection,
    clearSelectedItems,
    getItemById,
    getProductDetails,
    currencies,
    selectedCurrency,
    setSelectedCurrency,
    calculateTotals
  };
}

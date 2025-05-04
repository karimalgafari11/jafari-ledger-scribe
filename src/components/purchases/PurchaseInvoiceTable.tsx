
import React, { useState, useRef } from "react";
import { PurchaseItem } from "@/types/purchases";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { PurchaseItemForm } from "./PurchaseItemForm";
import { ProductSearch } from "./ProductSearch";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";
import { Input } from "@/components/ui/input";

interface PurchaseInvoiceTableProps {
  items: PurchaseItem[];
  isAddingItem: boolean;
  editingItemIndex: number | null;
  setIsAddingItem: (isAdding: boolean) => void;
  setEditingItemIndex: (index: number | null) => void;
  onAddItem: (item: Partial<PurchaseItem>) => void;
  onUpdateItem: (index: number, item: Partial<PurchaseItem>) => void;
  onRemoveItem: (index: number) => void;
}

export const PurchaseInvoiceTable: React.FC<PurchaseInvoiceTableProps> = ({
  items,
  isAddingItem,
  editingItemIndex,
  setIsAddingItem,
  setEditingItemIndex,
  onAddItem,
  onUpdateItem,
  onRemoveItem
}) => {
  const { products } = useInventoryProducts();
  const [activeSearchCell, setActiveSearchCell] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Handle product search activation in table
  const handleCellClick = (index: number, field: string) => {
    if (isAddingItem || editingItemIndex !== null) return;
    
    // Generate a unique ID for the cell
    const cellId = `${field}-${index}`;
    setActiveSearchCell(cellId);
    
    // Focus the search input after rendering
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 10);
  };
  
  // Handle product selection from search
  const handleProductSelect = (product: any, index?: number) => {
    if (index !== undefined) {
      // Update existing item
      const updatedItem = {
        ...items[index],
        productId: product.id,
        code: product.code,
        name: product.name,
        price: product.price,
        total: items[index].quantity * product.price
      };
      onUpdateItem(index, updatedItem);
    } else {
      // Add new item
      const newItem = {
        productId: product.id,
        code: product.code,
        name: product.name,
        price: product.price,
        quantity: 1,
        total: product.price
      };
      onAddItem(newItem);
    }
    setActiveSearchCell(null);
  };
  
  // Reset active search cell when user clicks away
  const handleTableClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Only close if clicking outside the search cells
    if (!target.closest('.search-cell') && !target.closest('.product-search-dropdown')) {
      setActiveSearchCell(null);
    }
  };
  
  return (
    <div className="space-y-3" onClick={handleTableClick}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">الأصناف</h3>
        <div className="flex items-center gap-2">
          {!isAddingItem && editingItemIndex === null && (
            <div className="w-64">
              <ProductSearch 
                placeholder="بحث سريع وإضافة صنف" 
                onSelect={handleProductSelect} 
              />
            </div>
          )}
          <Button 
            onClick={() => setIsAddingItem(true)} 
            className="flex items-center gap-1" 
            size="sm" 
            disabled={isAddingItem || editingItemIndex !== null}
          >
            <Plus size={16} /> إضافة صنف
          </Button>
        </div>
      </div>
      
      {/* نموذج إضافة أو تحرير صنف */}
      {(isAddingItem || editingItemIndex !== null) && (
        <PurchaseItemForm 
          item={editingItemIndex !== null ? items[editingItemIndex] : undefined} 
          onSubmit={item => {
            if (editingItemIndex !== null) {
              onUpdateItem(editingItemIndex, item);
              setEditingItemIndex(null);
            } else {
              onAddItem(item);
              setIsAddingItem(false);
            }
          }} 
          onCancel={() => {
            setIsAddingItem(false);
            setEditingItemIndex(null);
          }} 
        />
      )}
      
      {/* جدول الأصناف */}
      <div className="border rounded overflow-auto">
        <Table className="min-w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-center border border-gray-300 p-2 w-16 font-bold text-lg">#</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">اسم الصنف</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">رقم الصنف</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">الكميه</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">السعر</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">الشركة الصانعة</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">المقاس</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">الاجمالي</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">ملاحظات</TableHead>
              <TableHead className="text-center border border-gray-300 p-2 w-20 print:hidden">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center border border-gray-300 py-[5px]">
                  لا توجد أصناف. قم بالضغط على زر "إضافة صنف" أو استخدم البحث السريع لإضافة صنف جديد.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow key={item.id || index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <TableCell className="text-center border border-gray-300 p-2 font-bold text-lg">
                    {index + 1}
                  </TableCell>
                  <TableCell 
                    className="border border-gray-300 p-2 hover:bg-gray-100 cursor-pointer search-cell"
                    onClick={() => handleCellClick(index, 'name')}
                  >
                    {activeSearchCell === `name-${index}` ? (
                      <ProductSearch 
                        ref={searchInputRef}
                        autoFocus={true}
                        showIcon={false}
                        placeholder="ابحث عن صنف..."
                        className="w-full border-none focus:ring-0"
                        onSelect={(product) => handleProductSelect(product, index)}
                      />
                    ) : (
                      item.name
                    )}
                  </TableCell>
                  <TableCell 
                    className="text-center border border-gray-300 p-2 hover:bg-gray-100 cursor-pointer search-cell" 
                    onClick={() => handleCellClick(index, 'code')}
                  >
                    {activeSearchCell === `code-${index}` ? (
                      <ProductSearch 
                        ref={searchInputRef}
                        autoFocus={true}
                        showIcon={false}
                        placeholder="ابحث برقم الصنف..."
                        className="w-full text-center border-none focus:ring-0"
                        onSelect={(product) => handleProductSelect(product, index)}
                      />
                    ) : (
                      item.code
                    )}
                  </TableCell>
                  <TableCell className="text-center border border-gray-300 p-2">{item.quantity}</TableCell>
                  <TableCell className="text-center border border-gray-300 p-2">{item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-center border border-gray-300 p-2">{item.manufacturer || "-"}</TableCell>
                  <TableCell className="text-center border border-gray-300 p-2">{item.size || "-"}</TableCell>
                  <TableCell className="text-center border border-gray-300 p-2 font-bold">{item.total.toFixed(2)}</TableCell>
                  <TableCell className="border border-gray-300 p-2">{item.notes || "-"}</TableCell>
                  <TableCell className="text-center border border-gray-300 p-2 print:hidden">
                    <div className="flex justify-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setEditingItemIndex(index)} 
                        disabled={isAddingItem || editingItemIndex !== null}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onRemoveItem(index)} 
                        disabled={isAddingItem || editingItemIndex !== null}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
            
            {/* Empty row for quick add */}
            {!isAddingItem && editingItemIndex === null && (
              <TableRow className="bg-gray-50">
                <TableCell className="text-center border border-gray-300 p-2 font-bold text-lg">
                  {items.length + 1}
                </TableCell>
                <TableCell 
                  className="border border-gray-300 p-2 hover:bg-gray-100 cursor-pointer search-cell" 
                  onClick={() => handleCellClick(-1, 'quickadd')}
                  colSpan={8}
                >
                  {activeSearchCell === `quickadd-${-1}` ? (
                    <ProductSearch 
                      ref={searchInputRef}
                      autoFocus={true}
                      showIcon={true}
                      placeholder="ابحث لإضافة صنف جديد..."
                      className="w-full border-none focus:ring-0"
                      onSelect={handleProductSelect}
                    />
                  ) : (
                    <div className="flex items-center justify-center text-gray-500">
                      <Search size={18} className="ml-2" />
                      انقر هنا للبحث وإضافة صنف جديد
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-center border border-gray-300 p-2 print:hidden">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="opacity-0"
                  >
                    <Plus size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

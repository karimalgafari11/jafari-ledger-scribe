
import React, { useState, useRef } from "react";
import { PurchaseItem } from "@/types/purchases";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Search, Settings } from "lucide-react";
import { PurchaseItemForm } from "./PurchaseItemForm";
import { ProductSearch } from "./ProductSearch";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [showGridLines, setShowGridLines] = useState<'both' | 'horizontal' | 'vertical' | 'none'>('both');
  const [isDenseView, setIsDenseView] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  
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
  
  // Handle direct edit of cell value
  const handleDirectEdit = (index: number, field: keyof PurchaseItem, value: any) => {
    const updatedItem = { ...items[index], [field]: value };
    
    // Recalculate total if quantity or price changed
    if (field === 'quantity' || field === 'price') {
      updatedItem.total = updatedItem.quantity * updatedItem.price;
    }
    
    onUpdateItem(index, updatedItem);
  };
  
  // Reset active search cell when user clicks away
  const handleTableClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Only close if clicking outside the search cells
    if (!target.closest('.search-cell') && !target.closest('.product-search-dropdown')) {
      setActiveSearchCell(null);
    }
  };
  
  // Toggle table display settings
  const toggleGridLines = () => {
    const options: Array<'both' | 'horizontal' | 'vertical' | 'none'> = ['both', 'horizontal', 'vertical', 'none'];
    const currentIndex = options.indexOf(showGridLines);
    const nextIndex = (currentIndex + 1) % options.length;
    setShowGridLines(options[nextIndex]);
  };
  
  return (
    <div className="space-y-3" onClick={handleTableClick} ref={tableRef}>
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
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleGridLines}
              className="flex items-center gap-1"
            >
              <Settings size={16} />
              <span className="hidden sm:inline">إعدادات الجدول</span>
            </Button>
            
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
        <Table className="min-w-full border-collapse" gridLines={showGridLines} striped bordered hoverable>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-center border border-gray-300 p-2 w-16 font-bold text-lg">#</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">اسم الصنف</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">رقم الصنف</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">الشركة المصنعة</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">المقاس</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">الكميه</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">السعر</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">الخصم</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">الضريبة</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">الاجمالي</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">ملاحظات</TableHead>
              <TableHead className="text-center border border-gray-300 p-2 w-20 print:hidden">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} className="text-center border border-gray-300 py-[5px]">
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
                  <TableCell className="text-center border border-gray-300 p-2">
                    {activeSearchCell === `manufacturer-${index}` ? (
                      <Input 
                        ref={searchInputRef}
                        autoFocus={true}
                        className="w-full text-center border-none focus:ring-0"
                        value={item.manufacturer || ""}
                        onChange={(e) => handleDirectEdit(index, 'manufacturer', e.target.value)}
                        onBlur={() => setActiveSearchCell(null)}
                      />
                    ) : (
                      <span className="cursor-pointer w-full block" onClick={() => handleCellClick(index, 'manufacturer')}>
                        {item.manufacturer || "-"}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center border border-gray-300 p-2">
                    {activeSearchCell === `size-${index}` ? (
                      <Input 
                        ref={searchInputRef}
                        autoFocus={true}
                        className="w-full text-center border-none focus:ring-0"
                        value={item.size || ""}
                        onChange={(e) => handleDirectEdit(index, 'size', e.target.value)}
                        onBlur={() => setActiveSearchCell(null)}
                      />
                    ) : (
                      <span className="cursor-pointer w-full block" onClick={() => handleCellClick(index, 'size')}>
                        {item.size || "-"}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center border border-gray-300 p-2">
                    {activeSearchCell === `quantity-${index}` ? (
                      <Input 
                        ref={searchInputRef}
                        autoFocus={true}
                        type="number"
                        min="1"
                        className="w-full text-center border-none focus:ring-0"
                        value={item.quantity}
                        onChange={(e) => handleDirectEdit(index, 'quantity', Number(e.target.value))}
                        onBlur={() => setActiveSearchCell(null)}
                      />
                    ) : (
                      <span className="cursor-pointer w-full block" onClick={() => handleCellClick(index, 'quantity')}>
                        {item.quantity}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center border border-gray-300 p-2">
                    {activeSearchCell === `price-${index}` ? (
                      <Input 
                        ref={searchInputRef}
                        autoFocus={true}
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full text-center border-none focus:ring-0"
                        value={item.price}
                        onChange={(e) => handleDirectEdit(index, 'price', Number(e.target.value))}
                        onBlur={() => setActiveSearchCell(null)}
                      />
                    ) : (
                      <span className="cursor-pointer w-full block" onClick={() => handleCellClick(index, 'price')}>
                        {item.price.toFixed(2)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center border border-gray-300 p-2">
                    {activeSearchCell === `discount-${index}` ? (
                      <div className="flex items-center">
                        <Input 
                          ref={searchInputRef}
                          autoFocus={true}
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-3/4 text-center border-none focus:ring-0"
                          value={item.discount || 0}
                          onChange={(e) => handleDirectEdit(index, 'discount', Number(e.target.value))}
                        />
                        <Select 
                          value={item.discountType || "percentage"}
                          onValueChange={(value) => handleDirectEdit(index, 'discountType', value as 'percentage' | 'fixed')}
                        >
                          <SelectTrigger className="w-1/4 border-none focus:ring-0 p-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">%</SelectItem>
                            <SelectItem value="fixed">ر.س</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <span className="cursor-pointer w-full block" onClick={() => handleCellClick(index, 'discount')}>
                        {(item.discount || 0) > 0 ? `${item.discount}${item.discountType === 'percentage' ? '%' : ' ر.س'}` : "-"}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center border border-gray-300 p-2">
                    {activeSearchCell === `tax-${index}` ? (
                      <div className="flex items-center">
                        <Input 
                          ref={searchInputRef}
                          autoFocus={true}
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full text-center border-none focus:ring-0"
                          value={item.tax || 0}
                          onChange={(e) => handleDirectEdit(index, 'tax', Number(e.target.value))}
                          onBlur={() => setActiveSearchCell(null)}
                        />
                        <span className="ml-1">%</span>
                      </div>
                    ) : (
                      <span className="cursor-pointer w-full block" onClick={() => handleCellClick(index, 'tax')}>
                        {(item.tax || 0) > 0 ? `${item.tax}%` : "-"}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center border border-gray-300 p-2 font-bold">{item.total.toFixed(2)}</TableCell>
                  <TableCell className="border border-gray-300 p-2">
                    {activeSearchCell === `notes-${index}` ? (
                      <Input 
                        ref={searchInputRef}
                        autoFocus={true}
                        className="w-full border-none focus:ring-0"
                        value={item.notes || ""}
                        onChange={(e) => handleDirectEdit(index, 'notes', e.target.value)}
                        onBlur={() => setActiveSearchCell(null)}
                      />
                    ) : (
                      <span className="cursor-pointer w-full block" onClick={() => handleCellClick(index, 'notes')}>
                        {item.notes || "-"}
                      </span>
                    )}
                  </TableCell>
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
                  colSpan={10}
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

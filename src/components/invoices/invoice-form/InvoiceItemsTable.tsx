
import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InvoiceItem } from "@/types/invoices";
import { formatCurrency } from "@/lib/utils";
import { Plus, Trash2, X, Check } from "lucide-react";
import { InvoiceSettingsType } from "./InvoiceSettings";

interface InvoiceItemsTableProps {
  items: InvoiceItem[];
  isAddingItem: boolean;
  editingItemIndex: number | null;
  tableWidth: number;
  tableRef: React.RefObject<HTMLDivElement>;
  setIsAddingItem: (isAdding: boolean) => void;
  handleEditItem: (index: number) => void;
  handleResizeStart: (e: React.MouseEvent<HTMLDivElement>) => void;
  onRemoveItem: (index: number) => void;
  onAddItem: (item: Partial<InvoiceItem>) => void;
  onUpdateItem: (index: number, item: Partial<InvoiceItem>) => void;
  settings?: InvoiceSettingsType;
}

export const InvoiceItemsTable: React.FC<InvoiceItemsTableProps> = ({
  items,
  isAddingItem,
  editingItemIndex,
  tableWidth,
  tableRef,
  setIsAddingItem,
  handleEditItem,
  handleResizeStart,
  onRemoveItem,
  onAddItem,
  onUpdateItem,
  settings
}) => {
  const [newItem, setNewItem] = useState<Partial<InvoiceItem>>({
    id: '',
    code: '',
    name: '',
    description: '',
    quantity: 1,
    price: 0,
    discount: 0,
    discountType: 'fixed',
    tax: 0,
    total: 0,
    notes: ''
  });

  const [editItem, setEditItem] = useState<Partial<InvoiceItem>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleAddNewItem = () => {
    if (newItem.name && newItem.quantity && newItem.price) {
      const total = calculateItemTotal(newItem.price || 0, newItem.quantity || 0, newItem.discount || 0, newItem.discountType || 'fixed');
      
      onAddItem({
        ...newItem,
        id: `item-${Date.now()}`,
        total: total
      });
      
      setNewItem({
        id: '',
        code: '',
        name: '',
        description: '',
        quantity: 1,
        price: 0,
        discount: 0,
        discountType: 'fixed',
        tax: 0,
        total: 0,
        notes: ''
      });
      
      setIsAddingItem(false);
    }
  };

  const handleSaveEditItem = (index: number) => {
    if (editItem.name && editItem.quantity && editItem.price) {
      const total = calculateItemTotal(editItem.price || 0, editItem.quantity || 0, editItem.discount || 0, editItem.discountType || 'fixed');
      
      onUpdateItem(index, {
        ...editItem,
        total: total
      });
      
      setEditItem({});
    }
  };

  const handleNewItemChange = (field: string, value: any) => {
    const updates = { ...newItem, [field]: value };
    
    if ((field === 'price' || field === 'quantity' || field === 'discount') && updates.price && updates.quantity) {
      updates.total = calculateItemTotal(
        updates.price,
        updates.quantity,
        updates.discount || 0,
        updates.discountType || 'fixed'
      );
    }
    
    setNewItem(updates);
  };

  const handleEditItemChange = (field: string, value: any) => {
    const updates = { ...editItem, [field]: value };
    
    if ((field === 'price' || field === 'quantity' || field === 'discount') && updates.price && updates.quantity) {
      updates.total = calculateItemTotal(
        updates.price,
        updates.quantity,
        updates.discount || 0,
        updates.discountType || 'fixed'
      );
    }
    
    setEditItem(updates);
  };

  const calculateItemTotal = (price: number, quantity: number, discount: number = 0, discountType: 'percentage' | 'fixed' = 'fixed') => {
    const subtotal = price * quantity;
    let discountAmount;
    
    if (discountType === 'percentage') {
      discountAmount = subtotal * (discount / 100);
    } else {
      discountAmount = discount;
    }
    
    return subtotal - discountAmount;
  };
  
  // تحديد أعمدة الجدول المعروضة بناءً على الإعدادات
  const showItemCodes = settings?.showItemCodes !== false;
  const showItemNotes = settings?.showItemNotes !== false;

  return (
    <Card className="print-section overflow-hidden">
      <CardContent className="p-0">
        <div className="relative overflow-x-auto">
          <div 
            ref={tableRef} 
            className="w-full overflow-x-auto"
            style={{ 
              maxWidth: `${tableWidth}%`
            }}
          >
            <table className="w-full text-sm text-right border-collapse">
              <thead className="bg-gray-100">
                <tr className="border-b">
                  <th className="p-3 w-10">#</th>
                  {showItemCodes && <th className="p-3 w-24">الرمز</th>}
                  <th className="p-3">الصنف</th>
                  <th className="p-3 w-20">الكمية</th>
                  <th className="p-3 w-24">السعر</th>
                  <th className="p-3 w-24">الإجمالي</th>
                  {showItemNotes && <th className="p-3">ملاحظات</th>}
                  <th className="p-3 w-20 print-hide">
                    <span className="sr-only">الإجراءات</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  editingItemIndex === index ? (
                    <tr key={`edit-${item.id}`} className="bg-blue-50 border-b">
                      <td className="p-3">{index + 1}</td>
                      
                      {showItemCodes && (
                        <td className="p-3">
                          <Input
                            type="text"
                            value={editItem.code ?? item.code}
                            onChange={(e) => handleEditItemChange('code', e.target.value)}
                            className="h-8"
                          />
                        </td>
                      )}
                      
                      <td className="p-3">
                        <Input
                          type="text"
                          value={editItem.name ?? item.name}
                          onChange={(e) => handleEditItemChange('name', e.target.value)}
                          className="h-8"
                        />
                      </td>
                      
                      <td className="p-3">
                        <Input
                          type="number"
                          min="1"
                          value={editItem.quantity ?? item.quantity}
                          onChange={(e) => handleEditItemChange('quantity', parseFloat(e.target.value) || 1)}
                          className="h-8"
                        />
                      </td>
                      
                      <td className="p-3">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={editItem.price ?? item.price}
                          onChange={(e) => handleEditItemChange('price', parseFloat(e.target.value) || 0)}
                          className="h-8"
                        />
                      </td>
                      
                      <td className="p-3">
                        {formatCurrency((editItem.total !== undefined ? editItem.total : item.total) || 0)}
                      </td>
                      
                      {showItemNotes && (
                        <td className="p-3">
                          <Input
                            type="text"
                            value={editItem.notes ?? item.notes}
                            onChange={(e) => handleEditItemChange('notes', e.target.value)}
                            className="h-8"
                          />
                        </td>
                      )}
                      
                      <td className="p-3 print-hide">
                        <div className="flex gap-1">
                          <Button 
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSaveEditItem(index)}
                            className="h-7 w-7 p-0"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditItem({})}
                            className="h-7 w-7 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr 
                      key={item.id} 
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleEditItem(index)}
                    >
                      <td className="p-3">{index + 1}</td>
                      {showItemCodes && <td className="p-3">{item.code}</td>}
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.quantity}</td>
                      <td className="p-3">{formatCurrency(item.price)}</td>
                      <td className="p-3">{formatCurrency(item.total)}</td>
                      {showItemNotes && <td className="p-3">{item.notes}</td>}
                      <td className="p-3 print-hide">
                        <Button 
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveItem(index);
                          }}
                          className="h-7 w-7 p-0 text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  )
                ))}
                
                {isAddingItem ? (
                  <tr className="bg-green-50 border-b">
                    <td className="p-3">{items.length + 1}</td>
                    
                    {showItemCodes && (
                      <td className="p-3">
                        <Input
                          type="text"
                          value={newItem.code}
                          onChange={(e) => handleNewItemChange('code', e.target.value)}
                          className="h-8"
                        />
                      </td>
                    )}
                    
                    <td className="p-3">
                      <Input
                        type="text"
                        value={newItem.name}
                        onChange={(e) => handleNewItemChange('name', e.target.value)}
                        className="h-8"
                        required
                      />
                    </td>
                    
                    <td className="p-3">
                      <Input
                        type="number"
                        min="1"
                        value={newItem.quantity}
                        onChange={(e) => handleNewItemChange('quantity', parseFloat(e.target.value) || 1)}
                        className="h-8"
                        required
                      />
                    </td>
                    
                    <td className="p-3">
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={newItem.price}
                        onChange={(e) => handleNewItemChange('price', parseFloat(e.target.value) || 0)}
                        className="h-8"
                        required
                      />
                    </td>
                    
                    <td className="p-3">
                      {formatCurrency(newItem.total || 0)}
                    </td>
                    
                    {showItemNotes && (
                      <td className="p-3">
                        <Input
                          type="text"
                          value={newItem.notes}
                          onChange={(e) => handleNewItemChange('notes', e.target.value)}
                          className="h-8"
                        />
                      </td>
                    )}
                    
                    <td className="p-3 print-hide">
                      <div className="flex gap-1">
                        <Button 
                          size="sm"
                          variant="ghost"
                          onClick={handleAddNewItem}
                          className="h-7 w-7 p-0"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm"
                          variant="ghost"
                          onClick={() => setIsAddingItem(false)}
                          className="h-7 w-7 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr className="border-b print-hide">
                    <td colSpan={showItemCodes ? (showItemNotes ? 8 : 7) : (showItemNotes ? 7 : 6)} className="p-2">
                      <Button 
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsAddingItem(true)}
                        className="w-full border border-dashed border-gray-300 text-gray-500"
                      >
                        <Plus className="h-4 w-4 ml-1" />
                        إضافة صنف جديد
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div 
            className="absolute top-0 right-full h-full w-4 cursor-col-resize print-hide"
            onMouseDown={handleResizeStart}
          >
            <div className="absolute top-0 left-2 bottom-0 w-1 bg-gray-300 hover:bg-blue-500"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PurchaseInvoiceHeader } from "./PurchaseInvoiceHeader";
import { PurchaseInvoiceTable } from "./PurchaseInvoiceTable";
import { PurchaseInvoiceSummary } from "./PurchaseInvoiceSummary";
import { PurchaseItemForm } from "./PurchaseItemForm";
import { PurchaseInvoiceActions } from "./PurchaseInvoiceActions";
import { usePurchaseInvoice } from "@/hooks/purchases";
import { useInvoiceItems } from "@/hooks/purchases";
import { useInvoiceCalculations } from "@/hooks/purchases/useInvoiceCalculations";
import { useInvoiceActions } from "@/hooks/purchases";

interface PurchaseInvoiceFormProps {
  initialData?: any;
}

export const PurchaseInvoiceForm: React.FC<PurchaseInvoiceFormProps> = ({ initialData }) => {
  const { invoice, setInvoice, isLoading } = usePurchaseInvoice(initialData);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);

  const { addItem, updateItem, removeItem, recalculateSubtotal } = useInvoiceItems({ invoice, setInvoice });
  const { applyDiscount, applyExpenses, calculateRemaining } = useInvoiceCalculations({ invoice, setInvoice });
  const { saveInvoice, printInvoice } = useInvoiceActions({ invoice });

  // If we have initial data (from PDF), auto-populate the form
  useEffect(() => {
    if (initialData) {
      toast.success("تم استخراج بيانات الفاتورة من PDF بنجاح");
      
      // If there are items, recalculate subtotal
      if (initialData.items && initialData.items.length > 0) {
        setTimeout(() => {
          recalculateSubtotal();
          toast.info("يمكنك تعديل الأصناف بالضغط على الخلايا في الجدول", {
            duration: 5000,
          });
        }, 500);
      }
    }
  }, [initialData]);

  // Show help toast when the form loads
  useEffect(() => {
    setTimeout(() => {
      toast.info("اضغط على زر 'إضافة صنف جديد' أو اضغط مباشرة على خلايا الجدول للتعديل", {
        duration: 5000,
        id: "form-help"
      });
    }, 1000);
  }, []);

  const handleSave = () => {
    if (invoice.items.length === 0) {
      toast.error("لا يمكن حفظ فاتورة بدون أصناف");
      return;
    }
    saveInvoice();
  };

  return (
    <div className="space-y-4">
      {/* Tutorial card */}
      <Card className="bg-blue-50 border-blue-200 shadow-sm">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">طريقة إدخال الفاتورة:</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-600">
            <li>اضغط على زر <strong>"إضافة صنف جديد"</strong> لإضافة منتجات للفاتورة</li>
            <li>يمكنك النقر مباشرة على خلايا الجدول لتعديل البيانات</li>
            <li>انقر نقرًا مزدوجًا على اسم المنتج أو رمزه للتعديل المباشر</li>
            <li>بعد إتمام الفاتورة، اضغط على زر <strong>"حفظ الفاتورة"</strong></li>
          </ol>
          <Button 
            variant="link" 
            className="text-blue-700 p-0 mt-2"
            onClick={() => toast.dismiss("form-help")}
          >
            فهمت
          </Button>
        </CardContent>
      </Card>

      <PurchaseInvoiceHeader 
        invoice={invoice}
        setInvoice={setInvoice}
      />
      
      <PurchaseInvoiceTable
        items={invoice.items}
        isAddingItem={isAddingItem}
        editingItemIndex={editingItemIndex}
        setIsAddingItem={setIsAddingItem}
        setEditingItemIndex={setEditingItemIndex}
        onAddItem={addItem}
        onUpdateItem={updateItem}
        onRemoveItem={removeItem}
      />
      
      <PurchaseInvoiceSummary
        invoice={invoice}
        onApplyDiscount={applyDiscount}
        onApplyExpenses={applyExpenses}
        calculateRemaining={calculateRemaining}
      />
      
      <PurchaseInvoiceActions
        onSave={handleSave}
        onPrint={printInvoice}
        isLoading={isLoading}
      />
    </div>
  );
};

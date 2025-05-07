
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { PurchaseInvoice } from "@/types/purchases";
import { PurchaseInvoiceHeader } from "./PurchaseInvoiceHeader";
import { PurchaseInvoiceTable } from "./PurchaseInvoiceTable";
import { PurchaseInvoiceSummary } from "./PurchaseInvoiceSummary";
import { PurchaseInvoiceActions } from "./PurchaseInvoiceActions";

interface PurchaseInvoiceFormProps {
  initialData?: any;
  settings?: any;
  invoice: PurchaseInvoice;
  onFieldChange: (field: keyof PurchaseInvoice, value: any) => void;
  onDateChange: (date: Date | null) => void;
  addItem: (item: any) => void;
  updateItem: (index: number, item: any) => void;
  removeItem: (index: number) => void;
  applyDiscount: (type: 'percentage' | 'fixed', value: number) => void;
  applyExpenses: (value: number) => void;
  calculateRemaining: () => number;
  onSave: () => void;
  onPrint: () => void;
  onWhatsAppSend: () => void;
  isLoading: boolean;
  isPrintPreview?: boolean;
}

export const PurchaseInvoiceForm: React.FC<PurchaseInvoiceFormProps> = ({ 
  initialData,
  settings = {},
  invoice,
  onFieldChange,
  onDateChange,
  addItem,
  updateItem,
  removeItem,
  applyDiscount,
  applyExpenses,
  calculateRemaining,
  onSave,
  onPrint,
  onWhatsAppSend,
  isLoading,
  isPrintPreview = false
}) => {
  // Show help toast when the form loads (but not in print preview mode)
  React.useEffect(() => {
    if (!isPrintPreview) {
      setTimeout(() => {
        toast.info("اضغط على زر 'إضافة صنف جديد' أو اضغط مباشرة على خلايا الجدول للتعديل", {
          duration: 5000,
          id: "form-help"
        });
      }, 1000);
    }
  }, [isPrintPreview]);

  return (
    <div className={`space-y-4 print-section ${isPrintPreview ? 'print-preview' : ''}`}>
      {/* Tutorial card - hide in print preview */}
      {!isPrintPreview && (
        <Card className="bg-blue-50 border-blue-200 shadow-sm print-hide">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">طريقة إدخال الفاتورة:</h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-600">
              <li>اضغط على زر <strong>"إضافة صنف جديد"</strong> لإضافة منتجات للفاتورة</li>
              <li>يمكنك النقر مباشرة على خلايا الجدول لتعديل البيانات</li>
              <li>انقر نقرًا مزدوجًا على اسم المنتج أو رمزه للتعديل المباشر</li>
              <li>بعد إتمام الفاتورة، اضغط على زر <strong>"حفظ الفاتورة"</strong></li>
            </ol>
          </CardContent>
        </Card>
      )}

      <PurchaseInvoiceHeader 
        invoice={invoice}
        onFieldChange={onFieldChange}
        onDateChange={onDateChange}
        showVendorDetails={settings.showVendorDetails !== false}
      />
      
      <PurchaseInvoiceTable
        items={invoice.items}
        isAddingItem={false}
        editingItemIndex={null}
        setIsAddingItem={() => {}}
        setEditingItemIndex={() => {}}
        onAddItem={addItem}
        onUpdateItem={updateItem}
        onRemoveItem={removeItem}
        showItemCodes={settings.showItemCodes !== false}
        showItemNotes={settings.showItemNotes !== false}
      />
      
      <PurchaseInvoiceSummary
        subtotal={invoice.subtotal}
        discount={invoice.discount}
        discountType={invoice.discountType}
        tax={invoice.tax}
        expenses={invoice.expenses}
        totalAmount={invoice.totalAmount}
        amountPaid={invoice.amountPaid}
        remaining={calculateRemaining()}
        onApplyDiscount={applyDiscount}
        onApplyExpenses={applyExpenses}
        onAmountPaidChange={(amount) => onFieldChange('amountPaid', amount)}
        showDiscount={settings.showDiscount !== false}
        showTax={settings.showTax !== false}
      />
      
      {!isPrintPreview && (
        <PurchaseInvoiceActions
          onSave={onSave}
          onPrint={onPrint}
          onWhatsAppSend={onWhatsAppSend}
          isLoading={isLoading}
          className="print-hide"
        />
      )}

      {settings.showSignature && (
        <div className="mt-8 border-t pt-4">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <p className="mb-12">المورد</p>
              <div className="border-t border-black pt-2">التوقيع</div>
            </div>
            <div className="text-center">
              <p className="mb-12">المستلم</p>
              <div className="border-t border-black pt-2">التوقيع</div>
            </div>
            <div className="text-center">
              <p className="mb-12">المحاسب</p>
              <div className="border-t border-black pt-2">التوقيع</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



import React from "react";
import { Invoice } from "@/types/invoices";
import { InvoiceSettingsType } from "./invoice-form/InvoiceSettings";

// استيراد المكونات المعاد هيكلتها
import { InvoiceHeader } from "./invoice-form/InvoiceHeader";
import { InvoiceDetails } from "./invoice-form/InvoiceDetails";
import { InvoiceItemsTable } from "./invoice-form/InvoiceItemsTable";
import { InvoiceSummarySection } from "./invoice-form/InvoiceSummarySection";
import { InvoiceActions } from "./invoice-form/InvoiceActions";

// دالة مساعدة
import { useInvoiceForm } from "@/hooks/useInvoiceForm";

interface InvoiceFormProps {
  invoice: Invoice;
  onFieldChange: (field: string, value: any) => void;
  onAddItem: (item: Partial<import("@/types/invoices").InvoiceItem>) => void;
  onUpdateItem: (index: number, item: Partial<import("@/types/invoices").InvoiceItem>) => void;
  onRemoveItem: (index: number) => void;
  onApplyDiscount: (type: 'percentage' | 'fixed', value: number) => void;
  isLoading: boolean;
  settings?: InvoiceSettingsType;
  renderProductSearch?: (onAddItem: (item: Partial<import("@/types/invoices").InvoiceItem>) => void) => React.ReactNode;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({
  invoice,
  onFieldChange,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  onApplyDiscount,
  isLoading,
  settings,
  renderProductSearch
}) => {
  const {
    companyInfo,
    toggleCompanyEdit,
    handleCompanyInfoChange,
    isAddingItem,
    editingItemIndex,
    isDiscountFormOpen,
    tableWidth,
    tableRef,
    setIsAddingItem,
    setEditingItemIndex,
    setIsDiscountFormOpen,
    handleAddItem,
    handleUpdateItem,
    handleEditItem,
    handleCancelEdit,
    handleCancelAdd,
    handleApplyDiscount,
    handleResizeStart,
    handleWhatsAppShare,
    handleCreatePDF,
    calculateRemaining,
    handleAmountPaidChange,
    handleNotesChange,
    handlePrint,
    handleShare,
  } = useInvoiceForm(invoice, onFieldChange, onAddItem, onUpdateItem, onRemoveItem, onApplyDiscount);
  
  return (
    <div className="space-y-1 print:p-2 py-0 px-0" dir="rtl">
      {/* رأس الفاتورة مع شعار الشركة والمعلومات */}
      <InvoiceHeader 
        companyInfo={companyInfo} 
        toggleCompanyEdit={toggleCompanyEdit} 
        handleCompanyInfoChange={handleCompanyInfoChange}
        showLogo={settings?.showCompanyLogo !== false}
      />

      {/* تفاصيل الفاتورة (العميل، التاريخ، إلخ) */}
      <InvoiceDetails 
        invoice={invoice} 
        onFieldChange={onFieldChange} 
        condensed={true}
      />
      
      {/* جدول عناصر الفاتورة */}
      <InvoiceItemsTable
        items={invoice.items}
        isAddingItem={isAddingItem}
        editingItemIndex={editingItemIndex}
        tableWidth={tableWidth}
        tableRef={tableRef}
        setIsAddingItem={setIsAddingItem}
        handleEditItem={handleEditItem}
        handleResizeStart={handleResizeStart}
        onRemoveItem={onRemoveItem}
        onAddItem={onAddItem}
        onUpdateItem={onUpdateItem}
        settings={settings}
        renderProductSearch={renderProductSearch}
      />

      {/* قسم ملخص الفاتورة */}
      <InvoiceSummarySection 
        invoice={invoice}
        isDiscountFormOpen={isDiscountFormOpen}
        calculateRemaining={calculateRemaining}
        setIsDiscountFormOpen={setIsDiscountFormOpen}
        onAmountPaidChange={handleAmountPaidChange}
        handleApplyDiscount={handleApplyDiscount}
        showDiscount={settings?.showDiscount !== false}
        showTax={settings?.showTax !== false}
      />
      
      {/* إجراءات الفاتورة */}
      <InvoiceActions 
        notes={invoice.notes}
        onNotesChange={handleNotesChange}
        handlePrint={handlePrint}
        handleWhatsAppShare={handleWhatsAppShare}
        handleCreatePDF={handleCreatePDF}
        handleShare={handleShare}
        invoiceId={invoice.id}
      />

      {/* أنماط الطباعة */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-section, .print-section * {
              visibility: visible;
            }
            .print-hide {
              display: none !important;
            }
            .print-section {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

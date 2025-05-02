import React from "react";
import { Invoice } from "@/types/invoices";
import { Card, CardContent } from "@/components/ui/card";

// Importing refactored components
import { InvoiceHeader } from "./invoice-form/InvoiceHeader";
import { InvoiceDetails } from "./invoice-form/InvoiceDetails";
import { InvoiceItemsTable } from "./invoice-form/InvoiceItemsTable";
import { InvoiceItemSection } from "./invoice-form/InvoiceItemSection";
import { InvoiceActions } from "./invoice-form/InvoiceActions";
import { InvoiceSummarySection } from "./invoice-form/InvoiceSummarySection";

// Custom hook
import { useInvoiceForm } from "@/hooks/useInvoiceForm";
interface InvoiceFormProps {
  invoice: Invoice;
  onFieldChange: (field: string, value: any) => void;
  onAddItem: (item: Partial<import("@/types/invoices").InvoiceItem>) => void;
  onUpdateItem: (index: number, item: Partial<import("@/types/invoices").InvoiceItem>) => void;
  onRemoveItem: (index: number) => void;
  onApplyDiscount: (type: 'percentage' | 'fixed', value: number) => void;
  isLoading: boolean;
}
export const InvoiceForm: React.FC<InvoiceFormProps> = ({
  invoice,
  onFieldChange,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  onApplyDiscount,
  isLoading
}) => {
  const {
    isAddingItem,
    editingItemIndex,
    isDiscountFormOpen,
    tableWidth,
    tableRef,
    companyInfo,
    setIsAddingItem,
    setEditingItemIndex,
    setIsDiscountFormOpen,
    handleAddItem,
    handleUpdateItem,
    handleEditItem,
    handleCancelEdit,
    handleCancelAdd,
    handleApplyDiscount,
    toggleCompanyEdit,
    handleCompanyInfoChange,
    handleResizeStart,
    handleWhatsAppShare,
    handleCreatePDF,
    calculateRemaining,
    handleAmountPaidChange,
    handleNotesChange,
    handlePrint
  } = useInvoiceForm(invoice, onFieldChange, onAddItem, onUpdateItem, onRemoveItem, onApplyDiscount);

  // Get the current item being edited if applicable
  const editingItem = editingItemIndex !== null ? invoice.items[editingItemIndex] : undefined;
  return <div className="space-y-6 print:p-4 py-0 px-0 bg-slate-100">
      {/* Invoice Header with Company Logo and Information */}
      <InvoiceHeader companyInfo={companyInfo} toggleCompanyEdit={toggleCompanyEdit} handleCompanyInfoChange={handleCompanyInfoChange} />

      {/* Invoice Details (customer, date, etc) */}
      <InvoiceDetails invoice={invoice} onFieldChange={onFieldChange} />

      {/* Item Addition/Editing Section */}
      <InvoiceItemSection isAddingItem={isAddingItem} editingItemIndex={editingItemIndex} editingItem={editingItem} handleAddItem={handleAddItem} handleCancelAdd={handleCancelAdd} handleUpdateItem={handleUpdateItem} handleCancelEdit={handleCancelEdit} />

      {/* Items Table */}
      <InvoiceItemsTable items={invoice.items} isAddingItem={isAddingItem} editingItemIndex={editingItemIndex} tableWidth={tableWidth} tableRef={tableRef} setIsAddingItem={setIsAddingItem} handleEditItem={handleEditItem} handleResizeStart={handleResizeStart} onRemoveItem={onRemoveItem} />

      {/* Invoice Summary and Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Notes and Action Buttons */}
        <InvoiceActions notes={invoice.notes} onNotesChange={handleNotesChange} handlePrint={handlePrint} handleWhatsAppShare={handleWhatsAppShare} handleCreatePDF={handleCreatePDF} />

        {/* Invoice Summary and Payment */}
        <InvoiceSummarySection invoice={invoice} isDiscountFormOpen={isDiscountFormOpen} calculateRemaining={calculateRemaining} setIsDiscountFormOpen={setIsDiscountFormOpen} onAmountPaidChange={handleAmountPaidChange} handleApplyDiscount={handleApplyDiscount} />
      </div>

      {/* Print-only styles */}
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
    </div>;
};
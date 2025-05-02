
import React from "react";
import { Invoice } from "@/types/invoices";
import { InvoiceSettingsType } from "./invoice-form/InvoiceSettings";

// Importing refactored components
import { InvoiceHeader } from "./invoice-form/InvoiceHeader";
import { InvoiceDetails } from "./invoice-form/InvoiceDetails";
import { InvoiceItemsTable } from "./invoice-form/InvoiceItemsTable";
import { InvoiceSummarySection } from "./invoice-form/InvoiceSummarySection";
import { InvoiceActions } from "./invoice-form/InvoiceActions";

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
  settings?: InvoiceSettingsType;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({
  invoice,
  onFieldChange,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  onApplyDiscount,
  isLoading,
  settings
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
    <div className="space-y-1 print:p-2 py-0 px-0">
      {/* Invoice Header with Company Logo and Information */}
      <InvoiceHeader 
        companyInfo={companyInfo} 
        toggleCompanyEdit={toggleCompanyEdit} 
        handleCompanyInfoChange={handleCompanyInfoChange}
        showLogo={settings?.showCompanyLogo !== false}
      />

      {/* Invoice Details (customer, date, etc) - Condensed */}
      <InvoiceDetails 
        invoice={invoice} 
        onFieldChange={onFieldChange} 
        condensed={true}
      />
      
      {/* Invoice Items Table */}
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
        settings={settings}
      />

      {/* Invoice Summary Section */}
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
      
      {/* Invoice Actions */}
      <InvoiceActions 
        notes={invoice.notes}
        onNotesChange={handleNotesChange}
        handlePrint={handlePrint}
        handleWhatsAppShare={handleWhatsAppShare}
        handleCreatePDF={handleCreatePDF}
        handleShare={handleShare}
        invoiceId={invoice.id}
      />

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
    </div>
  );
};

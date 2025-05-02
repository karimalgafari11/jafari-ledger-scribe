
import React from "react";
import { Invoice } from "@/types/invoices";
import { InvoiceSettingsType } from "./invoice-form/InvoiceSettings";

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
      {settings?.showCustomerDetails !== false && (
        <InvoiceDetails 
          invoice={invoice} 
          onFieldChange={onFieldChange} 
          condensed={true}
        />
      )}

      {/* Item Addition/Editing Section */}
      <InvoiceItemSection 
        isAddingItem={isAddingItem} 
        editingItemIndex={editingItemIndex} 
        editingItem={editingItem} 
        handleAddItem={handleAddItem}
        handleCancelAdd={handleCancelAdd} 
        handleUpdateItem={handleUpdateItem} 
        handleCancelEdit={handleCancelEdit}
        settings={settings}
      />

      {/* Items Table with vertical lines and sequential numbers */}
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
        settings={settings}
      />

      {/* Invoice Summary and Actions */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        {/* Notes and Action Buttons */}
        <InvoiceActions 
          notes={invoice.notes} 
          onNotesChange={handleNotesChange} 
          handlePrint={handlePrint}
          handleWhatsAppShare={handleWhatsAppShare} 
          handleCreatePDF={handleCreatePDF}
        />

        {/* Invoice Summary and Payment */}
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
      </div>

      {/* Signature Section */}
      {settings?.showSignature && (
        <div className="mt-2 border-t border-gray-300 pt-1">
          <div className="flex justify-between">
            <div className="text-center w-1/3">
              <p className="font-semibold mb-6 text-xs">توقيع المستلم</p>
              <div className="border-t border-gray-400 w-full"></div>
            </div>
            <div className="text-center w-1/3">
              <p className="font-semibold mb-6 text-xs">توقيع المحاسب</p>
              <div className="border-t border-gray-400 w-full"></div>
            </div>
            <div className="text-center w-1/3">
              <p className="font-semibold mb-6 text-xs">ختم الشركة</p>
              <div className="border-t border-gray-400 w-full"></div>
            </div>
          </div>
        </div>
      )}

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

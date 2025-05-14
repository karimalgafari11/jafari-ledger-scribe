
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { InvoiceForm } from "@/components/invoices/InvoiceForm";
import { useSalesInvoice } from "@/hooks/sales";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import { InvoiceItem } from "@/types/invoices";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Save, Search, Plus, Users } from "lucide-react";
import { ProductSearchSection } from "@/components/purchases/table/item-form";
import { QuickProductSearch } from "@/components/purchases";
import { Product } from "@/types/inventory";
import { CustomerSelector } from "@/components/customers/CustomerSelector";
import { Customer } from "@/types/customers";

const SalesInvoicePage = () => {
  // State for showing the product search dialog
  const [showProductSearch, setShowProductSearch] = useState(false);
  // State for showing the customer selector dialog
  const [showCustomerSelector, setShowCustomerSelector] = useState(false);

  // Use the sales invoice hook to get all the necessary data and functions
  const {
    invoice,
    updateInvoiceField,
    addInvoiceItem,
    updateInvoiceItem,
    removeInvoiceItem,
    applyDiscount,
    calculateTotals,
    isLoading,
    saveInvoice,
  } = useSalesInvoice();

  // Create a default invoice if one doesn't exist
  React.useEffect(() => {
    if (!invoice.id) {
      const date = new Date();
      const dateStr = format(date, "yyyyMMdd");
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const invoiceNumber = `INV-${dateStr}-${randomNum}`;

      const newInvoice = {
        id: uuid(),
        invoiceNumber: invoiceNumber,
        customerId: "",
        customerName: "عميل افتراضي",
        customerPhone: "0500000000",
        customerAccountNumber: "",
        date: date.toISOString(),
        items: [],
        totalAmount: 0,
        status: "draft",
        paymentMethod: "cash",
        amountPaid: 0,
        warehouseId: ""
      };

      // Update with default invoice
      Object.keys(newInvoice).forEach(key => {
        updateInvoiceField(key, newInvoice[key]);
      });
    }
  }, []);

  // Adapter functions to convert index-based functions to id-based functions
  const handleUpdateInvoiceItem = (index: number, item: Partial<InvoiceItem>) => {
    const itemId = invoice.items[index]?.id;
    if (itemId) {
      updateInvoiceItem(itemId, item);
      calculateTotals();
    }
  };

  const handleRemoveInvoiceItem = (index: number) => {
    const itemId = invoice.items[index]?.id;
    if (itemId) {
      removeInvoiceItem(itemId);
      calculateTotals();
      toast.success("تم حذف الصنف من الفاتورة");
    }
  };

  const handleAddInvoiceItem = (item: Partial<InvoiceItem>) => {
    addInvoiceItem(item);
    calculateTotals();
  };
  
  const handleSaveInvoice = async () => {
    if (invoice.items.length === 0) {
      toast.error("لا يمكن حفظ فاتورة بدون أصناف");
      return;
    }
    
    const success = await saveInvoice();
    if (success) {
      toast.success("تم حفظ الفاتورة بنجاح");
    }
  };

  // Open product search dialog
  const handleOpenProductSearch = () => {
    setShowProductSearch(true);
  };

  // Handle product selection from quick search
  const handleProductSelect = (product: Product) => {
    const newItem: Partial<InvoiceItem> = {
      id: uuid(),
      productId: product.id,
      code: product.code,
      name: product.name,
      quantity: 1,
      price: product.price,
      discount: 0,
      discountType: 'percentage',
      tax: 15,
      total: product.price
    };
    
    handleAddInvoiceItem(newItem);
    setShowProductSearch(false);
    toast.success(`تم إضافة ${product.name} إلى الفاتورة`);
  };
  
  // Open customer selector dialog
  const handleOpenCustomerSelector = () => {
    setShowCustomerSelector(true);
  };
  
  // Handle customer selection
  const handleCustomerSelect = (customer: Customer) => {
    updateInvoiceField("customerId", customer.id);
    updateInvoiceField("customerName", customer.name);
    updateInvoiceField("customerPhone", customer.phone);
    updateInvoiceField("customerAccountNumber", customer.accountNumber || "");
    
    toast.success(`تم اختيار العميل: ${customer.name}`);
    setShowCustomerSelector(false);
  };

  // Settings for the invoice form with all required properties
  const invoiceSettings = {
    showCompanyLogo: true,
    showDiscount: true,
    showTax: true,
    showCustomerDetails: true,
    showItemCodes: true,
    showItemNotes: true,
    showSignature: false,
    fontSize: 'medium' as const,
    tableColumns: ['serial', 'name', 'quantity', 'price', 'total', 'notes'],
    tableWidth: 100
  };

  return (
    <Layout className="h-screen overflow-hidden p-0">
      <div className="flex flex-col h-full">
        <Header title="فاتورة مبيعات جديدة" showBack={true}>
          <Button
            onClick={handleOpenCustomerSelector}
            className="ml-2 bg-purple-600 hover:bg-purple-700"
          >
            <Users className="ml-1 h-4 w-4" />
            اختيار العميل
          </Button>
          <Button
            onClick={handleOpenProductSearch}
            className="ml-2 bg-blue-600 hover:bg-blue-700"
          >
            <Search className="ml-1 h-4 w-4" />
            البحث عن منتج
          </Button>
          <Button
            onClick={handleSaveInvoice}
            disabled={isLoading || invoice.items.length === 0}
            className="mr-2 bg-green-600 hover:bg-green-700"
          >
            <Save className="ml-1 h-4 w-4" />
            حفظ الفاتورة
          </Button>
        </Header>
        <div className="flex-1 overflow-auto">
          <InvoiceForm
            invoice={invoice}
            onFieldChange={updateInvoiceField}
            onAddItem={handleAddInvoiceItem}
            onUpdateItem={handleUpdateInvoiceItem}
            onRemoveItem={handleRemoveInvoiceItem}
            onApplyDiscount={applyDiscount}
            isLoading={isLoading}
            settings={invoiceSettings}
            renderProductSearch={(onAddItem) => (
              <div className="w-full">
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={handleOpenProductSearch}
                  className="w-full border border-dashed border-gray-300 text-gray-500 hover:bg-blue-50 hover:border-blue-300"
                >
                  <Plus className="h-4 w-4 ml-1" />
                  إضافة صنف من المخزون
                </Button>
              </div>
            )}
          />
        </div>
      </div>

      {/* Product Search Dialog */}
      {showProductSearch && (
        <QuickProductSearch
          onClose={() => setShowProductSearch(false)}
          onSelect={handleProductSelect}
        />
      )}
      
      {/* Customer Selector Dialog */}
      <CustomerSelector
        isOpen={showCustomerSelector}
        onClose={() => setShowCustomerSelector(false)}
        onSelect={handleCustomerSelect}
      />
    </Layout>
  );
};

export default SalesInvoicePage;

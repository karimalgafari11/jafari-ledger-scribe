
import React, { useState } from "react";
import { PurchaseInvoice, PurchaseItem } from "@/types/purchases";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { PurchaseInvoiceHeader } from "./PurchaseInvoiceHeader";
import { PurchaseInvoiceTable } from "./PurchaseInvoiceTable";
import { PurchaseInvoiceSummary } from "./PurchaseInvoiceSummary";
import { PurchaseInvoiceActions } from "./PurchaseInvoiceActions";
import { SimplePurchaseInvoice } from "./SimplePurchaseInvoice";
import { usePurchaseInvoice } from "@/hooks/usePurchaseInvoice";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const initialInvoice: PurchaseInvoice = {
  id: uuidv4(),
  invoiceNumber: `P-${Math.floor(Math.random() * 10000)}`,
  vendorId: "",
  vendorName: "",
  vendorAccountNumber: "",
  date: format(new Date(), "yyyy-MM-dd"),
  items: [],
  subtotal: 0,
  totalAmount: 0,
  paymentMethod: "cash",
  status: "draft"
};

export const PurchaseInvoiceForm: React.FC = () => {
  const [invoice, setInvoice] = useState<PurchaseInvoice>(initialInvoice);
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("detailed");

  // Handle field changes
  const handleFieldChange = (field: keyof PurchaseInvoice, value: any) => {
    setInvoice((prev) => ({ ...prev, [field]: value }));
  };

  // Handle date change
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setInvoice((prev) => ({ 
        ...prev, 
        date: format(date, "yyyy-MM-dd") 
      }));
    }
  };

  // Handle adding an item
  const handleAddItem = (item: Partial<PurchaseItem>) => {
    const newItem = {
      id: uuidv4(),
      productId: item.productId || uuidv4(),
      code: item.code || "",
      name: item.name || "",
      manufacturer: item.manufacturer || "",
      size: item.size || "",
      quantity: item.quantity || 1,
      price: item.price || 0,
      discount: item.discount || 0,
      discountType: item.discountType || "percentage",
      tax: item.tax || 0,
      total: (item.quantity || 1) * (item.price || 0),
      notes: item.notes || ""
    } as PurchaseItem;

    setInvoice(prev => {
      const updatedItems = [...prev.items, newItem];
      const subtotal = calculateSubtotal(updatedItems);
      return {
        ...prev,
        items: updatedItems,
        subtotal,
        totalAmount: calculateTotalAmount(subtotal, prev.discount, prev.discountType, prev.tax, prev.expenses)
      };
    });
    
    setIsAddingItem(false);
    toast.success("تمت إضافة الصنف بنجاح");
  };

  // Handle updating an item
  const handleUpdateItem = (index: number, item: Partial<PurchaseItem>) => {
    setInvoice(prev => {
      const updatedItems = [...prev.items];
      updatedItems[index] = {
        ...updatedItems[index],
        ...item,
        total: (item.quantity || updatedItems[index].quantity) * 
               (item.price || updatedItems[index].price)
      };
      
      const subtotal = calculateSubtotal(updatedItems);
      return {
        ...prev,
        items: updatedItems,
        subtotal,
        totalAmount: calculateTotalAmount(subtotal, prev.discount, prev.discountType, prev.tax, prev.expenses)
      };
    });
    
    setEditingItemIndex(null);
    toast.success("تم تحديث الصنف بنجاح");
  };

  // Handle removing an item
  const handleRemoveItem = (index: number) => {
    setInvoice(prev => {
      const updatedItems = prev.items.filter((_, i) => i !== index);
      const subtotal = calculateSubtotal(updatedItems);
      return {
        ...prev,
        items: updatedItems,
        subtotal,
        totalAmount: calculateTotalAmount(subtotal, prev.discount, prev.discountType, prev.tax, prev.expenses)
      };
    });
    
    toast.success("تم حذف الصنف بنجاح");
  };

  // Apply discount
  const handleApplyDiscount = (type: 'percentage' | 'fixed', value: number) => {
    setInvoice(prev => {
      return {
        ...prev,
        discount: value,
        discountType: type,
        totalAmount: calculateTotalAmount(prev.subtotal, value, type, prev.tax, prev.expenses)
      };
    });
  };

  // Apply expenses
  const handleApplyExpenses = (value: number) => {
    setInvoice(prev => {
      return {
        ...prev,
        expenses: value,
        totalAmount: calculateTotalAmount(prev.subtotal, prev.discount, prev.discountType, prev.tax, value)
      };
    });
  };

  // Calculate subtotal
  const calculateSubtotal = (items: PurchaseItem[]): number => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  // Calculate total amount
  const calculateTotalAmount = (
    subtotal: number, 
    discount?: number, 
    discountType?: 'percentage' | 'fixed',
    tax?: number,
    expenses?: number
  ): number => {
    let total = subtotal;
    
    // Apply discount
    if (discount && discount > 0) {
      if (discountType === 'percentage') {
        total -= (subtotal * (discount / 100));
      } else {
        total -= discount;
      }
    }
    
    // Apply tax
    if (tax && tax > 0) {
      total += (total * (tax / 100));
    }
    
    // Add expenses
    if (expenses && expenses > 0) {
      total += expenses;
    }
    
    return total;
  };

  // Save invoice
  const handleSaveInvoice = () => {
    // Here you would typically save to your backend
    console.log("Saving invoice:", invoice);
    toast.success("تم حفظ الفاتورة بنجاح");
  };

  // Handle print
  const handlePrint = () => {
    setActiveTab("simple"); // Switch to simple view before printing
    setTimeout(() => {
      window.print();
      toast.success("جاري طباعة الفاتورة");
    }, 100);
  };

  // Handle WhatsApp send
  const handleWhatsAppSend = () => {
    if (!invoice.vendorPhone) {
      toast.error("رقم هاتف المورد غير متوفر");
      return;
    }

    const message = `فاتورة شراء رقم: ${invoice.invoiceNumber}\n` +
      `التاريخ: ${invoice.date}\n` +
      `المورد: ${invoice.vendorName}\n` +
      `المبلغ الإجمالي: ${invoice.totalAmount.toFixed(2)} ريال`;
    
    const phoneNumber = invoice.vendorPhone.replace(/[^\d+]/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success("تم فتح رابط واتساب");
  };

  // Calculate remaining amount
  const calculateRemaining = () => {
    const amountPaid = invoice.amountPaid || 0;
    return invoice.totalAmount - amountPaid;
  };

  return (
    <div className="container mx-auto p-2 md:p-6 print:p-0 flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold mb-4 print:hidden">فاتورة شراء جديدة</h1>

      <div className="print:hidden mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="detailed">المحرر الكامل</TabsTrigger>
            <TabsTrigger value="simple">عرض مبسط</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <TabsContent value="detailed" className={activeTab !== "detailed" ? "hidden" : ""}>
        <Card className="mb-4 print:shadow-none print:border-none">
          <CardContent className="p-2 md:p-6">
            <PurchaseInvoiceHeader
              invoice={invoice}
              onFieldChange={handleFieldChange}
              onDateChange={handleDateChange}
            />
            
            <div className="mb-4 print:mb-2">
              <PurchaseInvoiceTable
                items={invoice.items}
                isAddingItem={isAddingItem}
                editingItemIndex={editingItemIndex}
                setIsAddingItem={setIsAddingItem}
                setEditingItemIndex={setEditingItemIndex}
                onAddItem={handleAddItem}
                onUpdateItem={handleUpdateItem}
                onRemoveItem={handleRemoveItem}
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 print:flex-row">
              <div className="w-full md:w-1/2 print:w-1/2">
                <Label htmlFor="notes">ملاحظات</Label>
                <Textarea
                  id="notes"
                  className="h-32"
                  placeholder="أي ملاحظات إضافية..."
                  value={invoice.notes || ""}
                  onChange={(e) => handleFieldChange("notes", e.target.value)}
                />
              </div>
              
              <div className="w-full md:w-1/2 print:w-1/2">
                <PurchaseInvoiceSummary 
                  subtotal={invoice.subtotal}
                  discount={invoice.discount}
                  discountType={invoice.discountType}
                  tax={invoice.tax}
                  expenses={invoice.expenses}
                  totalAmount={invoice.totalAmount}
                  amountPaid={invoice.amountPaid}
                  remaining={calculateRemaining()}
                  onApplyDiscount={handleApplyDiscount}
                  onApplyExpenses={handleApplyExpenses}
                  onAmountPaidChange={(amount) => handleFieldChange("amountPaid", amount)}
                />
              </div>
            </div>
            
            <PurchaseInvoiceActions
              onSave={handleSaveInvoice}
              onPrint={handlePrint}
              onWhatsAppSend={handleWhatsAppSend}
              className="mt-4 print:hidden"
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="simple" className={`${activeTab !== "simple" ? "hidden" : ""} print:block`}>
        <SimplePurchaseInvoice invoice={invoice} />
        
        <div className="mt-4 flex justify-center gap-2 print:hidden">
          <Button onClick={handlePrint}>
            طباعة الفاتورة
          </Button>
          <Button variant="outline" onClick={() => setActiveTab("detailed")}>
            العودة للمحرر
          </Button>
        </div>
      </TabsContent>
    </div>
  );
};

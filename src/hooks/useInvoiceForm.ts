
import { useState, useRef } from "react";
import { Invoice, InvoiceItem } from "@/types/invoices";
import { toast } from "sonner";
import { mockCustomers } from "@/data/mockCustomers";
import { format } from "date-fns";

export const useInvoiceForm = (invoice: Invoice, onFieldChange: (field: string, value: any) => void, onAddItem: (item: Partial<InvoiceItem>) => void, onUpdateItem: (index: number, item: Partial<InvoiceItem>) => void, onRemoveItem: (index: number) => void, onApplyDiscount: (type: 'percentage' | 'fixed', value: number) => void) => {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
  const [isDiscountFormOpen, setIsDiscountFormOpen] = useState(false);
  const [tableWidth, setTableWidth] = useState(100); // Default width in percent
  const tableRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);
  const startWidth = useRef<number>(0);
  const startX = useRef<number>(0);
  
  // Company information state
  const [companyInfo, setCompanyInfo] = useState({
    name: "الجعفري للمحاسبة",
    phone: "966500000000+",
    email: "info@aljaafari.com",
    address: "الرياض، المملكة العربية السعودية",
    isEditing: false
  });

  // Handle adding an item
  const handleAddItem = (item: Partial<InvoiceItem>) => {
    onAddItem(item);
    setIsAddingItem(false);
  };

  // Handle updating an item
  const handleUpdateItem = (item: Partial<InvoiceItem>) => {
    if (editingItemIndex !== null) {
      onUpdateItem(editingItemIndex, item);
      setEditingItemIndex(null);
    }
  };

  // Handle editing an item
  const handleEditItem = (index: number) => {
    setEditingItemIndex(index);
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingItemIndex(null);
  };

  // Cancel add
  const handleCancelAdd = () => {
    setIsAddingItem(false);
  };

  // Apply discount
  const handleApplyDiscount = (type: 'percentage' | 'fixed', value: number) => {
    onApplyDiscount(type, value);
    setIsDiscountFormOpen(false);
  };

  // Edit company information
  const toggleCompanyEdit = () => {
    setCompanyInfo(prev => ({ ...prev, isEditing: !prev.isEditing }));
  };

  // Change company information
  const handleCompanyInfoChange = (field: string, value: string) => {
    setCompanyInfo(prev => ({ ...prev, [field]: value }));
  };

  // Start table resize
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    startWidth.current = tableRef.current?.offsetWidth || 0;
    startX.current = e.clientX;
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  // Handle table resize move
  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const parentWidth = tableRef.current?.parentElement?.offsetWidth || 1;
    const delta = e.clientX - startX.current;
    const newWidth = Math.max(50, Math.min(100, (startWidth.current + delta) / parentWidth * 100));
    setTableWidth(newWidth);
  };

  // End table resize
  const handleResizeEnd = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  // WhatsApp share
  const handleWhatsAppShare = () => {
    const customer = mockCustomers.find(c => c.id === invoice.customerId);
    if (!customer || !customer.phone) {
      toast.error("لا يمكن الإرسال عبر واتساب: رقم هاتف العميل غير متوفر");
      return;
    }

    // Format WhatsApp message
    const message = `فاتورة مبيعات رقم: ${invoice.invoiceNumber}\n` +
      `التاريخ: ${format(new Date(invoice.date), 'yyyy-MM-dd')}\n` +
      `العميل: ${invoice.customerName}\n` +
      `المبلغ الإجمالي: ${invoice.totalAmount} ر.س`;
      
    const phoneNumber = customer.phone.replace(/[^\d+]/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp link in new window
    window.open(whatsappUrl, '_blank');
    toast.success("تم فتح رابط الواتساب");
  };

  // Create PDF
  const handleCreatePDF = () => {
    toast.info("جاري إعداد ملف PDF...");
    // In a real app, this would call an API to create a PDF
    setTimeout(() => {
      toast.success("تم إنشاء ملف PDF بنجاح");
    }, 1500);
  };

  // Calculate remaining amount
  const calculateRemaining = () => {
    const amountPaid = invoice.amountPaid || 0;
    return (invoice.totalAmount - amountPaid).toFixed(2);
  };

  // Handle amount paid change
  const handleAmountPaidChange = (amount: number) => {
    onFieldChange("amountPaid", amount);
  };

  // Handle notes change
  const handleNotesChange = (notes: string) => {
    onFieldChange("notes", notes);
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Handle share
  const handleShare = () => {
    // Check if Web Share API is supported
    if (navigator.share) {
      navigator.share({
        title: `فاتورة رقم ${invoice.invoiceNumber}`,
        text: `تفاصيل فاتورة مبيعات رقم ${invoice.invoiceNumber} للعميل ${invoice.customerName}`,
      }).catch(() => {
        toast.error("حدث خطأ أثناء مشاركة الفاتورة");
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      toast.info("مشاركة الفاتورة غير متاحة على هذا المتصفح");
    }
  };

  return {
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
    handlePrint,
    handleShare
  };
};

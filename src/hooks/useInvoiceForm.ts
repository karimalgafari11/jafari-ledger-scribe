
import { useState, useRef, useEffect } from "react";
import { Invoice, InvoiceItem } from "@/types/invoices";
import { CompanyInfo } from "../components/invoices/invoice-form/InvoiceHeader";
import { toast } from "sonner";

export const useInvoiceForm = (
  invoice: Invoice,
  onFieldChange: (field: string, value: any) => void,
  onAddItem: (item: Partial<InvoiceItem>) => void,
  onUpdateItem: (index: number, item: Partial<InvoiceItem>) => void,
  onRemoveItem: (index: number) => void,
  onApplyDiscount: (type: 'percentage' | 'fixed', value: number) => void
) => {
  // معلومات الشركة
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: "شركة نظام محاسبة",
    logo: "/assets/logo.png",
    address: "الرياض، المملكة العربية السعودية",
    phone: "0500000000",
    email: "info@accounting-system.com",
    taxNumber: "123456789",
    website: "www.accounting-system.com"
  });

  // حالة إضافة/تعديل العناصر
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
  const [isDiscountFormOpen, setIsDiscountFormOpen] = useState(false);
  
  // عرض الجدول
  const [tableWidth, setTableWidth] = useState(100);
  const tableRef = useRef<HTMLDivElement>(null);

  // التعامل مع معلومات الشركة
  const [isEditingCompany, setIsEditingCompany] = useState(false);

  const toggleCompanyEdit = () => {
    setIsEditingCompany(!isEditingCompany);
  };

  const handleCompanyInfoChange = (key: keyof CompanyInfo, value: string) => {
    setCompanyInfo({
      ...companyInfo,
      [key]: value
    });
  };

  // إدارة عناصر الفاتورة
  const handleAddItem = (item: Partial<InvoiceItem>) => {
    onAddItem(item);
  };

  const handleUpdateItem = (index: number, item: Partial<InvoiceItem>) => {
    onUpdateItem(index, item);
    setEditingItemIndex(null);
  };

  const handleEditItem = (index: number) => {
    setEditingItemIndex(index);
  };

  const handleCancelEdit = () => {
    setEditingItemIndex(null);
  };

  const handleCancelAdd = () => {
    setIsAddingItem(false);
  };

  // إدارة الخصم
  const handleApplyDiscount = (type: 'percentage' | 'fixed', value: number) => {
    onApplyDiscount(type, value);
  };

  // تغيير عرض الجدول
  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const startX = e.clientX;
    const startWidth = tableWidth;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      const newWidth = Math.max(50, Math.min(100, startWidth + (delta / 5)));
      setTableWidth(newWidth);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // مشاركة الفاتورة
  const handleWhatsAppShare = () => {
    const phoneNumber = invoice.customerPhone?.replace(/\D/g, '') || '';
    if (!phoneNumber) {
      toast.error("رقم هاتف العميل غير متوفر للمشاركة");
      return;
    }
    
    const message = `مرحباً ${invoice.customerName}،\nنرفق لكم فاتورة رقم ${invoice.invoiceNumber} بمبلغ ${invoice.totalAmount} ريال.\nشكراً لتعاملكم معنا.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCreatePDF = () => {
    // في الإنتاج، هذه الدالة ستقوم بإنشاء ملف PDF
    toast.info("جاري تحويل الفاتورة إلى PDF...");
  };

  const calculateRemaining = () => {
    return (invoice.totalAmount || 0) - (invoice.amountPaid || 0);
  };

  const handleAmountPaidChange = (amount: number) => {
    onFieldChange('amountPaid', amount);
  };

  const handleNotesChange = (notes: string) => {
    onFieldChange('notes', notes);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `فاتورة رقم ${invoice.invoiceNumber}`,
        text: `فاتورة للعميل ${invoice.customerName} بقيمة ${invoice.totalAmount} ريال`,
        url: window.location.href,
      }).catch(err => {
        console.error("فشلت المشاركة:", err);
      });
    } else {
      toast.error("مشاركة الفاتورة غير متاحة في هذا المتصفح");
    }
  };

  return {
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
  };
};

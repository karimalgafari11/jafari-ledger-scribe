
import { useState } from 'react';
import { toast } from 'sonner';

// Mock vendor data
const mockVendors = [
  { 
    id: "1", 
    name: "شركة المستلزمات المكتبية", 
    contactPerson: "أحمد محمد",
    email: "ahmed@supplies.com",
    phone: "0512345678",
    address: "الرياض - حي السلام",
    balance: 12500.00,
    currency: "ريال",
    status: "نشط",
    taxNumber: "300198765",
    createdAt: "2023-05-15",
    category: "مستلزمات مكتبية"
  },
  { 
    id: "2", 
    name: "مؤسسة الإمداد التجارية", 
    contactPerson: "سلطان العتيبي",
    email: "sultan@emdad.com",
    phone: "0556789012",
    address: "جدة - حي الصفا",
    balance: 8750.50,
    currency: "ريال",
    status: "نشط",
    taxNumber: "300765432",
    createdAt: "2023-06-22",
    category: "معدات إلكترونية"
  },
  { 
    id: "3", 
    name: "مؤسسة نور للتجهيزات", 
    contactPerson: "خالد الشمري",
    email: "khaled@noor.com",
    phone: "0590123456",
    address: "الدمام - حي الفيصلية",
    balance: 0.00,
    currency: "ريال",
    status: "غير نشط",
    taxNumber: "300345678",
    createdAt: "2022-11-10",
    category: "أثاث مكتبي"
  },
  { 
    id: "4", 
    name: "شركة تقنيات المستقبل", 
    contactPerson: "سارة الغامدي",
    email: "sarah@futuretech.com",
    phone: "0501234567",
    address: "الخبر - حي الراكة",
    balance: 25000.00,
    currency: "ريال",
    status: "نشط",
    taxNumber: "300987123",
    createdAt: "2023-01-15",
    category: "أجهزة وتقنية"
  },
  { 
    id: "5", 
    name: "مصنع الجودة للمنتجات الورقية", 
    contactPerson: "فهد العنزي",
    email: "fahad@quality.com",
    phone: "0566543210",
    address: "مكة - الحمراء",
    balance: 5750.25,
    currency: "ريال",
    status: "نشط",
    taxNumber: "300555666",
    createdAt: "2023-03-20",
    category: "منتجات ورقية"
  }
];

export const useVendors = () => {
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter vendors based on the active tab
  const filteredVendors = mockVendors.filter(vendor => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && vendor.status === 'نشط') ||
                      (activeTab === 'inactive' && vendor.status !== 'نشط');
    
    return matchesTab;
  });

  const activeVendors = mockVendors.filter(v => v.status === 'نشط').length;
  const inactiveVendors = mockVendors.filter(v => v.status !== 'نشط').length;

  // Handler functions
  const handleToggleSelection = (id: string) => {
    if (selectedVendors.includes(id)) {
      setSelectedVendors(selectedVendors.filter(vendorId => vendorId !== id));
    } else {
      setSelectedVendors([...selectedVendors, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedVendors.length === filteredVendors.length) {
      setSelectedVendors([]);
    } else {
      setSelectedVendors(filteredVendors.map(vendor => vendor.id));
    }
  };

  const handleExportData = () => {
    toast.success("جاري تصدير بيانات الموردين...");
    console.log("تصدير البيانات", selectedVendors.length ? "للموردين المحددين" : "لكل الموردين");
    
    // محاكاة تنزيل ملف
    setTimeout(() => {
      toast.success("تم تصدير البيانات بنجاح");
    }, 1500);
  };

  const handleImportData = () => {
    toast.info("جاري فتح نافذة استيراد البيانات");
    console.log("استيراد البيانات");
    
    // محاكاة رفع ملف
    setTimeout(() => {
      toast.success("تم استيراد البيانات بنجاح");
    }, 1500);
  };

  const handleAddNewVendor = () => {
    toast.info("إضافة مورد جديد");
    console.log("إضافة مورد جديد");
  };

  const handleExportSelected = () => {
    if (selectedVendors.length === 0) {
      toast.error("يرجى تحديد مورد واحد على الأقل للتصدير");
      return;
    }
    
    toast.success(`جاري تصدير بيانات ${selectedVendors.length} مورد...`);
    console.log("تصدير البيانات للموردين المحددين", selectedVendors);
  };

  const handleDeleteSelected = () => {
    if (selectedVendors.length === 0) {
      toast.error("يرجى تحديد مورد واحد على الأقل للحذف");
      return;
    }
    
    // التحقق من وجود موردين لديهم رصيد غير صفري
    const vendorsWithBalance = selectedVendors.filter(id => 
      mockVendors.find(vendor => vendor.id === id && vendor.balance > 0)
    );
    
    if (vendorsWithBalance.length > 0) {
      toast.error(`لا يمكن حذف ${vendorsWithBalance.length} مورد بسبب وجود أرصدة مستحقة`);
      return;
    }
    
    toast.success(`تم حذف ${selectedVendors.length} مورد بنجاح`);
    console.log("حذف الموردين المحددين", selectedVendors);
    setSelectedVendors([]);
  };

  const handleViewVendor = (vendor: any) => {
    toast.info(`عرض تفاصيل المورد: ${vendor.name}`);
    console.log('عرض تفاصيل المورد:', vendor);
  };

  const handleEditVendor = (vendor: any) => {
    toast.info(`تعديل بيانات المورد: ${vendor.name}`);
    console.log('تعديل بيانات المورد:', vendor);
  };

  const handleViewTransactions = (vendor: any) => {
    toast.info(`عرض معاملات المورد: ${vendor.name}`);
    console.log('عرض معاملات المورد:', vendor);
  };

  const handleDeleteVendor = (vendor: any) => {
    if (vendor.balance > 0) {
      toast.error(`لا يمكن حذف المورد لوجود رصيد مستحق: ${vendor.balance} ${vendor.currency}`);
      return;
    }
    
    toast.success(`تم حذف المورد: ${vendor.name}`);
    console.log('حذف المورد:', vendor);
  };

  return {
    vendors: filteredVendors,
    totalVendors: mockVendors.length,
    activeVendors,
    inactiveVendors,
    selectedVendors,
    activeTab,
    searchTerm,
    showFilters,
    setActiveTab,
    setSearchTerm,
    setShowFilters,
    handleToggleSelection,
    handleSelectAll,
    handleExportData,
    handleImportData,
    handleAddNewVendor,
    handleExportSelected,
    handleDeleteSelected,
    handleViewVendor,
    handleEditVendor,
    handleViewTransactions,
    handleDeleteVendor,
  };
};

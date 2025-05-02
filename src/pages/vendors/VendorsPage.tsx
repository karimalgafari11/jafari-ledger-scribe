
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataGrid } from "@/components/inventory/DataGrid";
import { 
  Search, 
  UserPlus, 
  Download, 
  Upload, 
  Filter, 
  Edit, 
  Trash, 
  Eye,
  FileText,
  Tag,
  Phone,
  Mail,
  Building
} from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { SearchBar } from "@/components/SearchBar";

// نموذج بيانات الموردين للعرض
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

const VendorsPage = () => {
  const navigate = useNavigate();
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // تعريف أعمدة جدول الموردين
  const columns = [
    { id: 'name', header: 'اسم المورد', accessorKey: 'name', isVisible: true },
    { 
      id: 'status', 
      header: 'الحالة', 
      accessorKey: 'status', 
      isVisible: true,
      cell: (value: string) => (
        <Badge className={value === 'نشط' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-gray-100 text-gray-800 border-gray-300'}>
          {value}
        </Badge>
      )
    },
    { id: 'contactPerson', header: 'الشخص المسؤول', accessorKey: 'contactPerson', isVisible: true },
    { id: 'phone', header: 'رقم الهاتف', accessorKey: 'phone', isVisible: true },
    { id: 'email', header: 'البريد الإلكتروني', accessorKey: 'email', isVisible: true },
    { 
      id: 'balance', 
      header: 'الرصيد', 
      accessorKey: 'balance', 
      isVisible: true,
      cell: (value: number, row: any) => (
        <span className={value > 0 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
          {value.toLocaleString('ar-SA')} {row.currency}
        </span>
      )
    },
    { id: 'category', header: 'التصنيف', accessorKey: 'category', isVisible: true },
    { id: 'taxNumber', header: 'الرقم الضريبي', accessorKey: 'taxNumber', isVisible: true }
  ];

  // تعريف إجراءات التعامل مع الموردين
  const actions = [
    { 
      label: "عرض تفاصيل",
      icon: <Eye className="text-blue-600" />, 
      onClick: (vendor: any) => handleViewVendor(vendor),
      variant: "ghost" as const
    },
    { 
      label: "تعديل",
      icon: <Edit className="text-amber-600" />, 
      onClick: (vendor: any) => handleEditVendor(vendor),
      variant: "ghost" as const
    },
    { 
      label: "المعاملات",
      icon: <FileText className="text-indigo-600" />, 
      onClick: (vendor: any) => handleViewTransactions(vendor),
      variant: "ghost" as const
    },
    { 
      label: "حذف",
      icon: <Trash className="text-red-600" />, 
      onClick: (vendor: any) => handleDeleteVendor(vendor),
      variant: "ghost" as const,
      condition: (vendor: any) => vendor.balance === 0
    }
  ];

  const form = useForm();

  // وظائف التعامل مع الإجراءات
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

  // التعامل مع اختيار المورد
  const handleToggleSelection = (id: string) => {
    if (selectedVendors.includes(id)) {
      setSelectedVendors(selectedVendors.filter(vendorId => vendorId !== id));
    } else {
      setSelectedVendors([...selectedVendors, id]);
    }
  };

  // التعامل مع اختيار كل الموردين
  const handleSelectAll = () => {
    if (selectedVendors.length === filteredVendors.length) {
      setSelectedVendors([]);
    } else {
      setSelectedVendors(filteredVendors.map(vendor => vendor.id));
    }
  };

  // تصفية الموردين بناءً على الحالة والبحث
  const filteredVendors = mockVendors.filter(vendor => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && vendor.status === 'نشط') ||
                      (activeTab === 'inactive' && vendor.status !== 'نشط');
    
    const matchesSearch = searchTerm === '' || 
                          vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vendor.phone.includes(searchTerm);
    
    return matchesTab && matchesSearch;
  });

  // وظائف التعامل مع الأزرار
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
    // يمكن إضافة تنقل للصفحة إضافة مورد جديد
    // navigate('/vendors/add');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = () => {
    setShowFilters(!showFilters);
    toast.info(showFilters ? "إخفاء خيارات التصفية" : "عرض خيارات التصفية");
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

  return (
    <Layout className="p-0">
      <div className="container mx-auto p-0 sm:p-4 md:p-6 h-screen flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">إدارة الموردين</h1>
          <div className="flex flex-wrap space-x-2 rtl:space-x-reverse gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={handleExportData}
            >
              <Download size={16} /> تصدير البيانات
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={handleImportData}
            >
              <Upload size={16} /> استيراد البيانات
            </Button>
            <Button 
              variant="default" 
              className="flex items-center gap-2"
              onClick={handleAddNewVendor}
            >
              <UserPlus size={16} /> إضافة مورد جديد
            </Button>
          </div>
        </div>
        
        <Card className="mb-6 flex-grow overflow-hidden flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>الموردين</CardTitle>
              <div className="relative w-full sm:w-64">
                <SearchBar 
                  placeholder="بحث عن مورد..." 
                  onChange={handleSearch}
                  className="w-full"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Building size={16} /> كل الموردين
                  <Badge variant="outline" className="ml-2 bg-gray-100">{mockVendors.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="active" className="flex items-center gap-2">
                  <Tag size={16} /> نشط
                  <Badge variant="outline" className="ml-2 bg-green-100">{mockVendors.filter(v => v.status === 'نشط').length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="inactive" className="flex items-center gap-2">
                  <Tag size={16} /> غير نشط
                  <Badge variant="outline" className="ml-2 bg-gray-100">{mockVendors.filter(v => v.status !== 'نشط').length}</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {showFilters && (
              <div className="mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                <h3 className="text-sm font-medium mb-3">خيارات التصفية المتقدمة</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">التصنيف</label>
                    <select className="w-full p-2 border border-gray-200 rounded text-sm">
                      <option value="">الكل</option>
                      <option value="مستلزمات مكتبية">مستلزمات مكتبية</option>
                      <option value="معدات إلكترونية">معدات إلكترونية</option>
                      <option value="أثاث مكتبي">أثاث مكتبي</option>
                      <option value="أجهزة وتقنية">أجهزة وتقنية</option>
                      <option value="منتجات ورقية">منتجات ورقية</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">الرصيد</label>
                    <select className="w-full p-2 border border-gray-200 rounded text-sm">
                      <option value="">الكل</option>
                      <option value="positive">لديه رصيد مستحق</option>
                      <option value="zero">رصيد صفر</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button size="sm" className="mr-2">تطبيق</Button>
                    <Button size="sm" variant="outline" onClick={() => setShowFilters(false)}>إلغاء</Button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                {selectedVendors.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">تم اختيار {selectedVendors.length} مورد</Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleExportSelected}
                    >
                      تصدير المحدد
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={handleDeleteSelected}
                    >
                      حذف المحدد
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={handleFilter}
                >
                  <Filter size={16} />
                  تصفية
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border flex-grow overflow-auto">
              <DataGrid
                data={filteredVendors}
                columns={columns}
                actions={actions}
                selectable={true}
                selectedRows={selectedVendors}
                onToggleSelection={handleToggleSelection}
                onSelectAll={handleSelectAll}
                emptyMessage="لا توجد بيانات موردين متاحة"
              />
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              إجمالي الموردين: {filteredVendors.length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>الاحصائيات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-blue-700">إجمالي الموردين</h3>
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-700">{mockVendors.length}</p>
                <p className="text-xs text-blue-600 mt-1">
                  نشط: {mockVendors.filter(v => v.status === 'نشط').length} | 
                  غير نشط: {mockVendors.filter(v => v.status !== 'نشط').length}
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-green-700">إجمالي المشتريات</h3>
                  <Tag className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-700">152,750.00 ريال</p>
                <p className="text-xs text-green-600 mt-1">من 65 فاتورة شراء</p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-amber-700">مستحقات للموردين</h3>
                  <FileText className="h-5 w-5 text-amber-600" />
                </div>
                <p className="text-2xl font-bold text-amber-700">52,000.75 ريال</p>
                <p className="text-xs text-amber-600 mt-1">من 18 فاتورة غير مسددة</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-purple-700">متوسط مدة السداد</h3>
                  <Phone className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-purple-700">28 يوم</p>
                <p className="text-xs text-purple-600 mt-1">متوسط الوقت لسداد الفواتير</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default VendorsPage;

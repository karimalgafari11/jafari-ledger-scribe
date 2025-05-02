
import React, { useState } from "react";
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
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
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
      onClick: (vendor: any) => console.log('عرض تفاصيل المورد:', vendor.id),
      variant: "ghost" 
    },
    { 
      label: "تعديل",
      icon: <Edit className="text-amber-600" />, 
      onClick: (vendor: any) => console.log('تعديل بيانات المورد:', vendor.id),
      variant: "ghost"
    },
    { 
      label: "المعاملات",
      icon: <FileText className="text-indigo-600" />, 
      onClick: (vendor: any) => console.log('عرض معاملات المورد:', vendor.id),
      variant: "ghost"
    },
    { 
      label: "حذف",
      icon: <Trash className="text-red-600" />, 
      onClick: (vendor: any) => console.log('حذف المورد:', vendor.id),
      variant: "ghost",
      condition: (vendor: any) => vendor.balance === 0 // يمكن حذف المورد فقط إذا كان رصيده صفر
    }
  ];

  const form = useForm();

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
                          vendor.name.includes(searchTerm) || 
                          vendor.contactPerson.includes(searchTerm) ||
                          vendor.email.includes(searchTerm) ||
                          vendor.phone.includes(searchTerm);
    
    return matchesTab && matchesSearch;
  });

  return (
    <div className="container p-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">إدارة الموردين</h1>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download size={16} /> تصدير البيانات
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Upload size={16} /> استيراد البيانات
          </Button>
          <Button variant="default" className="flex items-center gap-2">
            <UserPlus size={16} /> إضافة مورد جديد
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>الموردين</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث عن مورد..."
                className="pl-8 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
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
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {selectedVendors.length > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">تم اختيار {selectedVendors.length} مورد</Badge>
                  <Button variant="outline" size="sm">تصدير المحدد</Button>
                  <Button variant="destructive" size="sm">حذف المحدد</Button>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter size={16} />
                تصفية
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
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
      
      <Card>
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
  );
};

export default VendorsPage;

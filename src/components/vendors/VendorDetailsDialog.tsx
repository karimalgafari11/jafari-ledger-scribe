
import React, { useState } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogHeader,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Building, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  FileText, 
  Tag,
  ArrowLeftRight,
  Edit,
  FileSpreadsheet
} from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface VendorDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  vendor: any;
}

export const VendorDetailsDialog: React.FC<VendorDetailsDialogProps> = ({
  open,
  onClose,
  vendor
}) => {
  const [activeTab, setActiveTab] = useState("info");
  
  if (!vendor) return null;
  
  const handleViewTransactions = () => {
    toast.info(`عرض معاملات المورد: ${vendor.name}`);
    onClose();
  };
  
  const handlePrintStatement = () => {
    toast.info(`طباعة كشف حساب المورد: ${vendor.name}`);
  };
  
  const handleEditVendor = () => {
    toast.info(`تعديل بيانات المورد: ${vendor.name}`);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <Building className="w-5 h-5 text-blue-500 ml-2" />
            <span>تفاصيل المورد</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl">
            {vendor.name.substring(0, 2)}
          </div>
          <div>
            <h2 className="text-xl font-bold">{vendor.name}</h2>
            <div className="flex items-center mt-1">
              <Badge className={vendor.status === 'نشط' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-gray-100 text-gray-800 border-gray-300'}>
                {vendor.status}
              </Badge>
              <span className="text-sm text-gray-500 mr-3">
                رقم المورد: {vendor.id}
              </span>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="info" className="flex-1">المعلومات الأساسية</TabsTrigger>
            <TabsTrigger value="financial" className="flex-1">البيانات المالية</TabsTrigger>
            <TabsTrigger value="transactions" className="flex-1">المعاملات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-3 text-gray-700">
                    <User className="w-4 h-4 ml-2 text-blue-500" />
                    <span className="text-sm font-medium">الشخص المسؤول</span>
                  </div>
                  <p>{vendor.contactPerson}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-3 text-gray-700">
                    <Phone className="w-4 h-4 ml-2 text-blue-500" />
                    <span className="text-sm font-medium">رقم الهاتف</span>
                  </div>
                  <p dir="ltr" className="text-right">{vendor.phone}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-3 text-gray-700">
                    <Mail className="w-4 h-4 ml-2 text-blue-500" />
                    <span className="text-sm font-medium">البريد الإلكتروني</span>
                  </div>
                  <p dir="ltr" className="text-right">{vendor.email}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-3 text-gray-700">
                    <Tag className="w-4 h-4 ml-2 text-blue-500" />
                    <span className="text-sm font-medium">التصنيف</span>
                  </div>
                  <p>{vendor.category}</p>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardContent className="p-4">
                  <div className="flex items-center mb-3 text-gray-700">
                    <MapPin className="w-4 h-4 ml-2 text-blue-500" />
                    <span className="text-sm font-medium">العنوان</span>
                  </div>
                  <p>{vendor.address}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-3 text-gray-700">
                    <FileText className="w-4 h-4 ml-2 text-blue-500" />
                    <span className="text-sm font-medium">الرقم الضريبي</span>
                  </div>
                  <p dir="ltr" className="text-right">{vendor.taxNumber || "غير محدد"}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-3 text-gray-700">
                    <FileText className="w-4 h-4 ml-2 text-blue-500" />
                    <span className="text-sm font-medium">تاريخ التسجيل</span>
                  </div>
                  <p>{vendor.createdAt}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="financial" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-3 text-gray-700">
                    <CreditCard className="w-4 h-4 ml-2 text-blue-500" />
                    <span className="text-sm font-medium">الرصيد الحالي</span>
                  </div>
                  <p className={`text-lg font-bold ${vendor.balance > 0 ? 'text-blue-600' : 'text-gray-600'}`}>
                    {vendor.balance.toLocaleString('ar-SA')} {vendor.currency}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-3 text-gray-700">
                    <CreditCard className="w-4 h-4 ml-2 text-blue-500" />
                    <span className="text-sm font-medium">حد الائتمان</span>
                  </div>
                  <p className="text-lg font-medium">
                    {(vendor.creditLimit || 0).toLocaleString('ar-SA')} {vendor.currency}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-3 text-gray-700">
                    <ArrowLeftRight className="w-4 h-4 ml-2 text-blue-500" />
                    <span className="text-sm font-medium">إجمالي المشتريات</span>
                  </div>
                  <p className="text-lg font-medium">
                    {(45500).toLocaleString('ar-SA')} {vendor.currency}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-3 text-gray-700">
                    <ArrowLeftRight className="w-4 h-4 ml-2 text-blue-500" />
                    <span className="text-sm font-medium">عدد المعاملات</span>
                  </div>
                  <p className="text-lg font-medium">12 معاملة</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-gray-700">
                    <FileText className="w-4 h-4 ml-2 text-blue-500" />
                    <span className="text-sm font-medium">ملخص الحساب</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handlePrintStatement}>
                    <FileSpreadsheet className="w-4 h-4 ml-2" />
                    طباعة كشف الحساب
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">الفواتير المفتوحة</p>
                    <p className="text-lg font-medium text-blue-700 mt-1">3 فواتير</p>
                  </div>
                  
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">المستحقات</p>
                    <p className="text-lg font-medium text-amber-700 mt-1">
                      {(vendor.balance || 0).toLocaleString('ar-SA')} {vendor.currency}
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">مدفوعات هذا الشهر</p>
                    <p className="text-lg font-medium text-green-700 mt-1">
                      {(12500).toLocaleString('ar-SA')} {vendor.currency}
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">متوسط فترة السداد</p>
                    <p className="text-lg font-medium text-purple-700 mt-1">15 يوم</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions" className="mt-4">
            <div className="text-center py-8">
              <ArrowLeftRight className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">معاملات المورد</h3>
              <p className="text-gray-500 mb-4">اضغط على الزر أدناه لعرض معاملات المورد بالتفصيل</p>
              <Button onClick={handleViewTransactions}>
                عرض المعاملات
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-6 gap-2">
          <Button
            variant="outline"
            onClick={onClose}
          >
            إغلاق
          </Button>
          <Button
            onClick={handleEditVendor}
            className="flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            تعديل البيانات
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, CreditCard, File, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  if (!vendor) return null;

  const handleViewStatement = () => {
    navigate(`/vendors/statement/${vendor.id}`);
    onClose();
  };

  const handleEditVendor = () => {
    // سيفتح نافذة التعديل في التطبيق الحقيقي
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{vendor.name}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="info">
          <TabsList className="mb-4">
            <TabsTrigger value="info">معلومات المورد</TabsTrigger>
            <TabsTrigger value="transactions">المعاملات</TabsTrigger>
            <TabsTrigger value="stats">إحصائيات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">معلومات الاتصال</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span dir="ltr" className="text-sm">{vendor.phone || "غير محدد"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span dir="ltr" className="text-sm">{vendor.email || "غير محدد"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{vendor.address || "غير محدد"}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">المعلومات المالية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">الرصيد الحالي</span>
                    <span className={`font-bold ${vendor.balance > 0 ? "text-red-600" : "text-green-600"}`}>
                      {vendor.balance.toLocaleString('ar-SA')} {vendor.currency}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">الحساب مفتوح منذ</span>
                    <span className="text-sm">
                      {new Date(vendor.createdAt).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">حالة الحساب</span>
                    <span className={`px-2 py-1 rounded-md text-xs ${
                        vendor.status === "نشط" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}>
                      {vendor.status}
                    </span>
                  </div>
                  {vendor.dueDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">تاريخ الاستحقاق</span>
                      <span className="text-sm text-red-600">{vendor.dueDate}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {vendor.taxNumber && (
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">المعلومات القانونية</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">الرقم الضريبي:</span>
                      <span dir="ltr" className="text-sm">{vendor.taxNumber}</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="transactions">
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-muted-foreground py-8">
                  لا توجد معاملات سابقة مع هذا المورد
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats">
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-muted-foreground py-8">
                  لا تتوفر إحصائيات لهذا المورد
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleEditVendor}>
            تعديل البيانات
          </Button>
          <Button variant="outline" onClick={handleViewStatement}>
            <FileText className="ml-1 h-4 w-4" />
            عرض كشف الحساب
          </Button>
          <Button onClick={onClose}>إغلاق</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

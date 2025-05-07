
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PurchaseInvoice } from "@/types/purchases";
import { Badge } from "@/components/ui/badge";

interface PurchaseInvoiceQuickInfoProps {
  invoice: PurchaseInvoice;
  onFieldChange: (field: keyof PurchaseInvoice, value: any) => void;
}

export const PurchaseInvoiceQuickInfo: React.FC<PurchaseInvoiceQuickInfoProps> = ({
  invoice,
  onFieldChange
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(amount);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">ملخص الفاتورة</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">المجموع</dt>
              <dd className="font-medium">{formatCurrency(invoice.totalAmount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">المدفوع</dt>
              <dd className="font-medium">{formatCurrency(invoice.amountPaid || 0)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">المتبقي</dt>
              <dd className="text-primary font-semibold">{formatCurrency((invoice.totalAmount || 0) - (invoice.amountPaid || 0))}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">بيانات المورد</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div>
              <Label htmlFor="vendorName" className="text-xs text-gray-500">اسم المورد</Label>
              <div className="font-medium">{invoice.vendorName || "غير محدد"}</div>
            </div>
            <div>
              <Label htmlFor="vendorPhone" className="text-xs text-gray-500">هاتف المورد</Label>
              <div className="font-medium">{invoice.vendorPhone || "غير محدد"}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">ملاحظات الفاتورة</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Label htmlFor="notes" className="text-xs text-gray-500">ملاحظات</Label>
          <Input
            id="notes"
            placeholder="أضف ملاحظات للفاتورة"
            value={invoice.notes || ""}
            onChange={(e) => onFieldChange("notes", e.target.value)}
            className="mt-1"
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">حالة الفاتورة</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Badge
              variant={invoice.status === "paid" ? "success" : 
                     invoice.status === "pending" ? "warning" : 
                     invoice.status === "overdue" ? "destructive" : "outline"}
            >
              {invoice.status === "paid" ? "مدفوعة" : 
               invoice.status === "pending" ? "معلقة" :
               invoice.status === "overdue" ? "متأخرة" : "مسودة"}
            </Badge>
            <span className="text-sm text-gray-500">
              تم الإنشاء: {new Date().toLocaleDateString('ar-SA')}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


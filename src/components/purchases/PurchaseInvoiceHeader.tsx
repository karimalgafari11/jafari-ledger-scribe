
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PurchaseInvoice } from "@/types/purchases";
import { mockVendors } from "@/data/mockVendors";

interface PurchaseInvoiceHeaderProps {
  invoice: PurchaseInvoice;
  onFieldChange: (field: keyof PurchaseInvoice, value: any) => void;
  onDateChange: (date: Date | null) => void;
}

export const PurchaseInvoiceHeader: React.FC<PurchaseInvoiceHeaderProps> = ({
  invoice,
  onFieldChange,
  onDateChange
}) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rtl">
          <div className="space-y-2">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <Label htmlFor="invoiceNumber" className="text-base">رقم الفاتورة</Label>
                <Input
                  id="invoiceNumber"
                  value={invoice.invoiceNumber}
                  onChange={(e) => onFieldChange('invoiceNumber', e.target.value)}
                  className="text-base"
                />
              </div>
              
              <div className="w-full md:w-1/2">
                <Label htmlFor="date" className="text-base">تاريخ الفاتورة</Label>
                <DatePicker
                  date={invoice.date ? new Date(invoice.date) : new Date()}
                  onDateChange={onDateChange}
                  className="w-full"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="paymentMethod" className="text-base">طريقة الدفع</Label>
              <Select 
                value={invoice.paymentMethod} 
                onValueChange={(value) => onFieldChange('paymentMethod', value as 'cash' | 'credit')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر طريقة الدفع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">نقدي</SelectItem>
                  <SelectItem value="credit">آجل</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <div>
              <Label htmlFor="vendorName" className="text-base">اسم المورد</Label>
              <Select
                value={invoice.vendorId || ""}
                onValueChange={(value) => {
                  const vendor = mockVendors.find(v => v.id === value);
                  if (vendor) {
                    onFieldChange('vendorId', vendor.id);
                    onFieldChange('vendorName', vendor.name);
                    onFieldChange('vendorPhone', vendor.phone);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر المورد" />
                </SelectTrigger>
                <SelectContent>
                  {mockVendors.map(vendor => (
                    <SelectItem key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-4">
              <div className="w-full">
                <Label htmlFor="vendorPhone" className="text-base">هاتف المورد</Label>
                <Input
                  id="vendorPhone"
                  value={invoice.vendorPhone || ""}
                  onChange={(e) => onFieldChange('vendorPhone', e.target.value)}
                  className="text-base"
                  disabled={!invoice.vendorId}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

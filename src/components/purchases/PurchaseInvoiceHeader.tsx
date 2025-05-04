
import React, { useState } from "react";
import { PurchaseInvoice } from "@/types/purchases";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { ar } from "date-fns/locale";
import { parse, format } from "date-fns";

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
  const invoiceDate = invoice.date ? parse(invoice.date, "yyyy-MM-dd", new Date()) : new Date();
  
  // Mock vendors for demonstration
  const vendors = [
    { id: "v1", name: "شركة السعيد للتجارة", accountNumber: "SA5980000123456789012345" },
    { id: "v2", name: "مؤسسة النور للمقاولات", accountNumber: "SA5980000555456789099345" },
    { id: "v3", name: "مؤسسة الأمانة للتوريدات", accountNumber: "SA5980000777456789012388" }
  ];

  const handleVendorChange = (vendorId: string) => {
    const selectedVendor = vendors.find(v => v.id === vendorId);
    if (selectedVendor) {
      onFieldChange("vendorId", vendorId);
      onFieldChange("vendorName", selectedVendor.name);
      onFieldChange("vendorAccountNumber", selectedVendor.accountNumber);
    }
  };

  // Payment method toggle
  const handlePaymentMethodChange = (isCash: boolean) => {
    onFieldChange("paymentMethod", isCash ? "cash" : "credit");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="space-y-2">
        <div>
          <Label htmlFor="invoiceNumber">رقم الفاتورة</Label>
          <Input
            id="invoiceNumber"
            placeholder="رقم الفاتورة"
            value={invoice.invoiceNumber}
            onChange={(e) => onFieldChange("invoiceNumber", e.target.value)}
            className="mb-2"
          />
        </div>
        
        <div>
          <Label htmlFor="date">التاريخ</Label>
          <DatePicker
            date={invoiceDate}
            onDateChange={onDateChange}
            className="w-full"
            placeholder="اختر تاريخ الفاتورة"
          />
        </div>
        
        <div>
          <Label htmlFor="paymentMethod" className="block mb-1">طريقة الدفع</Label>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Switch
              id="paymentMethod"
              checked={invoice.paymentMethod === "cash"}
              onCheckedChange={handlePaymentMethodChange}
            />
            <span>{invoice.paymentMethod === "cash" ? "نقدي" : "آجل"}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div>
          <Label htmlFor="vendorId">المورد</Label>
          <Select 
            value={invoice.vendorId} 
            onValueChange={handleVendorChange}
          >
            <SelectTrigger id="vendorId">
              <SelectValue placeholder="اختر المورد" />
            </SelectTrigger>
            <SelectContent>
              {vendors.map(vendor => (
                <SelectItem key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="vendorAccountNumber">رقم حساب المورد</Label>
          <Input
            id="vendorAccountNumber"
            placeholder="رقم حساب المورد"
            value={invoice.vendorAccountNumber || ""}
            readOnly
            className="bg-muted"
          />
        </div>
      </div>
    </div>
  );
};

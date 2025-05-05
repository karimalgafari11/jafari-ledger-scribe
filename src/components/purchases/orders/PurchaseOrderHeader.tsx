
import React from "react";
import { PurchaseOrder } from "@/types/purchases";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { parse } from "date-fns";
import { mockVendors } from "@/data/mockVendors";

interface PurchaseOrderHeaderProps {
  order: PurchaseOrder;
  onFieldChange: (field: keyof PurchaseOrder, value: any) => void;
}

export const PurchaseOrderHeader: React.FC<PurchaseOrderHeaderProps> = ({
  order,
  onFieldChange
}) => {
  const orderDate = order.date ? parse(order.date, "yyyy-MM-dd", new Date()) : new Date();
  const deliveryDate = order.deliveryDate ? parse(order.deliveryDate, "yyyy-MM-dd", new Date()) : undefined;
  
  const handleDateChange = (date: Date | null, field: 'date' | 'deliveryDate') => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      onFieldChange(field, formattedDate);
    }
  };
  
  const handleVendorChange = (vendorId: string) => {
    const selectedVendor = mockVendors.find(v => v.id === vendorId);
    if (selectedVendor) {
      onFieldChange("vendorId", vendorId);
      onFieldChange("vendorName", selectedVendor.name);
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="orderNumber">رقم أمر الشراء</Label>
          <Input
            id="orderNumber"
            value={order.orderNumber}
            onChange={(e) => onFieldChange("orderNumber", e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="date">تاريخ الأمر</Label>
          <DatePicker
            date={orderDate}
            onDateChange={(date) => handleDateChange(date, 'date')}
            className="w-full mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="deliveryDate">تاريخ التسليم المتوقع</Label>
          <DatePicker
            date={deliveryDate}
            onDateChange={(date) => handleDateChange(date, 'deliveryDate')}
            className="w-full mt-1"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="vendorId">المورد</Label>
          <Select 
            value={order.vendorId} 
            onValueChange={handleVendorChange}
          >
            <SelectTrigger id="vendorId" className="mt-1">
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
        
        <div>
          <Label htmlFor="status">حالة الأمر</Label>
          <Select 
            value={order.status} 
            onValueChange={(value) => onFieldChange("status", value)}
          >
            <SelectTrigger id="status" className="mt-1">
              <SelectValue placeholder="اختر الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">مسودة</SelectItem>
              <SelectItem value="pending">قيد الانتظار</SelectItem>
              <SelectItem value="approved">معتمد</SelectItem>
              <SelectItem value="completed">مكتمل</SelectItem>
              <SelectItem value="cancelled">ملغي</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="createdBy">تم بواسطة</Label>
          <Input
            id="createdBy"
            value={order.createdBy}
            readOnly
            className="mt-1 bg-muted"
          />
        </div>
      </div>
    </div>
  );
};


import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { mockCustomers } from "@/data/mockCustomers";
import { mockWarehouses } from "@/data/mockWarehouses";
import { format } from "date-fns";
import { Invoice } from "@/types/invoices";

interface InvoiceDetailsProps {
  invoice: Invoice;
  onFieldChange: (field: string, value: any) => void;
}

export const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
  invoice,
  onFieldChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="invoiceNumber" className="block text-sm font-medium mb-1">رقم الفاتورة</label>
          <Input
            id="invoiceNumber"
            value={invoice.invoiceNumber}
            readOnly
            className="bg-muted"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">تاريخ الفاتورة</label>
          <Input
            id="date"
            type="date"
            value={invoice.date ? format(new Date(invoice.date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')}
            onChange={(e) => onFieldChange('date', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="warehouse" className="block text-sm font-medium mb-1">المخزن</label>
          <Select
            value={invoice.warehouseId || ""}
            onValueChange={(value) => {
              const warehouse = mockWarehouses.find(w => w.id === value);
              onFieldChange('warehouseId', value);
              if (warehouse) {
                onFieldChange('warehouseName', warehouse.name);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر المخزن" />
            </SelectTrigger>
            <SelectContent>
              {mockWarehouses.map((warehouse) => (
                <SelectItem key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="customer" className="block text-sm font-medium mb-1">العميل</label>
          <Select
            value={invoice.customerId || ""}
            onValueChange={(value) => {
              const customer = mockCustomers.find(c => c.id === value);
              onFieldChange('customerId', value);
              if (customer) {
                onFieldChange('customerName', customer.name);
                onFieldChange('customerPhone', customer.phone);
                onFieldChange('customerAccountNumber', customer.accountNumber || '');
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر العميل" />
            </SelectTrigger>
            <SelectContent>
              {mockCustomers.map((customer) => (
                <SelectItem key={customer.id} value={customer.id}>
                  {customer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="accountNumber" className="block text-sm font-medium mb-1">رقم الحساب</label>
            <Input
              id="accountNumber"
              value={invoice.customerAccountNumber || ""}
              readOnly
              className="bg-muted"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">رقم الهاتف</label>
            <Input
              id="phoneNumber"
              value={invoice.customerPhone || ""}
              readOnly
              className="bg-muted"
            />
          </div>
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium mb-1">طريقة الدفع</label>
          <RadioGroup 
            defaultValue={invoice.paymentMethod || "cash"} 
            className="flex space-x-4 rtl space-x-reverse"
            onValueChange={(value) => onFieldChange('paymentMethod', value)}
          >
            <div className="flex items-center space-x-2 rtl space-x-reverse">
              <RadioGroupItem value="cash" id="payment-cash" />
              <Label htmlFor="payment-cash">نقد</Label>
            </div>
            <div className="flex items-center space-x-2 rtl space-x-reverse">
              <RadioGroupItem value="credit" id="payment-credit" />
              <Label htmlFor="payment-credit">آجل</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

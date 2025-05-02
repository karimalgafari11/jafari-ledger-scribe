
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
  condensed?: boolean;
}

export const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
  invoice,
  onFieldChange,
  condensed = false
}) => {
  return (
    <div className={`grid ${condensed ? "grid-cols-2 md:grid-cols-4 gap-2" : "grid-cols-1 md:grid-cols-2 gap-6"}`}>
      <div className={condensed ? "space-y-2" : "space-y-4"}>
        <div>
          <label htmlFor="invoiceNumber" className={`block text-sm font-medium ${condensed ? "mb-0.5" : "mb-1"}`}>رقم الفاتورة</label>
          <Input 
            id="invoiceNumber" 
            value={invoice.invoiceNumber} 
            readOnly 
            className="bg-muted h-8" 
          />
        </div>

        <div>
          <label htmlFor="date" className={`block text-sm font-medium ${condensed ? "mb-0.5" : "mb-1"}`}>تاريخ الفاتورة</label>
          <Input 
            id="date" 
            type="date" 
            value={invoice.date ? format(new Date(invoice.date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')} 
            onChange={e => onFieldChange('date', e.target.value)}
            className="h-8"
          />
        </div>
      </div>

      <div className={condensed ? "space-y-2" : "space-y-4"}>
        <div>
          <label htmlFor="warehouse" className={`block text-sm font-medium ${condensed ? "mb-0.5" : "mb-1"}`}>المخزن</label>
          <Select 
            value={invoice.warehouseId || ""} 
            onValueChange={value => {
              const warehouse = mockWarehouses.find(w => w.id === value);
              onFieldChange('warehouseId', value);
              if (warehouse) {
                onFieldChange('warehouseName', warehouse.name);
              }
            }}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="اختر المخزن" />
            </SelectTrigger>
            <SelectContent>
              {mockWarehouses.map(warehouse => (
                <SelectItem key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="paymentMethod" className={`block text-sm font-medium ${condensed ? "mb-0.5" : "mb-1"}`}>طريقة الدفع</label>
          <RadioGroup 
            defaultValue={invoice.paymentMethod || "cash"} 
            className="flex space-x-2 rtl space-x-reverse" 
            onValueChange={value => onFieldChange('paymentMethod', value)}
          >
            <div className="flex items-center space-x-1 rtl space-x-reverse">
              <RadioGroupItem value="cash" id="payment-cash" />
              <Label htmlFor="payment-cash" className="text-xs">نقد</Label>
            </div>
            <div className="flex items-center space-x-1 rtl space-x-reverse">
              <RadioGroupItem value="credit" id="payment-credit" />
              <Label htmlFor="payment-credit" className="text-xs">آجل</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className={condensed ? "space-y-2 col-span-2" : "space-y-4"}>
        <div>
          <label htmlFor="customer" className={`block text-sm font-medium ${condensed ? "mb-0.5" : "mb-1"}`}>العميل</label>
          <Select 
            value={invoice.customerId || ""} 
            onValueChange={value => {
              const customer = mockCustomers.find(c => c.id === value);
              onFieldChange('customerId', value);
              if (customer) {
                onFieldChange('customerName', customer.name);
                onFieldChange('customerPhone', customer.phone);
                onFieldChange('customerAccountNumber', customer.accountNumber || '');
              }
            }}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="اختر العميل" />
            </SelectTrigger>
            <SelectContent>
              {mockCustomers.map(customer => (
                <SelectItem key={customer.id} value={customer.id}>
                  {customer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {!condensed && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium mb-1">رقم الحساب</label>
              <Input id="accountNumber" value={invoice.customerAccountNumber || ""} readOnly className="bg-muted" />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">رقم الهاتف</label>
              <Input id="phoneNumber" value={invoice.customerPhone || ""} readOnly className="bg-muted" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

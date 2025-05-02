
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { mockCustomers } from "@/data/mockCustomers";
import { mockWarehouses } from "@/data/mockWarehouses";
import { format } from "date-fns";
import { Invoice } from "@/types/invoices";
import { SearchBar } from "@/components/SearchBar";

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
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(mockCustomers);

  // Filter customers based on search term
  React.useEffect(() => {
    if (customerSearchTerm.trim() === "") {
      setFilteredCustomers(mockCustomers);
    } else {
      const term = customerSearchTerm.toLowerCase().trim();
      const filtered = mockCustomers.filter(customer => 
        customer.name.toLowerCase().includes(term) || 
        customer.phone?.toLowerCase().includes(term) ||
        customer.accountNumber?.toLowerCase().includes(term)
      );
      setFilteredCustomers(filtered);
    }
  }, [customerSearchTerm]);

  const handleCustomerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerSearchTerm(e.target.value);
  };

  return (
    <div className={`grid ${condensed ? "grid-cols-2 md:grid-cols-4 gap-1" : "grid-cols-1 md:grid-cols-2 gap-3"}`}>
      <div className={condensed ? "space-y-1" : "space-y-3"}>
        <div>
          <label htmlFor="invoiceNumber" className={`block text-xs font-medium ${condensed ? "mb-0" : "mb-1"}`}>رقم الفاتورة</label>
          <Input 
            id="invoiceNumber" 
            value={invoice.invoiceNumber} 
            readOnly 
            className="bg-muted h-7 text-sm" 
          />
        </div>

        <div>
          <label htmlFor="date" className={`block text-xs font-medium ${condensed ? "mb-0" : "mb-1"}`}>تاريخ الفاتورة</label>
          <Input 
            id="date" 
            type="date" 
            value={invoice.date ? format(new Date(invoice.date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')} 
            onChange={e => onFieldChange('date', e.target.value)}
            className="h-7 text-sm"
          />
        </div>
      </div>

      <div className={condensed ? "space-y-1" : "space-y-3"}>
        <div>
          <label htmlFor="warehouse" className={`block text-xs font-medium ${condensed ? "mb-0" : "mb-1"}`}>المخزن</label>
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
            <SelectTrigger className="h-7 text-sm">
              <SelectValue placeholder="اختر المخزن" />
            </SelectTrigger>
            <SelectContent>
              {mockWarehouses.map(warehouse => (
                <SelectItem key={warehouse.id} value={warehouse.id} className="text-sm">
                  {warehouse.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="paymentMethod" className={`block text-xs font-medium ${condensed ? "mb-0" : "mb-1"}`}>طريقة الدفع</label>
          <RadioGroup 
            defaultValue={invoice.paymentMethod || "cash"} 
            className="flex space-x-2 rtl space-x-reverse" 
            onValueChange={value => onFieldChange('paymentMethod', value)}
          >
            <div className="flex items-center space-x-1 rtl space-x-reverse">
              <RadioGroupItem value="cash" id="payment-cash" className="h-3 w-3" />
              <Label htmlFor="payment-cash" className="text-xs">نقد</Label>
            </div>
            <div className="flex items-center space-x-1 rtl space-x-reverse">
              <RadioGroupItem value="credit" id="payment-credit" className="h-3 w-3" />
              <Label htmlFor="payment-credit" className="text-xs">آجل</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className={condensed ? "space-y-1 col-span-2" : "space-y-3"}>
        <div>
          <label className={`block text-xs font-medium ${condensed ? "mb-0" : "mb-1"}`}>العميل</label>
          <div className="mb-1">
            <SearchBar 
              placeholder="ابحث عن العميل بالاسم أو الرقم..." 
              onChange={handleCustomerSearch} 
              className="h-7 text-xs mb-1"
            />
          </div>
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
            <SelectTrigger className="h-7 text-sm">
              <SelectValue placeholder="اختر العميل" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {filteredCustomers.length === 0 ? (
                <div className="p-2 text-center text-sm text-gray-500">لا يوجد عملاء مطابقين</div>
              ) : (
                filteredCustomers.map(customer => (
                  <SelectItem key={customer.id} value={customer.id} className="text-sm">
                    {customer.name} {customer.phone && `- ${customer.phone}`}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {!condensed && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="accountNumber" className="block text-xs font-medium mb-0">رقم الحساب</label>
              <Input id="accountNumber" value={invoice.customerAccountNumber || ""} readOnly className="bg-muted h-7 text-sm" />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-xs font-medium mb-0">رقم الهاتف</label>
              <Input id="phoneNumber" value={invoice.customerPhone || ""} readOnly className="bg-muted h-7 text-sm" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

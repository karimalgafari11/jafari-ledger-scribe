
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { mockCustomers } from "@/data/mockCustomers";
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
    <div className="grid grid-cols-4 gap-x-2 gap-y-1 mb-1">
      <div className="space-y-0.5">
        <div>
          <label htmlFor="invoiceNumber" className="block text-xs font-medium mb-0">رقم الفاتورة</label>
          <Input 
            id="invoiceNumber" 
            value={invoice.invoiceNumber} 
            readOnly 
            className="bg-gray-100 h-6 text-xs" 
          />
        </div>
      </div>

      <div className="space-y-0.5">
        <div>
          <label htmlFor="date" className="block text-xs font-medium mb-0">تاريخ الفاتورة</label>
          <Input 
            id="date" 
            type="date" 
            value={invoice.date ? format(new Date(invoice.date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')} 
            onChange={e => onFieldChange('date', e.target.value)}
            className="h-6 text-xs"
          />
        </div>
      </div>

      <div className="space-y-0.5">
        <div>
          <label htmlFor="paymentMethod" className="block text-xs font-medium mb-0">طريقة الدفع</label>
          <RadioGroup 
            defaultValue={invoice.paymentMethod || "cash"} 
            className="flex space-x-1 rtl space-x-reverse" 
            onValueChange={value => onFieldChange('paymentMethod', value as 'cash' | 'credit')}
          >
            <div className="flex items-center space-x-0.5 rtl space-x-reverse">
              <RadioGroupItem value="cash" id="payment-cash" className="h-2.5 w-2.5" />
              <Label htmlFor="payment-cash" className="text-xs">نقد</Label>
            </div>
            <div className="flex items-center space-x-0.5 rtl space-x-reverse">
              <RadioGroupItem value="credit" id="payment-credit" className="h-2.5 w-2.5" />
              <Label htmlFor="payment-credit" className="text-xs">آجل</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="space-y-0.5">
        <div>
          <label htmlFor="customerAccountNumber" className="block text-xs font-medium mb-0">رقم العميل</label>
          <Input 
            id="customerAccountNumber" 
            value={invoice.customerAccountNumber || ""} 
            onChange={e => onFieldChange('customerAccountNumber', e.target.value)}
            className="h-6 text-xs" 
          />
        </div>
      </div>

      <div className="col-span-4 space-y-0.5">
        <div>
          <label className="block text-xs font-medium mb-0">البحث عن العميل</label>
          <SearchBar 
            placeholder="ابحث عن العميل بالاسم أو الرقم..." 
            onChange={handleCustomerSearch} 
            className="h-6 text-xs mb-0.5"
          />
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
            <SelectTrigger className="h-6 text-xs">
              <SelectValue placeholder="اختر العميل" />
            </SelectTrigger>
            <SelectContent className="max-h-[150px]">
              {filteredCustomers.length === 0 ? (
                <div className="p-1 text-center text-xs text-gray-500">لا يوجد عملاء مطابقين</div>
              ) : (
                filteredCustomers.map(customer => (
                  <SelectItem key={customer.id} value={customer.id} className="text-xs">
                    {customer.name} {customer.phone && `- ${customer.phone}`}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

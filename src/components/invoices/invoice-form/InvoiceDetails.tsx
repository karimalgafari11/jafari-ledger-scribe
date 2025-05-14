
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { mockCustomers } from "@/data/mockCustomers";
import { format } from "date-fns";
import { Invoice } from "@/types/invoices";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Plus, User } from "lucide-react";

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
  const [showCustomerSearch, setShowCustomerSearch] = useState(false);

  // Filter customers based on search term
  useEffect(() => {
    if (customerSearchTerm.trim() === "") {
      setFilteredCustomers(mockCustomers);
    } else {
      const term = customerSearchTerm.toLowerCase().trim();
      const filtered = mockCustomers.filter(customer => 
        customer.name.toLowerCase().includes(term) || 
        (customer.phone && customer.phone.toLowerCase().includes(term)) ||
        (customer.accountNumber && customer.accountNumber.toLowerCase().includes(term))
      );
      setFilteredCustomers(filtered);
    }
  }, [customerSearchTerm]);

  const handleCustomerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerSearchTerm(e.target.value);
  };

  const selectCustomer = (customer: any) => {
    onFieldChange('customerId', customer.id);
    onFieldChange('customerName', customer.name);
    onFieldChange('customerPhone', customer.phone || '');
    onFieldChange('customerAccountNumber', customer.accountNumber || '');
    setShowCustomerSearch(false);
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
            className="flex space-x-1 rtl:space-x-reverse" 
            onValueChange={value => onFieldChange('paymentMethod', value as 'cash' | 'credit')}
          >
            <div className="flex items-center space-x-0.5 rtl:space-x-reverse">
              <RadioGroupItem value="cash" id="payment-cash" className="h-2.5 w-2.5" />
              <Label htmlFor="payment-cash" className="text-xs">نقد</Label>
            </div>
            <div className="flex items-center space-x-0.5 rtl:space-x-reverse">
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

      <div className="col-span-4 flex justify-between items-center">
        <div className="flex-1">
          <label className="block text-xs font-medium mb-0">بيانات العميل</label>
          <div className="flex items-center gap-2">
            <Input 
              value={invoice.customerName || ""} 
              onChange={e => onFieldChange('customerName', e.target.value)}
              className="h-6 text-xs" 
              placeholder="اسم العميل"
            />
            <Input 
              value={invoice.customerPhone || ""} 
              onChange={e => onFieldChange('customerPhone', e.target.value)}
              className="h-6 text-xs w-40" 
              placeholder="هاتف العميل"
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="h-6 text-xs flex gap-1 items-center"
              onClick={() => setShowCustomerSearch(true)}
            >
              <Search className="h-3 w-3" />
              بحث عن عميل
            </Button>
          </div>
        </div>
      </div>

      {/* Customer Search Dialog */}
      <Dialog open={showCustomerSearch} onOpenChange={setShowCustomerSearch}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>البحث عن عميل</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="ابحث باسم العميل أو رقم الهاتف..."
                value={customerSearchTerm}
                onChange={handleCustomerSearch}
                className="pl-10"
                autoFocus
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-right py-2 px-4 text-sm font-medium text-gray-500">اسم العميل</th>
                    <th className="text-right py-2 px-4 text-sm font-medium text-gray-500">رقم الهاتف</th>
                    <th className="text-right py-2 px-4 text-sm font-medium text-gray-500">رقم الحساب</th>
                    <th className="text-right py-2 px-4 text-sm font-medium text-gray-500"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-gray-500">
                        لا يوجد عملاء مطابقين لبحثك
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map(customer => (
                      <tr key={customer.id} className="border-t hover:bg-gray-50">
                        <td className="py-2 px-4 text-sm">{customer.name}</td>
                        <td className="py-2 px-4 text-sm">{customer.phone || '-'}</td>
                        <td className="py-2 px-4 text-sm">{customer.accountNumber || '-'}</td>
                        <td className="py-2 px-4 text-sm text-right">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => selectCustomer(customer)}
                          >
                            اختيار
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setShowCustomerSearch(false)}>
                إلغاء
              </Button>
              <Button variant="outline" className="flex gap-1 items-center">
                <Plus className="h-4 w-4" />
                إضافة عميل جديد
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Invoice } from "@/types/invoices";
import { mockCustomers } from "@/data/mockCustomers";
import { ChevronDown, User } from "lucide-react";

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
  const handleCustomerChange = (customerId: string) => {
    const customer = mockCustomers.find(c => c.id === customerId);
    if (customer) {
      onFieldChange('customerId', customer.id);
      onFieldChange('customerName', customer.name);
      onFieldChange('customerPhone', customer.phone);
      onFieldChange('customerAccountNumber', customer.accountNumber);
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      onFieldChange('date', date.toISOString());
    }
  };

  return (
    <Card className={`print-section ${condensed ? 'mb-2' : 'mb-4'}`}>
      <CardContent className={`${condensed ? 'p-3' : 'p-4'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invoiceNumber" className={`${condensed ? 'text-sm' : 'text-base'}`}>رقم الفاتورة</Label>
                <Input
                  id="invoiceNumber"
                  value={invoice.invoiceNumber}
                  onChange={(e) => onFieldChange('invoiceNumber', e.target.value)}
                  className={`${condensed ? 'h-8 text-sm' : 'text-base'}`}
                />
              </div>
              <div>
                <Label htmlFor="date" className={`${condensed ? 'text-sm' : 'text-base'}`}>تاريخ الفاتورة</Label>
                <DatePicker
                  date={invoice.date ? new Date(invoice.date) : new Date()}
                  onDateChange={handleDateChange}
                  className="w-full"
                />
              </div>
            </div>
            <div className="mt-3">
              <Label htmlFor="paymentMethod" className={`${condensed ? 'text-sm' : 'text-base'}`}>طريقة الدفع</Label>
              <Select 
                value={invoice.paymentMethod} 
                onValueChange={(value) => onFieldChange('paymentMethod', value as 'cash' | 'credit')}
              >
                <SelectTrigger className={`${condensed ? 'h-8 text-sm' : ''}`}>
                  <SelectValue placeholder="اختر طريقة الدفع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">نقدي</SelectItem>
                  <SelectItem value="credit">آجل</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="customer" className={`${condensed ? 'text-sm' : 'text-base'}`}>العميل</Label>
              <div className="relative">
                {invoice.customerId ? (
                  <Select value={invoice.customerId} onValueChange={handleCustomerChange}>
                    <SelectTrigger className={`${condensed ? 'h-8 text-sm' : ''}`}>
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
                ) : (
                  <div className="flex gap-2">
                    <Input
                      value={invoice.customerName}
                      onChange={(e) => onFieldChange('customerName', e.target.value)}
                      placeholder="اسم العميل"
                      className={`${condensed ? 'h-8 text-sm' : ''}`}
                    />
                    <Button 
                      variant="outline" 
                      size={condensed ? "sm" : "default"}
                      className="shrink-0"
                      onClick={() => {
                        // فتح مربع حوار لاختيار العميل من القائمة
                      }}
                    >
                      <User className="h-4 w-4 ml-1" />
                      اختيار
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="customerPhone" className={`${condensed ? 'text-sm' : 'text-base'}`}>هاتف العميل</Label>
              <Input
                id="customerPhone"
                value={invoice.customerPhone || ""}
                onChange={(e) => onFieldChange('customerPhone', e.target.value)}
                className={`${condensed ? 'h-8 text-sm' : 'text-base'}`}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

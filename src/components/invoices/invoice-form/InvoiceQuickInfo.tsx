
import React from "react";
import { Invoice } from "@/types/invoices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Save, Copy, Download } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { toast } from "sonner";

interface InvoiceQuickInfoProps {
  invoice: Invoice;
  onFieldChange: (field: string, value: any) => void;
}

export const InvoiceQuickInfo: React.FC<InvoiceQuickInfoProps> = ({ 
  invoice, 
  onFieldChange 
}) => {
  const copyInvoiceNumber = () => {
    navigator.clipboard.writeText(invoice.invoiceNumber);
    toast.success("تم نسخ رقم الفاتورة");
  };

  const calculateTotal = () => {
    return invoice.items.reduce((total, item) => total + item.total, 0).toFixed(2);
  };

  return (
    <div className="space-y-4">
      {/* Invoice Status */}
      <Card>
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-base font-medium">حالة الفاتورة</CardTitle>
        </CardHeader>
        <CardContent className="pb-4 pt-0">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">الرقم:</span>
              <div className="flex items-center">
                <span className="ml-2">{invoice.invoiceNumber}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyInvoiceNumber}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">التاريخ:</span>
              <span>{format(new Date(invoice.date), 'yyyy/MM/dd', { locale: ar })}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">الحالة:</span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs">
                {invoice.status === 'draft' ? 'مسودة' : invoice.status}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">القيمة:</span>
              <span className="font-bold">{invoice.totalAmount.toFixed(2)} ر.س</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">المدفوع:</span>
              <span>{invoice.amountPaid?.toFixed(2) || '0.00'} ر.س</span>
            </div>

            {invoice.paymentMethod === 'credit' && invoice.dueDate && (
              <div className="flex justify-between items-center">
                <span className="font-medium">تاريخ الاستحقاق:</span>
                <span>{format(new Date(invoice.dueDate), 'yyyy/MM/dd', { locale: ar })}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Notes */}
      <Card>
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-base font-medium">ملاحظات سريعة</CardTitle>
        </CardHeader>
        <CardContent className="pb-4 pt-0">
          <Textarea
            value={invoice.notes || ''}
            onChange={(e) => onFieldChange('notes', e.target.value)}
            placeholder="أضف ملاحظات للفاتورة هنا..."
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-base font-medium">معلومات الدفع</CardTitle>
        </CardHeader>
        <CardContent className="pb-4 pt-0">
          <div className="space-y-3">
            <div>
              <label htmlFor="payment-method" className="block text-sm font-medium mb-1">طريقة الدفع</label>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button
                  type="button"
                  variant={invoice.paymentMethod === 'cash' ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => onFieldChange('paymentMethod', 'cash')}
                >
                  نقدي
                </Button>
                <Button
                  type="button"
                  variant={invoice.paymentMethod === 'credit' ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => onFieldChange('paymentMethod', 'credit')}
                >
                  آجل
                </Button>
              </div>
            </div>
            
            <div>
              <label htmlFor="amountPaid" className="block text-sm font-medium mb-1">المبلغ المدفوع</label>
              <Input
                id="amountPaid"
                type="number"
                value={invoice.amountPaid || 0}
                onChange={(e) => onFieldChange('amountPaid', Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            {invoice.paymentMethod === 'credit' && (
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium mb-1">تاريخ الاستحقاق</label>
                <Input
                  id="dueDate"
                  type="date"
                  value={invoice.dueDate ? format(new Date(invoice.dueDate), 'yyyy-MM-dd') : ''}
                  onChange={(e) => onFieldChange('dueDate', e.target.value)}
                  className="w-full"
                />
              </div>
            )}
            
            {invoice.paymentMethod === 'credit' && (
              <div>
                <label htmlFor="paymentTerms" className="block text-sm font-medium mb-1">شروط الدفع</label>
                <Input
                  id="paymentTerms"
                  value={invoice.paymentTerms || ''}
                  onChange={(e) => onFieldChange('paymentTerms', e.target.value)}
                  placeholder="مثال: دفعة مقدمة 30%"
                  className="w-full"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tips & Warnings */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-3">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm text-amber-700">تنبيهات هامة</h4>
              <ul className="list-disc list-inside text-xs text-amber-700 mt-1 space-y-1">
                <li>تأكد من صحة بيانات العميل قبل الحفظ</li>
                <li>تحقق من مبالغ الضريبة المضافة</li>
                <li>قم بحفظ الفاتورة بعد الانتهاء</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-2">
        <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("جاري تحميل الفاتورة كملف PDF")}>
          <Download className="ml-2 h-4 w-4" />
          تحميل كملف PDF
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("تم نسخ رابط الفاتورة")}>
          <Copy className="ml-2 h-4 w-4" />
          نسخ رابط الفاتورة
        </Button>
      </div>
    </div>
  );
};

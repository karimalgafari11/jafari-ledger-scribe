
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/utils/formatters";
import { CreditCard, Save, Receipt, FileText, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const paymentSchema = z.object({
  vendorId: z.string().min(1, { message: "يجب اختيار المورد" }),
  amount: z.number().positive({ message: "يجب أن يكون المبلغ أكبر من صفر" }),
  paymentMethod: z.string().min(1, { message: "يجب اختيار طريقة الدفع" }),
  paymentDate: z.string().min(1, { message: "يجب إدخال تاريخ الدفع" }),
  reference: z.string().optional(),
  notes: z.string().optional(),
  invoiceId: z.string().optional(),
  bankAccountId: z.string().optional(),
  cashRegisterId: z.string().optional(),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  vendors: any[];
  onSubmit: (values: PaymentFormValues) => void;
  isLoading: boolean;
  invoices?: any[];
  bankAccounts?: any[];
  cashRegisters?: any[];
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  vendors,
  invoices = [],
  bankAccounts = [],
  cashRegisters = [],
  onSubmit,
  isLoading
}) => {
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      vendorId: "",
      amount: 0,
      paymentMethod: "",
      paymentDate: new Date().toISOString().substring(0, 10),
      reference: "",
      notes: "",
      invoiceId: "",
      bankAccountId: "",
      cashRegisterId: "",
    },
  });

  // فلترة الفواتير المرتبطة بالمورد المحدد
  const vendorInvoices = selectedVendor 
    ? invoices.filter(inv => inv.vendorId === selectedVendor.id) 
    : [];

  const handleVendorChange = (vendorId: string) => {
    const vendor = vendors.find((v) => v.id === vendorId);
    setSelectedVendor(vendor);
    form.setValue("vendorId", vendorId);
    
    // إعادة تعيين الفاتورة المحددة عند تغيير المورد
    form.setValue("invoiceId", "");
    setSelectedInvoice(null);
    
    // تعيين المبلغ الافتراضي إلى رصيد المورد إذا كان متاحًا
    if (vendor && vendor.balance) {
      form.setValue("amount", vendor.balance);
    }
  };

  const handleInvoiceChange = (invoiceId: string) => {
    const invoice = invoices.find((inv) => inv.id === invoiceId);
    setSelectedInvoice(invoice);
    form.setValue("invoiceId", invoiceId);
    
    // تحديث مبلغ الدفع بناءً على قيمة الفاتورة
    if (invoice && invoice.remainingAmount) {
      form.setValue("amount", invoice.remainingAmount);
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
    form.setValue("paymentMethod", method);
    
    // إعادة تعيين الحقول المتعلقة بطرق الدفع الأخرى
    form.setValue("bankAccountId", "");
    form.setValue("cashRegisterId", "");
  };

  const paymentMethods = [
    { id: "cash", name: "نقدي" },
    { id: "bank", name: "تحويل بنكي" },
    { id: "check", name: "شيك" },
    { id: "card", name: "بطاقة ائتمانية" },
  ];

  // دالة لإنشاء إيصال دفع (محاكاة)
  const handleGenerateReceipt = () => {
    const formValues = form.getValues();
    if (!formValues.vendorId || !formValues.amount || formValues.amount <= 0) {
      toast.error("يرجى إكمال بيانات الدفع أولاً");
      return;
    }
    
    toast.success("جاري إنشاء إيصال الدفع...");
    // هنا يمكن إضافة منطق إنشاء وطباعة الإيصال
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="vendorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المورد</FormLabel>
                  <Select
                    onValueChange={(value) => handleVendorChange(value)}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المورد" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vendors.map((vendor) => (
                        <SelectItem key={vendor.id} value={vendor.id}>
                          {vendor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedVendor && (
              <Card className="border rounded-lg overflow-hidden">
                <CardContent className="p-4 bg-gray-50">
                  <div className="text-sm text-gray-500 mb-1">إجمالي المستحق للمورد</div>
                  <div className="text-lg font-bold text-purple-600">
                    {formatCurrency(selectedVendor.balance || 0)}
                  </div>
                  {selectedVendor.dueDate && (
                    <div className="text-sm text-gray-500 mt-2 flex items-center">
                      <Calendar className="h-4 w-4 ml-1" />
                      تاريخ الاستحقاق:{" "}
                      {new Date(selectedVendor.dueDate).toLocaleDateString("ar-SA")}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {selectedVendor && vendorInvoices.length > 0 && (
              <FormField
                control={form.control}
                name="invoiceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الفاتورة المرتبطة (اختياري)</FormLabel>
                    <Select
                      onValueChange={(value) => handleInvoiceChange(value)}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفاتورة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">بدون فاتورة محددة</SelectItem>
                        {vendorInvoices.map((invoice) => (
                          <SelectItem key={invoice.id} value={invoice.id}>
                            {invoice.number} - {formatCurrency(invoice.amount)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>مبلغ السداد</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      placeholder="أدخل مبلغ السداد"
                      className="text-left ltr"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>طريقة الدفع</FormLabel>
                  <Select 
                    onValueChange={(value) => handlePaymentMethodChange(value)} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر طريقة الدفع" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method.id} value={method.id}>
                          {method.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* حقول إضافية تظهر بناءً على طريقة الدفع */}
            {selectedPaymentMethod === "bank" && bankAccounts.length > 0 && (
              <FormField
                control={form.control}
                name="bankAccountId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الحساب البنكي</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الحساب البنكي" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bankAccounts.map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectedPaymentMethod === "cash" && cashRegisters.length > 0 && (
              <FormField
                control={form.control}
                name="cashRegisterId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الصندوق</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الصندوق" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cashRegisters.map((register) => (
                          <SelectItem key={register.id} value={register.id}>
                            {register.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="paymentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تاريخ السداد</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="text-left ltr" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم المرجع</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="رقم الشيك / التحويل / المرجع" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ملاحظات</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="أي ملاحظات إضافية حول عملية السداد"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleGenerateReceipt}
                className="w-full flex gap-2 justify-center mb-2"
              >
                <Receipt size={18} />
                معاينة وطباعة إيصال
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isLoading}
          >
            إلغاء
          </Button>
          <Button type="submit" disabled={isLoading} className="min-w-[150px]">
            {isLoading ? (
              "جاري المعالجة..."
            ) : (
              <>
                <CreditCard className="ml-2" size={18} />
                تسجيل السداد
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

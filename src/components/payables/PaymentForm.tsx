
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/utils/formatters";
import { CreditCard, Save } from "lucide-react";

const paymentSchema = z.object({
  vendorId: z.string().min(1, { message: "يجب اختيار المورد" }),
  amount: z.number().positive({ message: "يجب أن يكون المبلغ أكبر من صفر" }),
  paymentMethod: z.string().min(1, { message: "يجب اختيار طريقة الدفع" }),
  paymentDate: z.string().min(1, { message: "يجب إدخال تاريخ الدفع" }),
  reference: z.string().optional(),
  notes: z.string().optional(),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  vendors: any[];
  onSubmit: (values: PaymentFormValues) => void;
  isLoading: boolean;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ vendors, onSubmit, isLoading }) => {
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      vendorId: "",
      amount: 0,
      paymentMethod: "",
      paymentDate: new Date().toISOString().substring(0, 10),
      reference: "",
      notes: "",
    },
  });

  const handleVendorChange = (vendorId: string) => {
    const vendor = vendors.find((v) => v.id === vendorId);
    setSelectedVendor(vendor);
    form.setValue("vendorId", vendorId);
    
    // Set default amount to vendor balance if available
    if (vendor && vendor.balance) {
      form.setValue("amount", vendor.balance);
    }
  };

  const paymentMethods = [
    { id: "cash", name: "نقدي" },
    { id: "bank", name: "تحويل بنكي" },
    { id: "check", name: "شيك" },
    { id: "card", name: "بطاقة ائتمانية" },
  ];

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
              <div className="border rounded-lg p-3 bg-gray-50">
                <div className="text-sm text-gray-500 mb-1">إجمالي المستحق للمورد</div>
                <div className="text-lg font-bold text-purple-600">
                  {formatCurrency(selectedVendor.balance || 0)}
                </div>
                {selectedVendor.dueDate && (
                  <div className="text-sm text-gray-500 mt-2">
                    تاريخ الاستحقاق:{" "}
                    {new Date(selectedVendor.dueDate).toLocaleDateString("ar-SA")}
                  </div>
                )}
              </div>
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
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      placeholder="أدخل مبلغ السداد"
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="paymentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تاريخ السداد</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
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
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          <Button type="submit" disabled={isLoading}>
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

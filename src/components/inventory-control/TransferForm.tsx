
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { mockProducts } from "@/data/mockProducts";
import { ArrowRight, MoveHorizontal } from "lucide-react";
import { toast } from "sonner";

const warehouses = [
  { id: "w1", name: "المستودع الرئيسي" },
  { id: "w2", name: "فرع الرياض" },
  { id: "w3", name: "فرع جدة" },
  { id: "w4", name: "فرع الدمام" },
  { id: "w5", name: "مستودع المرتجعات" },
];

const formSchema = z.object({
  productId: z.string({ required_error: "يرجى اختيار المنتج" }),
  quantity: z.coerce
    .number()
    .positive("الكمية يجب أن تكون أكبر من صفر")
    .min(1, "الكمية يجب أن تكون على الأقل 1"),
  sourceWarehouseId: z.string({ required_error: "يرجى اختيار المستودع المصدر" }),
  destinationWarehouseId: z.string({
    required_error: "يرجى اختيار المستودع الوجهة",
  }),
  notes: z.string().optional(),
});

type TransferFormValues = z.infer<typeof formSchema>;

export function TransferForm() {
  const form = useForm<TransferFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  });

  const sourceWarehouseId = form.watch("sourceWarehouseId");
  const productId = form.watch("productId");

  const availableProducts = mockProducts.filter((p) => p.quantity > 0);
  
  // Get selected product details if any
  const selectedProduct = productId 
    ? mockProducts.find(product => product.id === productId)
    : null;

  function onSubmit(data: TransferFormValues) {
    // Check that source and destination are different
    if (data.sourceWarehouseId === data.destinationWarehouseId) {
      toast.error("لا يمكن النقل إلى نفس المستودع المصدر");
      return;
    }

    console.log("Form data submitted:", data);
    
    // In a real app, this would call an API
    toast.success("تم إنشاء عملية النقل بنجاح");
    form.reset();
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الصنف</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الصنف" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableProducts.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name} (متوفر: {product.quantity})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الكمية</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max={selectedProduct?.quantity || 999}
                        {...field}
                      />
                    </FormControl>
                    {selectedProduct && (
                      <p className="text-xs text-muted-foreground">
                        الكمية المتاحة: {selectedProduct.quantity}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="sourceWarehouseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المستودع المصدر</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر المستودع المصدر" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {warehouses.map((warehouse) => (
                            <SelectItem
                              key={warehouse.id}
                              value={warehouse.id}
                            >
                              {warehouse.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="self-center pt-6">
                <MoveHorizontal className="h-6 w-6 text-muted-foreground" />
              </div>

              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="destinationWarehouseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المستودع الوجهة</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر المستودع الوجهة" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {warehouses
                            .filter((w) => w.id !== sourceWarehouseId)
                            .map((warehouse) => (
                              <SelectItem
                                key={warehouse.id}
                                value={warehouse.id}
                              >
                                {warehouse.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ملاحظات</FormLabel>
                  <FormControl>
                    <Input placeholder="ملاحظات إضافية (اختياري)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              إنشاء أمر النقل <ArrowRight className="mr-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

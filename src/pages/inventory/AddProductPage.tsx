
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

// نموذج التحقق من البيانات باستخدام zod
const productSchema = z.object({
  name: z.string().min(2, { message: "يجب أن يحتوي اسم المنتج على حرفين على الأقل" }),
  code: z.string().min(1, { message: "يجب إدخال رقم المنتج" }),
  brand: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  price: z.coerce.number().min(0, { message: "يجب أن يكون السعر قيمة موجبة" }),
  costPrice: z.coerce.number().min(0, { message: "يجب أن يكون سعر الشراء قيمة موجبة" }).optional(),
  quantity: z.coerce.number().min(0, { message: "يجب أن تكون الكمية قيمة موجبة" }).optional(),
  reorderLevel: z.coerce.number().min(0, { message: "يجب أن يكون حد إعادة الطلب قيمة موجبة" }).optional(),
  size: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

type ProductFormValues = z.infer<typeof productSchema>;

const AddProductPage = () => {
  const navigate = useNavigate();
  
  // إعداد نموذج React Hook Form مع التحقق من البيانات باستخدام zod
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      code: "",
      brand: "",
      category: "",
      subcategory: "",
      price: 0,
      costPrice: 0,
      quantity: 0,
      reorderLevel: 5,
      size: "",
      description: "",
      isActive: true,
    },
  });

  const onSubmit = (values: ProductFormValues) => {
    console.log("تم حفظ المنتج:", values);
    
    // هنا سيكون إرسال البيانات للخادم (API) في التطبيق الحقيقي
    
    toast.success("تم إضافة المنتج بنجاح");
    navigate("/inventory/products");
  };

  return (
    <Layout>
      <Header title="إضافة منتج جديد" />
      
      <div className="p-4 md:p-6">
        <Button 
          variant="outline" 
          onClick={() => navigate("/inventory/products")}
          className="mb-6 gap-2"
        >
          <ArrowRight size={16} />
          العودة إلى المنتجات
        </Button>

        <Card className="shadow-md">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-xl">إضافة منتج جديد</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* اسم المنتج */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>اسم المنتج *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل اسم المنتج" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* رقم المنتج */}
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم المنتج *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل رقم المنتج" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* الشركة الصانعة */}
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الشركة الصانعة</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل اسم الشركة الصانعة" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* سعر البيع */}
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>سعر البيع *</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} placeholder="أدخل سعر البيع" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* سعر الشراء */}
                  <FormField
                    control={form.control}
                    name="costPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>سعر الشراء</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} placeholder="أدخل سعر الشراء" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* الكمية المتوفرة */}
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الكمية المتوفرة</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} placeholder="أدخل الكمية" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* المقاس */}
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المقاس</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل مقاس المنتج" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* التصنيف */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>التصنيف</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر التصنيف" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="أجهزة كهربائية">أجهزة كهربائية</SelectItem>
                            <SelectItem value="إلكترونيات">إلكترونيات</SelectItem>
                            <SelectItem value="أدوات منزلية">أدوات منزلية</SelectItem>
                            <SelectItem value="قطع غيار">قطع غيار</SelectItem>
                            <SelectItem value="أخرى">أخرى</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* حد إعادة الطلب */}
                  <FormField
                    control={form.control}
                    name="reorderLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>حد إعادة الطلب</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} placeholder="أدخل حد إعادة الطلب" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* الحالة */}
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>متوفر</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* الملاحظات */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الملاحظات</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="أضف ملاحظات للمنتج (اختياري)"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <CardFooter className="flex justify-between border-t pt-6 px-0">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/inventory/products")}
                  >
                    إلغاء
                  </Button>
                  <Button 
                    type="submit" 
                    className="gap-2"
                  >
                    <Save size={16} />
                    حفظ المنتج
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddProductPage;

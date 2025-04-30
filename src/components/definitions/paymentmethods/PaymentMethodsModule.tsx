
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { 
  Delete, 
  Edit, 
  Check, 
  X,
  ListCheck, 
  Plus, 
  Search,
  Toggle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePaymentMethods } from "@/hooks/usePaymentMethods";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export const PaymentMethodsModule = () => {
  const {
    filteredPaymentMethods,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    togglePaymentMethodStatus,
  } = usePaymentMethods();

  // تعريف مخطط التحقق لطريقة الدفع
  const formSchema = z.object({
    code: z.string().min(1, "يجب إدخال الرمز").max(10, "الرمز يجب أن لا يتجاوز 10 أحرف"),
    name: z.string().min(2, "يجب أن يكون الاسم حرفين على الأقل"),
    description: z.string().optional(),
    isActive: z.boolean().default(true),
    requiresDetails: z.boolean().default(false),
  });

  // نموذج إضافة طريقة دفع جديدة
  const createForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
      isActive: true,
      requiresDetails: false,
    },
  });

  // نموذج تعديل طريقة دفع
  const editForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // تهيئة نموذج التعديل عند اختيار طريقة دفع
  React.useEffect(() => {
    if (selectedPaymentMethod && isEditDialogOpen) {
      editForm.reset({
        code: selectedPaymentMethod.code,
        name: selectedPaymentMethod.name,
        description: selectedPaymentMethod.description || "",
        isActive: selectedPaymentMethod.isActive,
        requiresDetails: selectedPaymentMethod.requiresDetails,
      });
    }
  }, [selectedPaymentMethod, isEditDialogOpen]);

  // معالجة إضافة طريقة دفع جديدة
  const handleCreate = (values: z.infer<typeof formSchema>) => {
    const success = createPaymentMethod(values);
    
    if (success) {
      createForm.reset();
      setIsCreateDialogOpen(false);
    }
  };

  // معالجة تعديل طريقة دفع
  const handleEdit = (values: z.infer<typeof formSchema>) => {
    if (selectedPaymentMethod) {
      const success = updatePaymentMethod(selectedPaymentMethod.id, values);
      
      if (success) {
        setIsEditDialogOpen(false);
      }
    }
  };

  // معالجة حذف طريقة دفع
  const handleDelete = () => {
    if (selectedPaymentMethod) {
      const success = deletePaymentMethod(selectedPaymentMethod.id);
      
      if (success) {
        setIsDeleteDialogOpen(false);
      }
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>إدارة طرق الدفع</CardTitle>
        <Button
          onClick={() => {
            setSelectedPaymentMethod(null);
            createForm.reset();
            setIsCreateDialogOpen(true);
          }}
        >
          <Plus className="ml-2 h-4 w-4" /> إضافة طريقة دفع جديدة
        </Button>
      </CardHeader>
      <CardContent>
        {/* شريط البحث */}
        <div className="mb-4 flex items-center">
          <div className="relative w-64">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث في طرق الدفع..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-9"
            />
          </div>
        </div>

        {/* جدول طرق الدفع */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">الرمز</TableHead>
              <TableHead className="w-[180px]">الاسم</TableHead>
              <TableHead>الوصف</TableHead>
              <TableHead className="w-[150px]">تفاصيل إضافية</TableHead>
              <TableHead className="w-[100px]">الحالة</TableHead>
              <TableHead className="text-center w-[150px]">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPaymentMethods.length > 0 ? (
              filteredPaymentMethods.map((method) => (
                <TableRow key={method.id}>
                  <TableCell className="font-medium">{method.code}</TableCell>
                  <TableCell>{method.name}</TableCell>
                  <TableCell>{method.description || "-"}</TableCell>
                  <TableCell>
                    {method.requiresDetails ? (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <Check className="ml-1 h-3 w-3" /> مطلوبة
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                        <X className="ml-1 h-3 w-3" /> غير مطلوبة
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={method.isActive ? "outline" : "secondary"}>
                      {method.isActive ? "مفعلة" : "معطلة"}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedPaymentMethod(method);
                        setIsEditDialogOpen(true);
                      }}
                      title="تعديل"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => togglePaymentMethodStatus(method.id)}
                      title={method.isActive ? "تعطيل" : "تفعيل"}
                    >
                      <Toggle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedPaymentMethod(method);
                        setIsDeleteDialogOpen(true);
                      }}
                      title="حذف"
                    >
                      <Delete className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <ListCheck className="h-10 w-10 mb-2" />
                    <h3 className="text-lg font-medium mb-1">لا توجد طرق دفع</h3>
                    <p className="text-sm">قم بإضافة طريقة دفع جديدة للبدء</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* نموذج إضافة طريقة دفع جديدة */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>إضافة طريقة دفع جديدة</DialogTitle>
            <DialogDescription>
              أدخل بيانات طريقة الدفع التي تريد إضافتها.
            </DialogDescription>
          </DialogHeader>
          <Form {...createForm}>
            <form onSubmit={createForm.handleSubmit(handleCreate)} className="space-y-4">
              <div className="flex gap-4">
                <FormField
                  control={createForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>الرمز</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="مثال: CASH" />
                      </FormControl>
                      <FormDescription>
                        رمز فريد لتحديد طريقة الدفع.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>الاسم</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="مثال: نقدي" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={createForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الوصف</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="وصف اختياري لطريقة الدفع" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={createForm.control}
                  name="requiresDetails"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">تفاصيل إضافية</FormLabel>
                        <FormDescription>
                          هل تتطلب طريقة الدفع هذه تفاصيل إضافية؟
                        </FormDescription>
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
                <FormField
                  control={createForm.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">حالة طريقة الدفع</FormLabel>
                        <FormDescription>
                          هل طريقة الدفع مفعلة للاستخدام؟
                        </FormDescription>
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
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "جاري الحفظ..." : "حفظ"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* نموذج تعديل طريقة دفع */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>تعديل طريقة دفع</DialogTitle>
            <DialogDescription>
              قم بتحديث بيانات طريقة الدفع.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEdit)} className="space-y-4">
              <div className="flex gap-4">
                <FormField
                  control={editForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>الرمز</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="مثال: CASH" />
                      </FormControl>
                      <FormDescription>
                        رمز فريد لتحديد طريقة الدفع.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>الاسم</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="مثال: نقدي" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الوصف</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="وصف اختياري لطريقة الدفع" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={editForm.control}
                  name="requiresDetails"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">تفاصيل إضافية</FormLabel>
                        <FormDescription>
                          هل تتطلب طريقة الدفع هذه تفاصيل إضافية؟
                        </FormDescription>
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
                <FormField
                  control={editForm.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">حالة طريقة الدفع</FormLabel>
                        <FormDescription>
                          هل طريقة الدفع مفعلة للاستخدام؟
                        </FormDescription>
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
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* حوار تأكيد الحذف */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>حذف طريقة الدفع</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في حذف طريقة الدفع "{selectedPaymentMethod?.name}"؟ هذا الإجراء لا يمكن التراجع عنه.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 flex-row">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              إلغاء
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "جاري الحذف..." : "تأكيد الحذف"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};


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
  FileText, 
  Plus, 
  Search,
  ToggleRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useVoucherTypes } from "@/hooks/useVoucherTypes";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export const VoucherTypesModule = () => {
  const {
    filteredVoucherTypes,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedVoucherType,
    setSelectedVoucherType,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    createVoucherType,
    updateVoucherType,
    deleteVoucherType,
  } = useVoucherTypes();

  // تعريف مخطط التحقق لنوع القيد
  const formSchema = z.object({
    code: z.string().min(1, "يجب إدخال الرمز").max(10, "الرمز يجب أن لا يتجاوز 10 أحرف"),
    name: z.string().min(2, "يجب أن يكون الاسم حرفين على الأقل"),
    description: z.string().optional(),
    isAutoGenerated: z.boolean().default(false),
  });

  // نموذج إضافة نوع قيد جديد
  const createForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
      isAutoGenerated: false,
    },
  });

  // نموذج تعديل نوع قيد
  const editForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // تهيئة نموذج التعديل عند اختيار نوع قيد
  React.useEffect(() => {
    if (selectedVoucherType && isEditDialogOpen) {
      editForm.reset({
        code: selectedVoucherType.code,
        name: selectedVoucherType.name,
        description: selectedVoucherType.description || "",
        isAutoGenerated: selectedVoucherType.isAutoGenerated,
      });
    }
  }, [selectedVoucherType, isEditDialogOpen]);

  // معالجة إضافة نوع قيد جديد
  const handleCreate = (values: z.infer<typeof formSchema>) => {
    const success = createVoucherType({
      code: values.code,
      name: values.name,
      description: values.description,
      isAutoGenerated: values.isAutoGenerated,
      isSystem: false,
    });
    
    if (success) {
      createForm.reset();
      setIsCreateDialogOpen(false);
    }
  };

  // معالجة تعديل نوع قيد
  const handleEdit = (values: z.infer<typeof formSchema>) => {
    if (selectedVoucherType) {
      const success = updateVoucherType(selectedVoucherType.id, {
        code: values.code,
        name: values.name,
        description: values.description,
        isAutoGenerated: values.isAutoGenerated,
      });
      
      if (success) {
        setIsEditDialogOpen(false);
      }
    }
  };

  // معالجة حذف نوع قيد
  const handleDelete = () => {
    if (selectedVoucherType) {
      const success = deleteVoucherType(selectedVoucherType.id);
      
      if (success) {
        setIsDeleteDialogOpen(false);
      }
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>إدارة أنواع القيود</CardTitle>
        <Button
          onClick={() => {
            setSelectedVoucherType(null);
            createForm.reset();
            setIsCreateDialogOpen(true);
          }}
        >
          <Plus className="ml-2 h-4 w-4" /> إضافة نوع قيد جديد
        </Button>
      </CardHeader>
      <CardContent>
        {/* شريط البحث */}
        <div className="mb-4 flex items-center">
          <div className="relative w-64">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث في أنواع القيود..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-9"
            />
          </div>
        </div>

        {/* جدول أنواع القيود */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">الرمز</TableHead>
              <TableHead className="w-[180px]">الاسم</TableHead>
              <TableHead>الوصف</TableHead>
              <TableHead className="w-[150px]">إنشاء تلقائي</TableHead>
              <TableHead className="w-[100px]">النظام</TableHead>
              <TableHead className="text-center w-[150px]">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVoucherTypes.length > 0 ? (
              filteredVoucherTypes.map((voucherType) => (
                <TableRow key={voucherType.id}>
                  <TableCell className="font-medium">{voucherType.code}</TableCell>
                  <TableCell>{voucherType.name}</TableCell>
                  <TableCell>{voucherType.description || "-"}</TableCell>
                  <TableCell>
                    {voucherType.isAutoGenerated ? (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <Check className="ml-1 h-3 w-3" /> نعم
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                        <X className="ml-1 h-3 w-3" /> لا
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {voucherType.isSystem ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        نظامي
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                        مخصص
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedVoucherType(voucherType);
                        setIsEditDialogOpen(true);
                      }}
                      title="تعديل"
                      disabled={voucherType.isSystem && true}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedVoucherType(voucherType);
                        setIsDeleteDialogOpen(true);
                      }}
                      title="حذف"
                      disabled={voucherType.isSystem && true}
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
                    <FileText className="h-10 w-10 mb-2" />
                    <h3 className="text-lg font-medium mb-1">لا توجد أنواع قيود</h3>
                    <p className="text-sm">قم بإضافة نوع قيد جديد للبدء</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* نموذج إضافة نوع قيد جديد */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>إضافة نوع قيد جديد</DialogTitle>
            <DialogDescription>
              أدخل بيانات نوع القيد الذي تريد إضافته.
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
                        <Input {...field} placeholder="مثال: JV" />
                      </FormControl>
                      <FormDescription>
                        رمز فريد لتحديد نوع القيد.
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
                        <Input {...field} placeholder="مثال: قيد يومية" />
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
                      <Textarea {...field} placeholder="وصف اختياري لنوع القيد" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createForm.control}
                name="isAutoGenerated"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">إنشاء تلقائي</FormLabel>
                      <FormDescription>
                        هل يتم إنشاء القيد تلقائياً عند إجراء معاملة؟
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
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "جاري الحفظ..." : "حفظ"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* نموذج تعديل نوع قيد */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>تعديل نوع قيد</DialogTitle>
            <DialogDescription>
              قم بتحديث بيانات نوع القيد.
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
                        <Input {...field} placeholder="مثال: JV" disabled={selectedVoucherType?.isSystem} />
                      </FormControl>
                      <FormDescription>
                        رمز فريد لتحديد نوع القيد.
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
                        <Input {...field} placeholder="مثال: قيد يومية" disabled={selectedVoucherType?.isSystem} />
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
                      <Textarea {...field} placeholder="وصف اختياري لنوع القيد" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="isAutoGenerated"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">إنشاء تلقائي</FormLabel>
                      <FormDescription>
                        هل يتم إنشاء القيد تلقائياً عند إجراء معاملة؟
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={selectedVoucherType?.isSystem}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
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
            <DialogTitle>حذف نوع القيد</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في حذف نوع القيد "{selectedVoucherType?.name}"؟ هذا الإجراء لا يمكن التراجع عنه.
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

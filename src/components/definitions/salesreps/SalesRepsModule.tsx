
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
  Users, 
  Plus, 
  Search,
  ToggleRight,
  Building,
  Percent,
  X,
  Check
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSalesReps } from "@/hooks/useSalesReps";
import { useBranches } from "@/hooks/useBranches";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const SalesRepsModule = () => {
  const {
    filteredSalesReps,
    isLoading,
    searchTerm,
    setSearchTerm,
    branchFilter,
    setBranchFilter,
    selectedSalesRep,
    setSelectedSalesRep,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    createSalesRep,
    updateSalesRep,
    deleteSalesRep,
    toggleSalesRepStatus,
    generateSalesRepCode,
  } = useSalesReps();

  // استخدام قائمة الفروع للربط
  const { branches } = useBranches();
  
  // الفروع النشطة فقط
  const activeBranches = branches.filter(branch => branch.isActive);

  // تعريف مخطط التحقق لمندوب المبيعات
  const formSchema = z.object({
    code: z.string().min(1, "يجب إدخال الرمز"),
    name: z.string().min(3, "يجب أن يكون الاسم 3 أحرف على الأقل"),
    phone: z.string().min(10, "يجب إدخال رقم هاتف صحيح"),
    email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
    commissionRate: z.coerce.number().min(0, "يجب أن تكون النسبة 0 أو أكثر").max(25, "يجب أن تكون النسبة أقل من 25%"),
    isActive: z.boolean().default(true),
    branchIds: z.array(z.string()).min(1, "يجب اختيار فرع واحد على الأقل"),
  });

  // نموذج إضافة مندوب مبيعات جديد
  const createForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: generateSalesRepCode(),
      name: "",
      phone: "",
      email: "",
      commissionRate: 0,
      isActive: true,
      branchIds: [],
    },
  });

  // نموذج تعديل مندوب مبيعات
  const editForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // تهيئة نموذج التعديل عند اختيار مندوب
  React.useEffect(() => {
    if (selectedSalesRep && isEditDialogOpen) {
      editForm.reset({
        code: selectedSalesRep.code,
        name: selectedSalesRep.name,
        phone: selectedSalesRep.phone,
        email: selectedSalesRep.email,
        commissionRate: selectedSalesRep.commissionRate,
        isActive: selectedSalesRep.isActive,
        branchIds: selectedSalesRep.branchIds,
      });
    }
  }, [selectedSalesRep, isEditDialogOpen]);

  // معالجة إضافة مندوب جديد
  const handleCreate = (values: z.infer<typeof formSchema>) => {
    const success = createSalesRep({
      code: values.code,
      name: values.name,
      phone: values.phone,
      email: values.email,
      commissionRate: values.commissionRate,
      isActive: values.isActive,
      branchIds: values.branchIds,
    });
    
    if (success) {
      createForm.reset({
        code: generateSalesRepCode(),
        name: "",
        phone: "",
        email: "",
        commissionRate: 0,
        isActive: true,
        branchIds: [],
      });
      setIsCreateDialogOpen(false);
    }
  };

  // معالجة تعديل مندوب
  const handleEdit = (values: z.infer<typeof formSchema>) => {
    if (selectedSalesRep) {
      const success = updateSalesRep(selectedSalesRep.id, {
        code: values.code,
        name: values.name,
        phone: values.phone,
        email: values.email,
        commissionRate: values.commissionRate,
        isActive: values.isActive,
        branchIds: values.branchIds,
      });
      
      if (success) {
        setIsEditDialogOpen(false);
      }
    }
  };

  // معالجة حذف مندوب
  const handleDelete = () => {
    if (selectedSalesRep) {
      const success = deleteSalesRep(selectedSalesRep.id);
      
      if (success) {
        setIsDeleteDialogOpen(false);
      }
    }
  };

  // تنسيق عرض الفروع في الجدول
  const formatBranchNames = (branchIds: string[]) => {
    if (branchIds.length === 0) return "-";
    
    const branchNames = branchIds.map(id => {
      const branch = branches.find(b => b.id === id);
      return branch ? branch.name : "";
    }).filter(Boolean);
    
    if (branchNames.length <= 2) {
      return branchNames.join("، ");
    }
    
    return `${branchNames[0]}، ${branchNames[1]} و${branchNames.length - 2} أخرى`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>إدارة مندوبي المبيعات</CardTitle>
        <Button
          onClick={() => {
            setSelectedSalesRep(null);
            createForm.reset({
              code: generateSalesRepCode(),
              name: "",
              phone: "",
              email: "",
              commissionRate: 0,
              isActive: true,
              branchIds: [],
            });
            setIsCreateDialogOpen(true);
          }}
        >
          <Plus className="ml-2 h-4 w-4" /> إضافة مندوب جديد
        </Button>
      </CardHeader>
      <CardContent>
        {/* شريط البحث والتصفية */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-64">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث في مندوبي المبيعات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-9"
            />
          </div>
          <Select value={branchFilter} onValueChange={setBranchFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="كل الفروع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كل الفروع</SelectItem>
              {activeBranches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* جدول مندوبي المبيعات */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">الكود</TableHead>
              <TableHead className="w-[180px]">الاسم</TableHead>
              <TableHead className="w-[150px]">الهاتف</TableHead>
              <TableHead>البريد الإلكتروني</TableHead>
              <TableHead className="w-[100px]">نسبة العمولة</TableHead>
              <TableHead>الفروع</TableHead>
              <TableHead className="w-[100px]">الحالة</TableHead>
              <TableHead className="text-center w-[150px]">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSalesReps.length > 0 ? (
              filteredSalesReps.map((salesRep) => (
                <TableRow key={salesRep.id}>
                  <TableCell className="font-medium">{salesRep.code}</TableCell>
                  <TableCell>{salesRep.name}</TableCell>
                  <TableCell dir="ltr" className="text-right">{salesRep.phone}</TableCell>
                  <TableCell>{salesRep.email}</TableCell>
                  <TableCell>{salesRep.commissionRate}٪</TableCell>
                  <TableCell>{formatBranchNames(salesRep.branchIds)}</TableCell>
                  <TableCell>
                    <Badge variant={salesRep.isActive ? "outline" : "secondary"}>
                      {salesRep.isActive ? "نشط" : "غير نشط"}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedSalesRep(salesRep);
                        setIsEditDialogOpen(true);
                      }}
                      title="تعديل"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => toggleSalesRepStatus(salesRep.id)}
                      title={salesRep.isActive ? "تعطيل" : "تفعيل"}
                    >
                      <ToggleRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedSalesRep(salesRep);
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
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Users className="h-10 w-10 mb-2" />
                    <h3 className="text-lg font-medium mb-1">لا يوجد مندوبي مبيعات</h3>
                    <p className="text-sm">قم بإضافة مندوب جديد للبدء</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* نموذج إضافة مندوب جديد */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة مندوب مبيعات جديد</DialogTitle>
            <DialogDescription>
              أدخل بيانات مندوب المبيعات الذي تريد إضافته.
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
                      <FormLabel>الكود</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="مثال: SR001" />
                      </FormControl>
                      <FormDescription>
                        كود فريد لتحديد المندوب.
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
                        <Input {...field} placeholder="اسم المندوب" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  control={createForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="مثال: +966 55 1234567" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="مثال: name@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  control={createForm.control}
                  name="commissionRate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>نسبة العمولة (%)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type="number" 
                            step="0.1" 
                            min="0" 
                            max="25" 
                            {...field} 
                            className="pl-8" 
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Percent className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createForm.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">حالة المندوب</FormLabel>
                        <FormDescription>
                          هل المندوب نشط حالياً؟
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
              
              <FormField
                control={createForm.control}
                name="branchIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الفروع</FormLabel>
                    <div className="flex flex-col gap-4">
                      <FormDescription>
                        اختر الفروع التي يعمل بها المندوب
                      </FormDescription>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="justify-start w-full">
                              <Building className="ml-2 h-4 w-4" />
                              {field.value.length > 0 ? (
                                `${field.value.length} ${field.value.length === 1 ? "فرع" : "فروع"} محددة`
                              ) : (
                                "اختر الفروع"
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 p-0" align="start">
                            <div className="p-2 flex flex-col gap-1">
                              {activeBranches.map((branch) => (
                                <div
                                  key={branch.id}
                                  className={cn(
                                    "flex items-center justify-between rounded-md px-3 py-2 cursor-pointer hover:bg-gray-100",
                                    field.value.includes(branch.id) ? "bg-gray-100" : ""
                                  )}
                                  onClick={() => {
                                    const newValue = field.value.includes(branch.id)
                                      ? field.value.filter(id => id !== branch.id)
                                      : [...field.value, branch.id];
                                    field.onChange(newValue);
                                  }}
                                >
                                  <div className="flex items-center gap-2">
                                    <Building className="h-4 w-4 text-muted-foreground" />
                                    <span>{branch.name}</span>
                                  </div>
                                  {field.value.includes(branch.id) && (
                                    <Check className="h-4 w-4 text-primary" />
                                  )}
                                </div>
                              ))}
                            </div>
                            <div className="p-2 border-t">
                              <Button size="sm" className="w-full" onClick={(e) => {
                                e.preventDefault();
                                // This is a hack to close the popover since we don't have PopoverClose
                                document.body.click();
                              }}>
                                تم
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      {field.value.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {field.value.map(branchId => {
                            const branch = branches.find(b => b.id === branchId);
                            return branch ? (
                              <Badge key={branch.id} variant="secondary" className="py-1">
                                {branch.name}
                                <button
                                  type="button"
                                  className="ml-1 hover:text-destructive"
                                  onClick={() => {
                                    field.onChange(field.value.filter(id => id !== branchId));
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      )}
                      <FormMessage />
                    </div>
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

      {/* نموذج تعديل مندوب */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>تعديل مندوب مبيعات</DialogTitle>
            <DialogDescription>
              قم بتحديث بيانات مندوب المبيعات.
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
                      <FormLabel>الكود</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="مثال: SR001" />
                      </FormControl>
                      <FormDescription>
                        كود فريد لتحديد المندوب.
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
                        <Input {...field} placeholder="اسم المندوب" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  control={editForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="مثال: +966 55 1234567" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="مثال: name@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  control={editForm.control}
                  name="commissionRate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>نسبة العمولة (%)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type="number" 
                            step="0.1" 
                            min="0" 
                            max="25" 
                            {...field} 
                            className="pl-8" 
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Percent className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">حالة المندوب</FormLabel>
                        <FormDescription>
                          هل المندوب نشط حالياً؟
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
              
              <FormField
                control={editForm.control}
                name="branchIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الفروع</FormLabel>
                    <div className="flex flex-col gap-4">
                      <FormDescription>
                        اختر الفروع التي يعمل بها المندوب
                      </FormDescription>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="justify-start w-full">
                              <Building className="ml-2 h-4 w-4" />
                              {field.value.length > 0 ? (
                                `${field.value.length} ${field.value.length === 1 ? "فرع" : "فروع"} محددة`
                              ) : (
                                "اختر الفروع"
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 p-0" align="start">
                            <div className="p-2 flex flex-col gap-1">
                              {activeBranches.map((branch) => (
                                <div
                                  key={branch.id}
                                  className={cn(
                                    "flex items-center justify-between rounded-md px-3 py-2 cursor-pointer hover:bg-gray-100",
                                    field.value.includes(branch.id) ? "bg-gray-100" : ""
                                  )}
                                  onClick={() => {
                                    const newValue = field.value.includes(branch.id)
                                      ? field.value.filter(id => id !== branch.id)
                                      : [...field.value, branch.id];
                                    field.onChange(newValue);
                                  }}
                                >
                                  <div className="flex items-center gap-2">
                                    <Building className="h-4 w-4 text-muted-foreground" />
                                    <span>{branch.name}</span>
                                  </div>
                                  {field.value.includes(branch.id) && (
                                    <Check className="h-4 w-4 text-primary" />
                                  )}
                                </div>
                              ))}
                            </div>
                            <div className="p-2 border-t">
                              <Button size="sm" className="w-full" onClick={(e) => {
                                e.preventDefault();
                                // This is a hack to close the popover since we don't have PopoverClose
                                document.body.click();
                              }}>
                                تم
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      {field.value.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {field.value.map(branchId => {
                            const branch = branches.find(b => b.id === branchId);
                            return branch ? (
                              <Badge key={branch.id} variant="secondary" className="py-1">
                                {branch.name}
                                <button
                                  type="button"
                                  className="ml-1 hover:text-destructive"
                                  onClick={() => {
                                    field.onChange(field.value.filter(id => id !== branchId));
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      )}
                      <FormMessage />
                    </div>
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
            <DialogTitle>حذف مندوب المبيعات</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في حذف المندوب "{selectedSalesRep?.name}"؟ هذا الإجراء لا يمكن التراجع عنه.
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

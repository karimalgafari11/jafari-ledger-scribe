
import React, { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar as CalendarIcon, 
  Check, 
  Delete, 
  Edit, 
  Lock, 
  LockOpen, 
  Plus, 
  Search,
  Calendar as CalendarLucideIcon
} from "lucide-react";
import { useAccountingPeriods } from "@/hooks/useAccountingPeriods";
import { format } from "date-fns";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

export const AccountingPeriodsModule = () => {
  const {
    filteredPeriods,
    isLoading,
    searchTerm,
    setSearchTerm,
    yearFilter,
    setYearFilter,
    selectedPeriod,
    setSelectedPeriod,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isCloseDialogOpen,
    setIsCloseDialogOpen,
    createPeriod,
    updatePeriod,
    deletePeriod,
    closePeriod,
    reopenPeriod,
    fiscalYears,
  } = useAccountingPeriods();

  // تعريف مخطط التحقق للفترة المحاسبية
  const formSchema = z.object({
    name: z.string().min(3, "يجب أن يكون الاسم 3 أحرف على الأقل"),
    fiscalYearId: z.string().min(1, "يرجى اختيار السنة المالية"),
    startDate: z.date({
      required_error: "يجب تحديد تاريخ البداية",
    }),
    endDate: z.date({
      required_error: "يجب تحديد تاريخ النهاية",
    }),
  }).refine((data) => data.endDate > data.startDate, {
    path: ["endDate"],
    message: "يجب أن يكون تاريخ النهاية بعد تاريخ البداية",
  });

  // نموذج إضافة فترة محاسبية جديدة
  const createForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      fiscalYearId: new Date().getFullYear().toString(),
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    },
  });

  // نموذج تعديل فترة محاسبية
  const editForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // تهيئة نموذج التعديل عند اختيار فترة
  React.useEffect(() => {
    if (selectedPeriod && isEditDialogOpen) {
      editForm.reset({
        name: selectedPeriod.name,
        fiscalYearId: selectedPeriod.fiscalYearId,
        startDate: new Date(selectedPeriod.startDate),
        endDate: new Date(selectedPeriod.endDate),
      });
    }
  }, [selectedPeriod, isEditDialogOpen]);

  // معالجة إضافة فترة جديدة
  const handleCreate = (values: z.infer<typeof formSchema>) => {
    const success = createPeriod({
      ...values,
      isClosed: false,
    });
    
    if (success) {
      createForm.reset();
      setIsCreateDialogOpen(false);
    }
  };

  // معالجة تعديل فترة
  const handleEdit = (values: z.infer<typeof formSchema>) => {
    if (selectedPeriod) {
      const success = updatePeriod(selectedPeriod.id, values);
      
      if (success) {
        setIsEditDialogOpen(false);
      }
    }
  };

  // معالجة حذف فترة
  const handleDelete = () => {
    if (selectedPeriod) {
      const success = deletePeriod(selectedPeriod.id);
      
      if (success) {
        setIsDeleteDialogOpen(false);
      }
    }
  };

  // معالجة إغلاق/إعادة فتح فترة
  const handleTogglePeriodStatus = (id: string, isClosed: boolean) => {
    if (isClosed) {
      reopenPeriod(id);
    } else {
      setSelectedPeriod(filteredPeriods.find(p => p.id === id) || null);
      setIsCloseDialogOpen(true);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>إدارة الفترات المحاسبية</CardTitle>
        <Button
          onClick={() => {
            setSelectedPeriod(null);
            createForm.reset();
            setIsCreateDialogOpen(true);
          }}
        >
          <Plus className="ml-2 h-4 w-4" /> إضافة فترة جديدة
        </Button>
      </CardHeader>
      <CardContent>
        {/* شريط التصفية والبحث */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-64">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث في الفترات المحاسبية..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-9"
            />
          </div>
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="اختر السنة المالية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع السنوات</SelectItem>
              {fiscalYears.map((year) => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* جدول الفترات المحاسبية */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">الاسم</TableHead>
              <TableHead>السنة المالية</TableHead>
              <TableHead>تاريخ البداية</TableHead>
              <TableHead>تاريخ النهاية</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>تاريخ الإغلاق</TableHead>
              <TableHead className="text-center">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPeriods.length > 0 ? (
              filteredPeriods.map((period) => (
                <TableRow key={period.id}>
                  <TableCell className="font-medium">{period.name}</TableCell>
                  <TableCell>{period.fiscalYearId}</TableCell>
                  <TableCell>{format(new Date(period.startDate), "yyyy-MM-dd")}</TableCell>
                  <TableCell>{format(new Date(period.endDate), "yyyy-MM-dd")}</TableCell>
                  <TableCell>
                    <Badge variant={period.isClosed ? "secondary" : "outline"}>
                      {period.isClosed ? "مغلقة" : "مفتوحة"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {period.closedDate ? format(new Date(period.closedDate), "yyyy-MM-dd") : "-"}
                  </TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedPeriod(period);
                        setIsEditDialogOpen(true);
                      }}
                      disabled={period.isClosed}
                      title="تعديل"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleTogglePeriodStatus(period.id, period.isClosed)}
                      title={period.isClosed ? "إعادة فتح" : "إغلاق"}
                    >
                      {period.isClosed ? <LockOpen className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedPeriod(period);
                        setIsDeleteDialogOpen(true);
                      }}
                      disabled={period.isClosed}
                      title="حذف"
                    >
                      <Delete className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <CalendarLucideIcon className="h-10 w-10 mb-2" />
                    <h3 className="text-lg font-medium mb-1">لا توجد فترات محاسبية</h3>
                    <p className="text-sm">قم بإضافة فترة محاسبية جديدة للبدء</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* نموذج إضافة فترة محاسبية جديدة */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>إضافة فترة محاسبية جديدة</DialogTitle>
            <DialogDescription>
              أدخل بيانات الفترة المحاسبية التي تريد إضافتها.
            </DialogDescription>
          </DialogHeader>
          <Form {...createForm}>
            <form onSubmit={createForm.handleSubmit(handleCreate)} className="space-y-4">
              <FormField
                control={createForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الفترة</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createForm.control}
                name="fiscalYearId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>السنة المالية</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر السنة المالية" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 5 }, (_, i) => {
                          const year = new Date().getFullYear() - 2 + i;
                          return (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={createForm.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>تاريخ البداية</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "yyyy-MM-dd") : "اختر التاريخ"}
                              <CalendarIcon className="mr-auto h-4 w-4" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createForm.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>تاريخ النهاية</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "yyyy-MM-dd") : "اختر التاريخ"}
                              <CalendarIcon className="mr-auto h-4 w-4" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
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

      {/* نموذج تعديل فترة محاسبية */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>تعديل فترة محاسبية</DialogTitle>
            <DialogDescription>
              قم بتحديث بيانات الفترة المحاسبية.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEdit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الفترة</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="fiscalYearId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>السنة المالية</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر السنة المالية" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 5 }, (_, i) => {
                          const year = new Date().getFullYear() - 2 + i;
                          return (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={editForm.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>تاريخ البداية</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "yyyy-MM-dd") : "اختر التاريخ"}
                              <CalendarIcon className="mr-auto h-4 w-4" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>تاريخ النهاية</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "yyyy-MM-dd") : "اختر التاريخ"}
                              <CalendarIcon className="mr-auto h-4 w-4" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
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
            <DialogTitle>حذف الفترة المحاسبية</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في حذف الفترة المحاسبية "{selectedPeriod?.name}"؟ هذا الإجراء لا يمكن التراجع عنه.
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

      {/* حوار تأكيد إغلاق الفترة */}
      <Dialog open={isCloseDialogOpen} onOpenChange={setIsCloseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إغلاق الفترة المحاسبية</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في إغلاق الفترة المحاسبية "{selectedPeriod?.name}"؟
              بعد إغلاق الفترة، لن يمكن إضافة قيود محاسبية جديدة عليها.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Switch id="auto-close-related" />
              <label
                htmlFor="auto-close-related"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                إغلاق القيود المحاسبية المرتبطة بهذه الفترة تلقائياً
              </label>
            </div>
          </div>
          <DialogFooter className="gap-2 flex-row">
            <Button variant="outline" onClick={() => setIsCloseDialogOpen(false)}>
              إلغاء
            </Button>
            <Button 
              variant="default" 
              onClick={() => {
                if (selectedPeriod) {
                  closePeriod(selectedPeriod.id);
                  setIsCloseDialogOpen(false);
                }
              }}
              disabled={isLoading}
            >
              {isLoading ? "جاري الإغلاق..." : "تأكيد الإغلاق"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};


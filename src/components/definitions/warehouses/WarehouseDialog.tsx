
import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Warehouse } from "@/types/definitions";
import { Branch } from "@/types/definitions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// تعريف شكل البيانات المطلوبة
const warehouseFormSchema = z.object({
  code: z.string().min(1, { message: "الكود مطلوب" }),
  name: z.string().min(1, { message: "اسم المستودع مطلوب" }),
  branchId: z.string().min(1, { message: "الفرع مطلوب" }),
  type: z.enum(['main', 'sub', 'external']),
  address: z.string(),
  inventoryControl: z.enum(['manual', 'automatic']),
  isActive: z.boolean().default(true),
});

interface WarehouseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  warehouse: Warehouse | null;
  defaultValues: any;
  branches: Branch[];
  onSubmit: (data: any) => void;
  generateWarehouseCode: (branchId: string) => string;
}

export const WarehouseDialog = ({
  open,
  onOpenChange,
  title,
  warehouse,
  defaultValues,
  branches,
  onSubmit,
  generateWarehouseCode,
}: WarehouseDialogProps) => {
  const form = useForm({
    resolver: zodResolver(warehouseFormSchema),
    defaultValues,
  });
  
  const watchBranchId = form.watch("branchId");
  
  useEffect(() => {
    // عند تغيير الفرع المحدد، قم بإنشاء كود المستودع الجديد
    if (watchBranchId && !warehouse) {
      const code = generateWarehouseCode(watchBranchId);
      form.setValue("code", code);
    }
  }, [watchBranchId, form, generateWarehouseCode, warehouse]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>كود المستودع</FormLabel>
                      <FormControl>
                        <Input placeholder="WH-001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم المستودع</FormLabel>
                      <FormControl>
                        <Input placeholder="المستودع الرئيسي" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="branchId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الفرع</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفرع" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع المستودع</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع المستودع" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="main">رئيسي</SelectItem>
                        <SelectItem value="sub">فرعي</SelectItem>
                        <SelectItem value="external">خارجي</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>العنوان</FormLabel>
                    <FormControl>
                      <Input placeholder="عنوان المستودع" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="inventoryControl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>التحكم بالمخزون</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر طريقة التحكم" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="automatic">آلي</SelectItem>
                          <SelectItem value="manual">يدوي</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 space-y-0 space-x-reverse">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>فعال</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                إلغاء
              </Button>
              <Button type="submit">
                {warehouse ? "حفظ التعديلات" : "إضافة المستودع"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

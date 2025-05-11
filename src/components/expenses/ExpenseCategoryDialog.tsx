
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExpenseCategory } from "@/types/expenses";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface ExpenseCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: ExpenseCategory | Omit<ExpenseCategory, "id">) => void;
  category: ExpenseCategory | null;
}

const formSchema = z.object({
  name: z.string().min(1, "اسم الفئة مطلوب").max(100),
  description: z.string().max(500, "الوصف يجب ألا يتجاوز 500 حرف"),
  budgetLimit: z.coerce.number().min(0, "يجب أن تكون الميزانية قيمة موجبة"),
  isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

export const ExpenseCategoryDialog: React.FC<ExpenseCategoryDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  category,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      budgetLimit: category?.budgetLimit || 0,
      isActive: category?.isActive ?? true,
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      form.reset({
        name: category?.name || "",
        description: category?.description || "",
        budgetLimit: category?.budgetLimit || 0,
        isActive: category?.isActive ?? true,
      });
    }
  }, [category, isOpen, form]);

  const handleSubmit = (values: FormValues) => {
    if (category) {
      onSave({ ...category, ...values });
    } else {
      onSave(values);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {category ? "تعديل فئة المصروفات" : "إضافة فئة مصروفات جديدة"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم الفئة</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="أدخل اسم الفئة" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الوصف</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="أدخل وصفاً مختصراً للفئة"
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budgetLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الميزانية المخصصة</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>الحالة</FormLabel>
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
              <Button type="button" variant="outline" onClick={onClose}>
                إلغاء
              </Button>
              <Button type="submit">
                {category ? "تحديث" : "إضافة"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

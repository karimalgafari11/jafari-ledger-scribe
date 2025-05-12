import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CashRegister } from "@/types/definitions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrencies } from "@/hooks/useCurrencies";

const formSchema = z.object({
  code: z.string().min(1, "رمز الصندوق مطلوب").max(10, "الرمز طويل جدًا"),
  name: z.string().min(1, "اسم الصندوق مطلوب").max(100, "الاسم طويل جدًا"),
  branchId: z.string().min(1, "الفرع مطلوب"),
  currency: z.string().min(1, "العملة مطلوبة"), // Changed from currencyId to currency
  balance: z.coerce.number().min(0, "الرصيد يجب أن لا يقل عن صفر"),
  isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

interface CashRegisterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<CashRegister>) => void;
  register: CashRegister | null;
  mode: "create" | "edit";
}

export const CashRegisterDialog = ({
  isOpen,
  onClose,
  onSubmit,
  register,
  mode,
}: CashRegisterDialogProps) => {
  const { currencies } = useCurrencies();

  // مصفوفة تجريبية للفروع حيث لم نقم بإنشاء useBranches بعد
  const branches = [
    { id: "1", name: "الفرع الرئيسي" },
    { id: "2", name: "فرع الرياض" },
    { id: "3", name: "فرع جدة" },
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: register?.code || "",
      name: register?.name || "",
      branchId: register?.branchId || "",
      currency: register?.currency || "", // Changed from currencyId to currency
      balance: register?.balance || 0,
      isActive: register?.isActive || true,
    },
  });

  React.useEffect(() => {
    if (isOpen && register) {
      form.reset({
        code: register.code,
        name: register.name,
        branchId: register.branchId,
        currency: register.currency || "", // Changed from currencyId to currency
        balance: register.balance,
        isActive: register.isActive,
      });
    } else if (isOpen && !register) {
      form.reset({
        code: "",
        name: "",
        branchId: branches[0]?.id || "",
        currency: currencies.length > 0 ? currencies[0].id : "", // Changed from currencyId to currency
        balance: 0,
        isActive: true,
      });
    }
  }, [isOpen, register, form, branches, currencies]);

  const handleSubmit = (values: FormValues) => {
    // إضافة اسم الفرع والعملة
    const selectedBranch = branches.find(b => b.id === values.branchId);
    const selectedCurrency = currencies.find(c => c.id === values.currency);
    
    onSubmit({
      ...values,
      branchName: selectedBranch?.name || "",
      currencyCode: selectedCurrency?.code || "",
      currencyId: values.currency, // Add this to ensure backward compatibility
    });
  };

  const title = mode === "create" ? "إضافة صندوق جديد" : "تعديل الصندوق";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رمز الصندوق</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: CR001" {...field} />
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
                  <FormLabel>اسم الصندوق</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: الصندوق الرئيسي" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="branchId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الفرع</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
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
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العملة</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر العملة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.id} value={currency.id}>
                          {currency.code} - {currency.name}
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
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الرصيد ��لافتتاحي</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>تفعيل الصندوق</FormLabel>
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
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="ml-2"
              >
                إلغاء
              </Button>
              <Button type="submit">
                {mode === "create" ? "إضافة" : "تحديث"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

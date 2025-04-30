
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
import { Currency } from "@/types/definitions";

const formSchema = z.object({
  code: z.string().min(1, "رمز العملة مطلوب").max(10, "الرمز طويل جدًا"),
  name: z.string().min(1, "اسم العملة مطلوب").max(100, "الاسم طويل جدًا"),
  country: z.string().min(1, "اسم البلد مطلوب").max(100, "اسم البلد طويل جدًا"),
  symbol: z.string().min(1, "الرمز المختصر مطلوب").max(10, "الرمز المختصر طويل جدًا"),
  isDefault: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

interface CurrencyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  currency: Currency | null;
  mode: "create" | "edit";
}

export const CurrencyDialog = ({
  isOpen,
  onClose,
  onSubmit,
  currency,
  mode,
}: CurrencyDialogProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: currency?.code || "",
      name: currency?.name || "",
      country: currency?.country || "",
      symbol: currency?.symbol || "",
      isDefault: currency?.isDefault || false,
      isActive: currency?.isActive || true,
    },
  });

  React.useEffect(() => {
    if (isOpen && currency) {
      form.reset({
        code: currency.code,
        name: currency.name,
        country: currency.country,
        symbol: currency.symbol,
        isDefault: currency.isDefault,
        isActive: currency.isActive,
      });
    } else if (isOpen && !currency) {
      form.reset({
        code: "",
        name: "",
        country: "",
        symbol: "",
        isDefault: false,
        isActive: true,
      });
    }
  }, [isOpen, currency, form]);

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const title = mode === "create" ? "إضافة عملة جديدة" : "تعديل العملة";

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
                  <FormLabel>رمز العملة</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: SAR" {...field} />
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
                  <FormLabel>اسم العملة</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: ريال سعودي" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>البلد</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: المملكة العربية السعودية" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الرمز المختصر</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: ﷼" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>تفعيل العملة</FormLabel>
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
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>العملة الافتراضية</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={mode === "edit" && currency?.isDefault}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
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

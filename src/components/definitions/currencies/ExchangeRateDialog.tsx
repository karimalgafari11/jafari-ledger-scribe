
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
import { Currency, ExchangeRate } from "@/types/definitions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  sourceCurrencyId: z.string().min(1, "العملة المصدر مطلوبة"),
  targetCurrencyId: z.string().min(1, "العملة الهدف مطلوبة"),
  rate: z.coerce.number()
    .positive("سعر الصرف يجب أن يكون رقمًا موجبًا")
    .refine((val) => !isNaN(val), {
      message: "سعر الصرف يجب أن يكون رقمًا صالحًا",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface ExchangeRateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormValues) => void;
  currencies: Currency[];
  rate: ExchangeRate | null;
  title: string;
}

export const ExchangeRateDialog = ({
  isOpen,
  onClose,
  onSubmit,
  currencies,
  rate,
  title,
}: ExchangeRateDialogProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourceCurrencyId: rate?.sourceCurrencyId || "",
      targetCurrencyId: rate?.targetCurrencyId || "",
      rate: rate?.rate || 0,
    },
  });

  React.useEffect(() => {
    if (isOpen && rate) {
      form.reset({
        sourceCurrencyId: rate.sourceCurrencyId,
        targetCurrencyId: rate.targetCurrencyId,
        rate: rate.rate,
      });
    } else if (isOpen && !rate) {
      // إيجاد العملة الافتراضية لوضعها كمصدر تلقائيًا
      const defaultCurrency = currencies.find(c => c.isDefault);
      form.reset({
        sourceCurrencyId: defaultCurrency?.id || "",
        targetCurrencyId: "",
        rate: 0,
      });
    }
  }, [isOpen, rate, form, currencies]);

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  // تحقق من أن العملات المصدر والهدف ليست نفس العملة
  const watchSourceCurrency = form.watch("sourceCurrencyId");
  const filteredTargetCurrencies = currencies.filter(
    (c) => c.id !== watchSourceCurrency
  );

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
              name="sourceCurrencyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العملة المصدر</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر العملة المصدر" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencies
                        .filter((c) => c.isActive)
                        .map((currency) => (
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
              name="targetCurrencyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العملة الهدف</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر العملة الهدف" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredTargetCurrencies
                        .filter((c) => c.isActive)
                        .map((currency) => (
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
              name="rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>سعر الصرف</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.0001" placeholder="0.0000" {...field} />
                  </FormControl>
                  <FormMessage />
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
                {rate ? "تحديث" : "إضافة"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

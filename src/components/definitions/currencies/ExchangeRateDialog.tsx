
import React from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Currency, ExchangeRate } from "@/types/definitions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExchangeRateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  currencies: Currency[];
  initialData?: ExchangeRate;
  title?: string;
}

// Schema for form validation
const formSchema = z.object({
  sourceCurrencyId: z.string().min(1, "العملة المصدر مطلوبة"),
  targetCurrencyId: z.string().min(1, "العملة الهدف مطلوبة"),
  rate: z.coerce.number().positive("يجب أن يكون سعر الصرف موجب"),
}).refine(data => data.sourceCurrencyId !== data.targetCurrencyId, {
  message: "يجب أن تكون العملة المصدر مختلفة عن العملة الهدف",
  path: ["targetCurrencyId"],
});

export function ExchangeRateDialog({
  isOpen,
  onClose,
  onSubmit,
  currencies,
  initialData,
  title = "إضافة سعر صرف جديد"
}: ExchangeRateDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      sourceCurrencyId: initialData.sourceCurrencyId,
      targetCurrencyId: initialData.targetCurrencyId,
      rate: initialData.rate,
    } : {
      sourceCurrencyId: currencies[0]?.id || "",
      targetCurrencyId: currencies.length > 1 ? currencies[1]?.id : "",
      rate: 1,
    },
  });

  React.useEffect(() => {
    if (isOpen && initialData) {
      form.reset({
        sourceCurrencyId: initialData.sourceCurrencyId,
        targetCurrencyId: initialData.targetCurrencyId,
        rate: initialData.rate,
      });
    } else if (isOpen) {
      form.reset({
        sourceCurrencyId: currencies[0]?.id || "",
        targetCurrencyId: currencies.length > 1 ? currencies[1]?.id : "",
        rate: 1,
      });
    }
  }, [isOpen, initialData, currencies, form]);

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="sourceCurrencyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العملة المصدر</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر العملة المصدر" />
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
              name="targetCurrencyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العملة الهدف</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر العملة الهدف" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem
                          key={currency.id}
                          value={currency.id}
                          disabled={field.value === form.getValues("sourceCurrencyId")}
                        >
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
                    <Input
                      type="number"
                      step="0.0001"
                      {...field}
                      placeholder="أدخل سعر الصرف"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                إلغاء
              </Button>
              <Button type="submit">حفظ</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

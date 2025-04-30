
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CashRegister } from "@/types/definitions";
import { useCashRegister } from "@/hooks/useCashRegister";
import { ArrowDownToLine, ArrowUpFromLine, Receipt, } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

// نموذج للمعاملات النقدية
const formSchema = z.object({
  registerId: z.string().min(1, "الصندوق مطلوب"),
  amount: z.coerce.number().min(0.01, "المبلغ يجب أن يكون أكبر من صفر"),
  notes: z.string().optional(),
  type: z.enum(["deposit", "withdraw"]),
});

export const CashTransactionsModule = () => {
  const { cashRegisters, registerTransaction } = useCashRegister();
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<"deposit" | "withdraw">("deposit");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      registerId: "",
      amount: 0,
      notes: "",
      type: "deposit",
    },
  });

  const handleOpenTransactionDialog = (type: "deposit" | "withdraw") => {
    setTransactionType(type);
    form.setValue("type", type);
    form.setValue("registerId", cashRegisters[0]?.id || "");
    form.setValue("amount", 0);
    form.setValue("notes", "");
    setIsTransactionDialogOpen(true);
  };

  const handleTransactionSubmit = (values: z.infer<typeof formSchema>) => {
    const { registerId, amount, type } = values;
    registerTransaction(registerId, amount, type === "deposit");
    setIsTransactionDialogOpen(false);
  };

  // الحصول على مرجع الصندوق المحدد
  const getSelectedRegister = (id: string): CashRegister | undefined => {
    return cashRegisters.find(register => register.id === id);
  };

  return (
    <>
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>حركات الصندوق</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
              onClick={() => handleOpenTransactionDialog("deposit")}
            >
              <ArrowDownToLine className="ml-2 h-4 w-4" />
              إيداع نقدي
            </Button>
            <Button
              variant="outline"
              className="bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100"
              onClick={() => handleOpenTransactionDialog("withdraw")}
            >
              <ArrowUpFromLine className="ml-2 h-4 w-4" />
              سحب نقدي
            </Button>
            <Button
              variant="outline"
              className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
            >
              <Receipt className="ml-2 h-4 w-4" />
              سجل الحركات
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cashRegisters.map(register => (
              <div
                key={register.id}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{register.name}</h3>
                  <Badge className={register.isActive ? "bg-green-100 text-green-800" : "bg-gray-100"}>
                    {register.isActive ? "نشط" : "غير نشط"}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500 mb-3">
                  {register.branchName} • {register.currencyCode}
                </div>
                <div className="text-2xl font-bold mb-2">
                  {formatCurrency(register.balance, register.currencyCode)}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 flex-1"
                    onClick={() => {
                      form.setValue("registerId", register.id);
                      handleOpenTransactionDialog("deposit");
                    }}
                  >
                    <ArrowDownToLine className="ml-1 h-3 w-3" />
                    إيداع
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100 flex-1"
                    onClick={() => {
                      form.setValue("registerId", register.id);
                      handleOpenTransactionDialog("withdraw");
                    }}
                  >
                    <ArrowUpFromLine className="ml-1 h-3 w-3" />
                    سحب
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {transactionType === "deposit" ? "إيداع نقدي" : "سحب نقدي"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleTransactionSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="registerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الصندوق</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الصندوق" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cashRegisters.map((register) => (
                          <SelectItem key={register.id} value={register.id} disabled={!register.isActive}>
                            {register.name} - {register.currencyCode}
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
                name="amount"
                render={({ field }) => {
                  const selectedRegister = getSelectedRegister(form.getValues().registerId);
                  const currencySymbol = selectedRegister?.currencyCode || "";
                  
                  return (
                    <FormItem>
                      <FormLabel>المبلغ</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            step="0.01"
                            {...field}
                            placeholder="0.00"
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pr-3 pointer-events-none text-gray-500">
                            {currencySymbol}
                          </div>
                        </div>
                      </FormControl>
                      {transactionType === "withdraw" && selectedRegister && (
                        <p className="text-sm text-gray-500">
                          الرصيد المتاح: {formatCurrency(selectedRegister.balance, selectedRegister.currencyCode)}
                        </p>
                      )}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ملاحظات</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="ملاحظات اختيارية" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsTransactionDialogOpen(false)}
                  className="ml-2"
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  className={
                    transactionType === "deposit"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-amber-600 hover:bg-amber-700"
                  }
                >
                  {transactionType === "deposit" ? "إيداع" : "سحب"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

import { Badge } from "@/components/ui/badge";

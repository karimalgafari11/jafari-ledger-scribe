
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Account, AccountFormData } from "@/types/accounts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const accountTypes = [
  { label: "أصول", value: "asset" },
  { label: "التزامات", value: "liability" },
  { label: "حقوق ملكية", value: "equity" },
  { label: "إيرادات", value: "revenue" },
  { label: "مصروفات", value: "expense" },
];

const formSchema = z.object({
  name: z.string().min(3, "يجب أن يكون الاسم 3 أحرف على الأقل"),
  number: z.string().min(3, "يجب أن يكون الرقم 3 أرقام على الأقل"),
  type: z.enum(["asset", "liability", "equity", "revenue", "expense"]),
  parentId: z.string().nullable(),
});

interface AccountFormProps {
  account?: Account;
  parentOptions: { label: string; value: string }[];
  onSubmit: (data: AccountFormData) => void;
  onSuggestNumber: (type: Account['type'], parentId: string | null) => string;
  onCancel: () => void;
}

export const AccountForm: React.FC<AccountFormProps> = ({
  account,
  parentOptions,
  onSubmit,
  onSuggestNumber,
  onCancel,
}) => {
  const form = useForm<AccountFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: account
      ? {
          name: account.name,
          number: account.number,
          type: account.type,
          parentId: account.parentId,
        }
      : {
          name: "",
          number: "",
          type: "asset",
          parentId: null,
        },
  });

  const watchType = form.watch("type");
  const watchParentId = form.watch("parentId");

  // اقتراح رقم الحساب عند تغيير النوع أو الحساب الأب
  useEffect(() => {
    if (!account) { // فقط عند إنشاء حساب جديد
      const suggestedNumber = onSuggestNumber(watchType as Account['type'], watchParentId);
      form.setValue("number", suggestedNumber);
    }
  }, [watchType, watchParentId, onSuggestNumber, form, account]);

  const handleSubmit = (data: AccountFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 rtl">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم الحساب</FormLabel>
              <FormControl>
                <Input {...field} placeholder="أدخل اسم الحساب" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الحساب</FormLabel>
              <FormControl>
                <Input {...field} placeholder="أدخل رقم الحساب" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع الحساب</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الحساب" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {accountTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
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
          name="parentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الحساب الأب</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحساب الأب (اختياري)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="null">بدون حساب أب</SelectItem>
                  {parentOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-4">
          <Button type="submit">
            {account ? "تعديل الحساب" : "إضافة حساب"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            إلغاء
          </Button>
        </div>
      </form>
    </Form>
  );
};

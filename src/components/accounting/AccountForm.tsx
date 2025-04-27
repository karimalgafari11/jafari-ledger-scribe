
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const accountTypes = [
  { label: "أصول", value: "asset", description: "الموارد التي تملكها المنشأة" },
  { label: "التزامات", value: "liability", description: "الديون والالتزامات على المنشأة" },
  { label: "حقوق ملكية", value: "equity", description: "حقوق الملاك في المنشأة" },
  { label: "إيرادات", value: "revenue", description: "الدخل من الأنشطة التجارية" },
  { label: "مصروفات", value: "expense", description: "تكاليف ممارسة النشاط" },
];

const formSchema = z.object({
  name: z.string()
    .min(3, "يجب أن يكون الاسم 3 أحرف على الأقل")
    .max(50, "يجب أن لا يتجاوز الاسم 50 حرفاً"),
  number: z.string()
    .min(3, "يجب أن يكون الرقم 3 أرقام على الأقل")
    .max(10, "يجب أن لا يتجاوز الرقم 10 أرقام")
    .regex(/^\d+$/, "يجب أن يحتوي الرقم على أرقام فقط"),
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

  useEffect(() => {
    if (!account) {
      const suggestedNumber = onSuggestNumber(watchType as Account['type'], watchParentId);
      form.setValue("number", suggestedNumber);
    }
  }, [watchType, watchParentId, onSuggestNumber, form, account]);

  const handleSubmit = (data: AccountFormData) => {
    onSubmit(data);
  };

  return (
    <TooltipProvider>
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
                <div className="flex items-center gap-2">
                  <FormLabel>رقم الحساب</FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>يجب أن يكون رقم الحساب فريداً ومكوناً من أرقام فقط</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
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
                      <Tooltip key={type.value}>
                        <TooltipTrigger asChild>
                          <SelectItem value={type.value}>
                            {type.label}
                          </SelectItem>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{type.description}</p>
                        </TooltipContent>
                      </Tooltip>
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
    </TooltipProvider>
  );
};

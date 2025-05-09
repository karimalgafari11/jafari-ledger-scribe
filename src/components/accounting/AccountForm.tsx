
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Account, AccountFormData } from "@/types/accounts";
import { Form } from "@/components/ui/form";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AccountDetailsFields } from "./form/AccountDetailsFields";
import { AccountTypeSelector } from "./form/AccountTypeSelector";
import { AccountParentSelector } from "./form/AccountParentSelector";
import { AccountFormActions } from "./form/AccountFormActions";

// Form validation schema
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
  // Validate parent options - ensure no empty values
  const validParentOptions = parentOptions?.filter(
    option => option && option.value && typeof option.value === 'string' && option.value.trim() !== ''
  ) || [];

  console.log("Valid parent options in form:", validParentOptions);

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
          <AccountDetailsFields form={form} />
          <AccountTypeSelector form={form} />
          <AccountParentSelector form={form} parentOptions={validParentOptions} />
          <AccountFormActions onCancel={onCancel} isEdit={!!account} />
        </form>
      </Form>
    </TooltipProvider>
  );
};

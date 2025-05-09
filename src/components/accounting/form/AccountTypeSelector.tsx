
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UseFormReturn } from "react-hook-form";
import { AccountFormData } from "@/types/accounts";

// Account types with descriptions
const accountTypes = [
  { label: "أصول", value: "asset", description: "الموارد التي تملكها المنشأة" },
  { label: "التزامات", value: "liability", description: "الديون والالتزامات على المنشأة" },
  { label: "حقوق ملكية", value: "equity", description: "حقوق الملاك في المنشأة" },
  { label: "إيرادات", value: "revenue", description: "الدخل من الأنشطة التجارية" },
  { label: "مصروفات", value: "expense", description: "تكاليف ممارسة النشاط" },
];

interface AccountTypeSelectorProps {
  form: UseFormReturn<AccountFormData>;
}

export const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({ form }) => {
  // Ensure a valid form value exists
  React.useEffect(() => {
    // Set a default value if none exists
    if (!form.getValues("type")) {
      form.setValue("type", "asset");
    }
  }, [form]);

  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>نوع الحساب</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value || "asset"} // Ensure we always have a valid value
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع الحساب" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {accountTypes.map((type) => (
                <TooltipProvider key={type.value}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SelectItem value={type.value}>
                        {type.label}
                      </SelectItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{type.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

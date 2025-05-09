
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { AccountFormData } from "@/types/accounts";

interface AccountParentSelectorProps {
  form: UseFormReturn<AccountFormData>;
  parentOptions: { label: string; value: string }[];
}

export const AccountParentSelector: React.FC<AccountParentSelectorProps> = ({ form, parentOptions }) => {
  // Ensure we have valid parent options before rendering
  // Strict validation to prevent empty strings or undefined values
  const validParentOptions = parentOptions?.filter(
    option => option && 
      typeof option === 'object' && 
      'value' in option && 
      option.value && 
      typeof option.value === 'string' && 
      option.value.trim() !== ''
  ) || [];

  console.log("Valid parent options in selector:", validParentOptions);

  return (
    <FormField
      control={form.control}
      name="parentId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>الحساب الأب</FormLabel>
          <Select
            onValueChange={(value) => field.onChange(value === "no-parent" ? null : value)}
            value={field.value || "no-parent"}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="اختر الحساب الأب (اختياري)" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="no-parent">بدون حساب أب</SelectItem>
              {validParentOptions.map((option) => (
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
  );
};

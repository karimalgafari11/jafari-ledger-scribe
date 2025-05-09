
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { AccountFormData } from "@/types/accounts";

interface AccountDetailsFieldsProps {
  form: UseFormReturn<AccountFormData>;
}

export const AccountDetailsFields: React.FC<AccountDetailsFieldsProps> = ({ form }) => {
  return (
    <>
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
    </>
  );
};

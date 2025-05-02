
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBranches } from "@/hooks/useBranches";
import { useCurrencies } from "@/hooks/useCurrencies";
import { CashRegister } from "@/types/definitions";

interface CashRegisterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  register: CashRegister | null;
  defaultValues: any;
  onSubmit: (data: any) => void;
}

export const CashRegisterDialog: React.FC<CashRegisterDialogProps> = ({
  open,
  onOpenChange,
  title,
  register,
  defaultValues,
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState(defaultValues);
  const { branches } = useBranches();
  const { currencies } = useCurrencies();

  React.useEffect(() => {
    if (register) {
      setFormData({ ...register });
    } else {
      setFormData({ ...defaultValues });
    }
  }, [register, defaultValues]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 rtl">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">رمز الصندوق</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleChange("code", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">اسم الصندوق</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="branchId">الفرع</Label>
              <Select
                value={formData.branchId}
                onValueChange={(value) => handleChange("branchId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفرع" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currencyId">العملة</Label>
              <Select
                value={formData.currencyId}
                onValueChange={(value) => handleChange("currencyId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر العملة" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.id} value={currency.id}>
                      {currency.name} ({currency.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="balance">الرصيد الافتتاحي</Label>
            <Input
              id="balance"
              type="number"
              value={formData.balance}
              onChange={(e) => handleChange("balance", parseFloat(e.target.value))}
              required
            />
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleChange("isActive", checked)}
            />
            <Label htmlFor="isActive">نشط</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit">حفظ</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

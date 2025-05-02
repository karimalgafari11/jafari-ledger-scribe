
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface ItemFormFooterProps {
  total: number;
  isUpdate: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ItemFormFooter: React.FC<ItemFormFooterProps> = ({
  total,
  isUpdate,
  onCancel,
  onSubmit
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-sm font-bold">
        <span>المجموع: </span>
        <span>{total.toFixed(2)} ر.س</span>
      </div>

      <div className="flex space-x-2 rtl space-x-reverse">
        <Button type="button" variant="outline" onClick={onCancel} size="sm" className="h-7 text-xs">
          <X className="ml-1 h-3 w-3" />
          إلغاء
        </Button>
        <Button type="submit" size="sm" className="h-7 text-xs">
          <Check className="ml-1 h-3 w-3" />
          {isUpdate ? 'تحديث' : 'إضافة'}
        </Button>
      </div>
    </div>
  );
};

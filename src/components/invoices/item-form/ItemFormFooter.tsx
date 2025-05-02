
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
      <div className="text-xs font-bold">
        <span>المجموع: </span>
        <span>{total.toFixed(2)}</span>
      </div>

      <div className="flex space-x-1 rtl space-x-reverse">
        <Button type="button" variant="outline" onClick={onCancel} size="xs" className="h-5 text-xs">
          <X className="ml-0.5 h-2.5 w-2.5" />
          إلغاء
        </Button>
        <Button type="submit" size="xs" className="h-5 text-xs">
          <Check className="ml-0.5 h-2.5 w-2.5" />
          {isUpdate ? 'تحديث' : 'إضافة'}
        </Button>
      </div>
    </div>
  );
};

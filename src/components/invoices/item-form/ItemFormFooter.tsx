
import React from "react";
import { Button } from "@/components/ui/button";

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
    <div className="border-t pt-4">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-semibold">الإجمالي:</span>{" "}
          {total.toFixed(2)} ر.س
        </div>
        <div className="space-x-2 rtl space-x-reverse">
          <Button type="button" variant="outline" onClick={onCancel}>
            إلغاء
          </Button>
          <Button type="submit">
            {isUpdate ? "تحديث" : "إضافة"}
          </Button>
        </div>
      </div>
    </div>
  );
};

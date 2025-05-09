
import React from "react";
import { Button } from "@/components/ui/button";

interface AccountFormActionsProps {
  onCancel: () => void;
  isEdit: boolean;
}

export const AccountFormActions: React.FC<AccountFormActionsProps> = ({ onCancel, isEdit }) => {
  return (
    <div className="flex justify-between pt-4">
      <Button type="submit">
        {isEdit ? "تعديل الحساب" : "إضافة حساب"}
      </Button>
      <Button type="button" variant="outline" onClick={onCancel}>
        إلغاء
      </Button>
    </div>
  );
};

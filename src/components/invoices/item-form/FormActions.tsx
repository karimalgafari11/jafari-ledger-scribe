
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface FormActionsProps {
  onSave: () => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onSave,
  onCancel,
  isEdit = false
}) => {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button
        size="sm"
        variant="outline"
        onClick={onCancel}
        className="h-8"
      >
        <X className="h-4 w-4 ml-1" />
        إلغاء
      </Button>
      
      <Button
        size="sm"
        onClick={onSave}
        className="h-8"
      >
        <Check className="h-4 w-4 ml-1" />
        {isEdit ? "تعديل" : "إضافة"}
      </Button>
    </div>
  );
};


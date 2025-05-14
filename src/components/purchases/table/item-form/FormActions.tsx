
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface FormActionsProps {
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({ 
  onSubmit, 
  onCancel,
  isSubmitting = false 
}) => {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button
        variant="outline"
        onClick={onCancel}
        type="button"
      >
        <X className="ml-1 h-4 w-4" />
        إلغاء
      </Button>
      <Button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="bg-green-600 hover:bg-green-700"
      >
        <Check className="ml-1 h-4 w-4" />
        {isSubmitting ? "جاري الحفظ..." : "حفظ"}
      </Button>
    </div>
  );
};


import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface FormActionsProps {
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  editingItemIndex?: number | null;
  showSaveButton?: boolean;
  actionLabel?: string;
  onSave?: () => void;
}

export const FormActions: React.FC<FormActionsProps> = ({ 
  onSubmit, 
  onCancel,
  isSubmitting = false,
  editingItemIndex,
  showSaveButton,
  actionLabel,
  onSave
}) => {
  // If onSave is provided, use it instead of onSubmit
  const handleSaveClick = onSave || onSubmit;
  
  // Use actionLabel if provided, otherwise default based on whether we're editing
  const buttonLabel = actionLabel || (editingItemIndex !== null ? "تحديث" : "حفظ");
  
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
        onClick={handleSaveClick}
        disabled={isSubmitting}
        className="bg-green-600 hover:bg-green-700"
      >
        <Check className="ml-1 h-4 w-4" />
        {isSubmitting ? "جاري الحفظ..." : buttonLabel}
      </Button>
    </div>
  );
};

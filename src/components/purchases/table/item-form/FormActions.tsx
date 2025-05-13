
import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface FormActionsProps {
  editingItemIndex: number | null;
  showSaveButton: boolean;
  onSave: () => void;
  actionLabel?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({
  editingItemIndex,
  showSaveButton,
  onSave,
  actionLabel = "إضافة"
}) => {
  if (!showSaveButton) return null;
  
  return (
    <div className="flex justify-end mt-4">
      <Button onClick={onSave} className="gap-2 rtl:flex-row-reverse">
        <Save className="h-4 w-4" />
        {editingItemIndex !== null ? "تحديث الصنف" : actionLabel}
      </Button>
    </div>
  );
};

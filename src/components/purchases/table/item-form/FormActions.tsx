
import React from "react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  editingItemIndex: number | null;
  showSaveButton: boolean;
  onSave: () => void;
  actionLabel: string;
}

export const FormActions: React.FC<FormActionsProps> = ({
  editingItemIndex,
  showSaveButton,
  onSave,
  actionLabel
}) => {
  if (!showSaveButton) return null;
  
  return (
    <div className="flex justify-end">
      <Button 
        onClick={onSave}
        className="bg-green-600 hover:bg-green-700"
      >
        {editingItemIndex !== null ? "تحديث الصنف" : actionLabel}
      </Button>
    </div>
  );
};

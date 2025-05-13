
import React from 'react';
import { Button } from "@/components/ui/button";

interface ItemFormFooterProps {
  onSave: () => void;
  onCancel: () => void;
  saveLabel?: string;
  cancelLabel?: string;
  showSaveButton?: boolean;
}

export const ItemFormFooter: React.FC<ItemFormFooterProps> = ({
  onSave,
  onCancel,
  saveLabel = "حفظ",
  cancelLabel = "إلغاء",
  showSaveButton = true
}) => {
  return (
    <div className="flex justify-end space-x-2 rtl:space-x-reverse mt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
      >
        {cancelLabel}
      </Button>
      
      {showSaveButton && (
        <Button
          type="button"
          onClick={onSave}
        >
          {saveLabel}
        </Button>
      )}
    </div>
  );
};

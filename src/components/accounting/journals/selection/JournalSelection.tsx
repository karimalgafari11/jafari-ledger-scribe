
import React from "react";
import { toast } from "sonner";
import { JournalEntry } from "@/types/journal";

interface JournalSelectionProps {
  entries: JournalEntry[];
  selectedEntries: string[];
  onToggleSelection: (id: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onDelete: (id: string) => void;
  onBulkDelete: () => void;
}

export const JournalSelection: React.FC<JournalSelectionProps> = ({
  entries,
  selectedEntries,
  onToggleSelection,
  onSelectAll,
  onDelete,
  onBulkDelete,
}) => {
  const handleBulkDelete = async () => {
    if (selectedEntries.length === 0) {
      toast.error("لم يتم تحديد أي قيود للحذف");
      return;
    }
    
    onBulkDelete();
    toast.success(`تم حذف ${selectedEntries.length} قيود بنجاح`);
  };

  return (
    <JournalTable
      entries={entries}
      isLoading={false}
      selectedEntries={selectedEntries}
      onToggleSelection={onToggleSelection}
      onSelectAll={onSelectAll}
      onView={() => {}}
      onEdit={() => {}}
      onDelete={onDelete}
    />
  );
};

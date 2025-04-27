
import React from "react";
import { toast } from "sonner";
import { JournalEntry } from "@/types/journal";
import { JournalTable } from "@/components/accounting/journals/JournalTable";

interface JournalSelectionProps {
  entries: JournalEntry[];
  selectedEntries: string[];
  onToggleSelection: (id: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onDelete: (id: string) => void;
  onBulkDelete: () => void;
  isLoading: boolean;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

export const JournalSelection: React.FC<JournalSelectionProps> = ({
  entries,
  selectedEntries,
  onToggleSelection,
  onSelectAll,
  onDelete,
  onBulkDelete,
  isLoading,
  onView,
  onEdit,
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
      isLoading={isLoading}
      selectedEntries={selectedEntries}
      onToggleSelection={onToggleSelection}
      onSelectAll={onSelectAll}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

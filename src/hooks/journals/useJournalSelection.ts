
import { useState } from 'react';
import { toast } from 'sonner';

export const useJournalSelection = (deleteEntry: (id: string) => void) => {
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);

  const handleToggleSelection = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedEntries(prev => [...prev, id]);
    } else {
      setSelectedEntries(prev => prev.filter(entryId => entryId !== id));
    }
  };

  const handleSelectAll = (entries: any[], selected: boolean) => {
    if (selected) {
      setSelectedEntries(entries.map(entry => entry.id));
    } else {
      setSelectedEntries([]);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedEntries.length === 0) {
      toast.error("لم يتم تحديد أي قيود للحذف");
      return;
    }
    selectedEntries.forEach(id => deleteEntry(id));
    setSelectedEntries([]);
    toast.success(`تم حذف ${selectedEntries.length} قيود بنجاح`);
  };

  return {
    selectedEntries,
    handleToggleSelection,
    handleSelectAll,
    handleBulkDelete,
  };
};

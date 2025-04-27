
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

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      // The actual entries will be provided by the component that uses this hook
      // We'll clear or set the entries in the component
      // Here we just prepare for setting them
      setSelectedEntries([]); // This will be populated by the component
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
    setSelectedEntries
  };
};

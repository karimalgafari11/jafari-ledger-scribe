
import { useJournalEntries } from './useJournalEntries';
import { useJournalDialogs } from './journals/useJournalDialogs';
import { useJournalFilters } from './journals/useJournalFilters';
import { useJournalSelection } from './journals/useJournalSelection';
import { useJournalActions } from './journals/useJournalActions';
import { JournalEntry, JournalStatus } from '@/types/journal';
import { toast } from 'sonner';

export const useJournalPage = () => {
  const {
    entries,
    selectedEntry,
    setSelectedEntry,
    addEntry,
    updateEntry,
    deleteEntry,
    searchEntries,
    generateEntryNumber,
  } = useJournalEntries();

  const {
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isViewDialogOpen,
    setIsViewDialogOpen,
    handleCreate,
    handleEdit,
    handleView,
  } = useJournalDialogs();

  const {
    filterDate,
    filterStatus,
    filterUser,
    filterPeriod,
    isLoading,
    handleFilterChange,
    handleResetFilters,
  } = useJournalFilters();

  const {
    selectedEntries,
    handleToggleSelection,
    handleSelectAll,
    handleBulkDelete,
  } = useJournalSelection(deleteEntry);

  const {
    handleExport,
    handlePrintPreview,
    handleShareWhatsApp,
  } = useJournalActions();

  const handleSearch = (searchTerm: string) => {
    searchEntries(searchTerm);
  };

  const handleCreateSubmit = (data: Omit<JournalEntry, "id" | "createdAt" | "updatedAt">) => {
    addEntry(data);
    setIsCreateDialogOpen(false);
    toast.success("تم إنشاء القيد بنجاح");
  };

  const handleEditSubmit = (data: Partial<JournalEntry>) => {
    if (!selectedEntry) return;
    updateEntry(selectedEntry.id, data);
    setIsEditDialogOpen(false);
    toast.success("تم تحديث القيد بنجاح");
  };

  const filteredEntries = entries.filter(entry => {
    if (filterDate.from && new Date(entry.date) < filterDate.from) return false;
    if (filterDate.to && new Date(entry.date) > filterDate.to) return false;
    if (filterStatus && entry.status !== filterStatus) return false;
    if (filterUser && entry.createdBy !== filterUser) return false;
    
    if (filterPeriod) {
      const today = new Date();
      const entryDate = new Date(entry.date);
      
      if (filterPeriod === "day" && entryDate.toDateString() !== today.toDateString()) {
        return false;
      } else if (filterPeriod === "week") {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        if (entryDate < startOfWeek) return false;
      } else if (filterPeriod === "month") {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        if (entryDate < startOfMonth) return false;
      }
    }
    
    return true;
  });

  return {
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isViewDialogOpen,
    setIsViewDialogOpen,
    filterDate,
    filterStatus,
    filterUser,
    filterPeriod,
    selectedEntries,
    isLoading,
    filteredEntries,
    selectedEntry,
    generateEntryNumber,
    handleSearch,
    handleFilterChange,
    handleResetFilters,
    handleCreate,
    handleEdit,
    handleView,
    handleDelete: deleteEntry,
    handleBulkDelete,
    handleCreateSubmit,
    handleEditSubmit,
    handleToggleSelection,
    handleSelectAll,
    handleExport,
    handlePrintPreview,
    handleShareWhatsApp: () => handleShareWhatsApp(selectedEntries, entries),
  };
};

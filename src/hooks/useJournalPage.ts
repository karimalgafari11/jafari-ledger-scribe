
import { useState } from 'react';
import { JournalEntry, JournalStatus } from '@/types/journal';
import { useJournalEntries } from './useJournalEntries';
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

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [filterDate, setFilterDate] = useState<{from?: Date; to?: Date}>({});
  const [filterStatus, setFilterStatus] = useState<JournalStatus | "">("");
  const [filterUser, setFilterUser] = useState("");
  const [filterPeriod, setFilterPeriod] = useState<"day" | "week" | "month" | "">(""); 
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (searchTerm: string) => {
    searchEntries(searchTerm);
  };

  const handleFilterChange = (
    dateRange: {from?: Date; to?: Date},
    status: JournalStatus | "",
    user: string,
    period: "day" | "week" | "month" | ""
  ) => {
    setIsLoading(true);
    setFilterDate(dateRange);
    setFilterStatus(status);
    setFilterUser(user);
    setFilterPeriod(period);
    
    setTimeout(() => setIsLoading(false), 500);
    toast.success("تم تطبيق الفلترة بنجاح");
  };

  const handleResetFilters = () => {
    setFilterDate({});
    setFilterStatus("");
    setFilterUser("");
    setFilterPeriod("");
    toast.success("تم إعادة تعيين الفلترة");
  };

  const handleCreate = () => {
    setSelectedEntry(null);
    setIsCreateDialogOpen(true);
  };

  const handleEdit = (id: string) => {
    const entry = entries.find(entry => entry.id === id);
    if (entry) {
      setSelectedEntry(entry);
      setIsEditDialogOpen(true);
    }
  };

  const handleView = (id: string) => {
    const entry = entries.find(entry => entry.id === id);
    if (entry) {
      setSelectedEntry(entry);
      setIsViewDialogOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    deleteEntry(id);
    toast.success("تم حذف القيد بنجاح");
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

  const handleToggleSelection = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedEntries(prev => [...prev, id]);
    } else {
      setSelectedEntries(prev => prev.filter(entryId => entryId !== id));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedEntries(entries.map(entry => entry.id));
    } else {
      setSelectedEntries([]);
    }
  };

  const handleExport = async (format: "pdf" | "excel") => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`تم تصدير البيانات بنجاح بصيغة ${format === "pdf" ? "PDF" : "Excel"}`);
    } catch (error) {
      toast.error("حدث خطأ أثناء تصدير البيانات");
    }
  };

  const handlePrintPreview = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      window.print();
    } catch (error) {
      toast.error("حدث خطأ أثناء تحضير صفحة الطباعة");
    }
  };

  const handleShareWhatsApp = () => {
    let message = "قيود محاسبية - النظام المحاسبي";
    
    if (selectedEntries.length > 0) {
      const selectedItems = entries
        .filter(entry => selectedEntries.includes(entry.id))
        .map(entry => `${entry.entryNumber}: ${entry.description} (${entry.totalDebit})`)
        .join("\n");
      
      message += "\n\nالقيود المختارة:\n" + selectedItems;
    }
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    toast.success("تم فتح واتساب للمشاركة");
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
    handleDelete,
    handleBulkDelete,
    handleCreateSubmit,
    handleEditSubmit,
    handleToggleSelection,
    handleSelectAll,
    handleExport,
    handlePrintPreview,
    handleShareWhatsApp
  };
};

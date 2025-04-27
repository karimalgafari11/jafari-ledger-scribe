import React, { useState } from "react";
import { Header } from "@/components/Header";
import { toast } from "sonner";
import { JournalFilters } from "@/components/accounting/journals/filters/JournalFilters";
import { JournalSelection } from "@/components/accounting/journals/selection/JournalSelection";
import { JournalActions } from "@/components/accounting/journals/actions/JournalActions";
import { JournalEntryDialog } from "@/components/accounting/journals/JournalEntryDialog";
import { useJournalEntries } from "@/hooks/useJournalEntries";
import { JournalEntry, JournalStatus } from "@/types/journal";

const JournalEntriesPage: React.FC = () => {
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
    
    // Simulate loading state
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
      // Simulating export functionality
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`تم تصدير البيانات بنجاح بصيغة ${format === "pdf" ? "PDF" : "Excel"}`);
    } catch (error) {
      toast.error("حدث خطأ أثناء تصدير البيانات");
    }
  };

  const handlePrintPreview = async () => {
    try {
      // Simulating print preview
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
    // Apply date filter if set
    if (filterDate.from && new Date(entry.date) < filterDate.from) return false;
    if (filterDate.to && new Date(entry.date) > filterDate.to) return false;
    
    // Apply status filter if set
    if (filterStatus && entry.status !== filterStatus) return false;
    
    // Apply user filter if set
    if (filterUser && entry.createdBy !== filterUser) return false;
    
    // Apply period filter if set
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

  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="القيود اليومية" showBack={true} />

      <JournalActions 
        selectedEntries={selectedEntries}
        entries={entries}
        onExport={handleExport}
        onPrintPreview={handlePrintPreview}
        onCreateEntry={handleCreate}
        onShareWhatsApp={handleShareWhatsApp}
      />

      <JournalFilters
        filterDate={filterDate}
        filterStatus={filterStatus}
        filterUser={filterUser}
        filterPeriod={filterPeriod}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        onSearch={handleSearch}
        onBulkDelete={handleBulkDelete}
        selectedCount={selectedEntries.length}
      />

      <JournalSelection
        entries={filteredEntries}
        selectedEntries={selectedEntries}
        onToggleSelection={handleToggleSelection}
        onSelectAll={handleSelectAll}
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
        isLoading={isLoading}
        onView={handleView}
        onEdit={handleEdit}
      />

      <JournalEntryDialog
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        isViewDialogOpen={isViewDialogOpen}
        setIsViewDialogOpen={setIsViewDialogOpen}
        selectedEntry={selectedEntry}
        onCreateSubmit={handleCreateSubmit}
        onEditSubmit={handleEditSubmit}
        generateEntryNumber={generateEntryNumber}
        viewOnly={false}
      />
    </div>
  );
};

export default JournalEntriesPage;


import React from "react";
import { Header } from "@/components/Header";
import { JournalFilters } from "@/components/accounting/journals/filters/JournalFilters";
import { JournalSelection } from "@/components/accounting/journals/selection/JournalSelection";
import { JournalActions } from "@/components/accounting/journals/actions/JournalActions";
import { JournalEntryDialog } from "@/components/accounting/journals/JournalEntryDialog";
import { useJournalPage } from "@/hooks/useJournalPage";
import { JournalEntry } from "@/types/journal";
import { Layout } from "@/components/Layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { JournalToolbar } from "@/components/accounting/journals/JournalToolbar";
import { JournalTable } from "@/components/accounting/journals/JournalTable";

const JournalEntriesPage: React.FC = () => {
  const {
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
    handleShareWhatsApp,
    setSelectedEntries
  } = useJournalPage();

  // Fix type mismatch: Create wrapper function for handleSelectAll
  const handleSelectAllEntries = (selected: boolean) => {
    handleSelectAll(selected);
  };

  // Fix type mismatch: Create wrapper functions for handleView and handleEdit
  const handleViewEntry = (id: string) => {
    const entry = filteredEntries.find(entry => entry.id === id);
    if (entry) {
      handleView(entry);
    }
  };

  const handleEditEntry = (id: string) => {
    const entry = filteredEntries.find(entry => entry.id === id);
    if (entry) {
      handleEdit(entry);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <Header title="القيود اليومية" showBack={true} />

        <div className="flex-1 overflow-auto p-4 pb-16">
          <JournalActions 
            selectedEntries={selectedEntries}
            entries={filteredEntries}
            onExport={handleExport}
            onPrintPreview={handlePrintPreview}
            onCreateEntry={handleCreate}
            onShareWhatsApp={handleShareWhatsApp}
          />

          <JournalToolbar
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            onBulkDelete={handleBulkDelete}
            filterDate={filterDate}
            filterStatus={filterStatus}
            filterUser={filterUser}
            filterPeriod={filterPeriod}
            selectedCount={selectedEntries.length}
          />
          
          {filteredEntries.length === 0 && !isLoading ? (
            <div className="mt-8">
              <Alert variant="default" className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
                <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertTitle className="text-blue-600 dark:text-blue-400">لا توجد نتائج</AlertTitle>
                <AlertDescription className="text-blue-600/80 dark:text-blue-400/80">
                  لم يتم العثور على أي قيود محاسبية تطابق معايير البحث. حاول تغيير معايير البحث أو إنشاء قيد جديد.
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <JournalTable
                entries={filteredEntries}
                selectedEntries={selectedEntries}
                onToggleSelection={handleToggleSelection}
                onSelectAll={handleSelectAllEntries}
                onDelete={handleDelete}
                onView={handleViewEntry}
                onEdit={handleEditEntry}
                isLoading={isLoading}
              />
            </div>
          )}

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
      </div>
    </Layout>
  );
};

export default JournalEntriesPage;

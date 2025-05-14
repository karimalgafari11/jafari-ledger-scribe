
import React from "react";
import { Header } from "@/components/Header";
import { JournalFilters } from "@/components/accounting/journals/filters/JournalFilters";
import { JournalSelection } from "@/components/accounting/journals/selection/JournalSelection";
import { JournalActions } from "@/components/accounting/journals/actions/JournalActions";
import { JournalEntryDialog } from "@/components/accounting/journals/JournalEntryDialog";
import { useJournalPage } from "@/hooks/useJournalPage";
import { JournalEntry } from "@/types/journal";
import { Layout } from "@/components/Layout";

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
            onSelectAll={handleSelectAllEntries}
            onDelete={handleDelete}
            onBulkDelete={handleBulkDelete}
            isLoading={isLoading}
            onView={handleViewEntry}
            onEdit={handleEditEntry}
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
      </div>
    </Layout>
  );
};

export default JournalEntriesPage;

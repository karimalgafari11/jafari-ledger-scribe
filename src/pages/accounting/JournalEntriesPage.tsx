
import React from "react";
import { Header } from "@/components/Header";
import { JournalFilters } from "@/components/accounting/journals/filters/JournalFilters";
import { JournalSelection } from "@/components/accounting/journals/selection/JournalSelection";
import { JournalActions } from "@/components/accounting/journals/actions/JournalActions";
import { JournalEntryDialog } from "@/components/accounting/journals/JournalEntryDialog";
import { useJournalPage } from "@/hooks/useJournalPage";

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
    handleShareWhatsApp
  } = useJournalPage();

  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="القيود اليومية" showBack={true} />

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

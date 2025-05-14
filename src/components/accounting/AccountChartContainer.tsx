
import React from "react";
import { Layout } from "@/components/Layout";
import { AccountPageHeader } from "./AccountPageHeader";
import { AccountsContent } from "./AccountsContent";
import { AccountDialogs } from "./AccountDialogs";
import { useAccountChartPage } from "@/hooks/useAccountChartPage";
import { AccountDialogsProvider, useAccountDialogs } from "./AccountDialogsContext";

export const AccountChartContainer: React.FC = () => {
  const {
    filteredAccounts,
    selectedAccount,
    filterType,
    minBalance,
    maxBalance,
    isLoading,
    handleSearch,
    handleEdit,
    handleDelete,
    handleShare,
    handleAddSubmit,
    handleEditSubmit,
    handleFilterChange,
    handleResetFilters,
    handleGenerateReport,
    getParentAccountOptions,
    suggestAccountNumber
  } = useAccountChartPage();

  return (
    <Layout>
      <AccountDialogsProvider initialSelectedAccount={selectedAccount}>
        <div className="flex flex-col h-screen w-full overflow-hidden bg-gray-50">
          <div className="flex-1 overflow-auto p-4 pb-16 max-w-7xl mx-auto w-full">
            <AccountPageHeader
              onSearch={handleSearch}
              filterType={filterType}
              minBalance={minBalance}
              maxBalance={maxBalance}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              accounts={filteredAccounts}
              onGenerateReport={handleGenerateReport}
            />

            <AccountsContent
              isLoading={isLoading}
              filteredAccounts={filteredAccounts}
              filterType={filterType}
              minBalance={minBalance}
              maxBalance={maxBalance}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onShare={handleShare}
            />

            <DialogManager
              parentOptions={getParentAccountOptions()}
              onAddSubmit={handleAddSubmit}
              onEditSubmit={handleEditSubmit}
              onSuggestNumber={suggestAccountNumber}
            />
          </div>
        </div>
      </AccountDialogsProvider>
    </Layout>
  );
};

interface DialogManagerProps {
  parentOptions: { label: string; value: string }[];
  onAddSubmit: (data: any) => void;
  onEditSubmit: (data: any) => void;
  onSuggestNumber: (type: string, parentId: string | null) => string;
}

// Use a named component declaration to avoid "useAccountDialogs is not defined" runtime error
const DialogManager: React.FC<DialogManagerProps> = ({
  parentOptions,
  onAddSubmit,
  onEditSubmit,
  onSuggestNumber
}) => {
  // Now using the hook inside a function component
  const {
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    selectedAccount
  } = useAccountDialogs();

  return (
    <AccountDialogs
      isAddDialogOpen={isAddDialogOpen}
      setIsAddDialogOpen={setIsAddDialogOpen}
      isEditDialogOpen={isEditDialogOpen}
      setIsEditDialogOpen={setIsEditDialogOpen}
      selectedAccount={selectedAccount}
      parentOptions={parentOptions}
      onAddSubmit={onAddSubmit}
      onEditSubmit={onEditSubmit}
      onSuggestNumber={onSuggestNumber}
    />
  );
};

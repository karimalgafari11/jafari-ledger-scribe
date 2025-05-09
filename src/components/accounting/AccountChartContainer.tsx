
import React from "react";
import { Header } from "@/components/Header";
import { Layout } from "@/components/Layout";
import { AccountPageHeader } from "./AccountPageHeader";
import { AccountsContent } from "./AccountsContent";
import { AccountDialogs } from "./AccountDialogs";
import { useAccountChartPage } from "@/hooks/useAccountChartPage";
import { AccountDialogsProvider } from "./AccountDialogsContext";

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
        <div className="flex flex-col h-screen w-full overflow-hidden">
          <Header title="دليل الحسابات" showBack={true} />

          <div className="flex-1 overflow-auto p-4 pb-16">
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

            <AccountDialogsManager
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

interface AccountDialogsManagerProps {
  parentOptions: { label: string; value: string }[];
  onAddSubmit: (data: any) => void;
  onEditSubmit: (data: any) => void;
  onSuggestNumber: (type: string, parentId: string | null) => string;
}

const AccountDialogsManager: React.FC<AccountDialogsManagerProps> = ({
  parentOptions,
  onAddSubmit,
  onEditSubmit,
  onSuggestNumber
}) => {
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


import React from "react";
import { Header } from "@/components/Header";
import { Layout } from "@/components/Layout";
import { AccountPageHeader } from "./AccountPageHeader";
import { AccountsContent } from "./AccountsContent";
import { AccountDialogs } from "./AccountDialogs";
import { useAccountChartPage } from "@/hooks/useAccountChartPage";

export const AccountChartContainer: React.FC = () => {
  const {
    filteredAccounts,
    selectedAccount,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
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
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <Header title="دليل الحسابات" showBack={true} />

        <div className="flex-1 overflow-auto p-4 pb-16">
          <AccountPageHeader
            onSearch={handleSearch}
            onAddAccount={() => setIsAddDialogOpen(true)}
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

          <AccountDialogs
            isAddDialogOpen={isAddDialogOpen}
            setIsAddDialogOpen={setIsAddDialogOpen}
            isEditDialogOpen={isEditDialogOpen}
            setIsEditDialogOpen={setIsEditDialogOpen}
            selectedAccount={selectedAccount}
            parentOptions={getParentAccountOptions()}
            onAddSubmit={handleAddSubmit}
            onEditSubmit={handleEditSubmit}
            onSuggestNumber={suggestAccountNumber}
          />
        </div>
      </div>
    </Layout>
  );
};

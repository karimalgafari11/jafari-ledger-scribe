
import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchBar } from "@/components/SearchBar";
import { useVendors } from "@/hooks/useVendors";
import { VendorActions } from "@/components/vendors/VendorActions";
import { VendorFilters } from "@/components/vendors/VendorFilters";
import { VendorList } from "@/components/vendors/VendorList";
import { VendorStats } from "@/components/vendors/VendorStats";
import { VendorSelectionActions } from "@/components/vendors/VendorSelectionActions";

const VendorsPage = () => {
  const navigate = useNavigate();
  const {
    vendors,
    totalVendors,
    activeVendors,
    inactiveVendors,
    selectedVendors,
    activeTab,
    searchTerm,
    showFilters,
    setActiveTab,
    setSearchTerm,
    setShowFilters,
    handleToggleSelection,
    handleSelectAll,
    handleExportData,
    handleImportData,
    handleAddNewVendor,
    handleExportSelected,
    handleDeleteSelected,
    handleViewVendor,
    handleEditVendor,
    handleViewTransactions,
    handleDeleteVendor,
  } = useVendors();

  return (
    <Layout className="p-0">
      <div className="container mx-auto p-0 sm:p-4 md:p-6 h-screen flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">إدارة الموردين</h1>
          <VendorActions 
            onExportData={handleExportData}
            onImportData={handleImportData}
            onAddNewVendor={handleAddNewVendor}
          />
        </div>
        
        <Card className="mb-6 flex-grow overflow-hidden flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>الموردين</CardTitle>
              <div className="relative w-full sm:w-64">
                <SearchBar 
                  placeholder="بحث عن مورد..." 
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden flex flex-col">
            <VendorFilters
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              totalVendors={totalVendors}
              activeVendors={activeVendors}
              inactiveVendors={inactiveVendors}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
              <VendorSelectionActions
                selectedVendors={selectedVendors}
                onExportSelected={handleExportSelected}
                onDeleteSelected={handleDeleteSelected}
              />
            </div>
            
            <VendorList
              vendors={vendors}
              selectedVendors={selectedVendors}
              onToggleSelection={handleToggleSelection}
              onSelectAll={handleSelectAll}
              onViewVendor={handleViewVendor}
              onEditVendor={handleEditVendor}
              onViewTransactions={handleViewTransactions}
              onDeleteVendor={handleDeleteVendor}
              searchTerm={searchTerm}
            />
          </CardContent>
        </Card>
        
        <VendorStats
          totalVendors={totalVendors}
          activeVendors={activeVendors}
          inactiveVendors={inactiveVendors}
        />
      </div>
    </Layout>
  );
};

export default VendorsPage;

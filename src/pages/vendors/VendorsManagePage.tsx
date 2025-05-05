
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload, UserPlus, Filter, FileText } from "lucide-react";
import { VendorList } from "@/components/vendors/VendorList";
import { VendorStats } from "@/components/vendors/VendorStats";
import { VendorFilters } from "@/components/vendors/VendorFilters";
import { VendorSelectionActions } from "@/components/vendors/VendorSelectionActions";
import { useVendors } from "@/hooks/useVendors";
import { VendorDialog } from "@/components/vendors/VendorDialog";
import { VendorImportDialog } from "@/components/vendors/VendorImportDialog";
import { VendorDetailsDialog } from "@/components/vendors/VendorDetailsDialog";
import { toast } from "sonner";

const VendorsManagePage = () => {
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

  const [isVendorDialogOpen, setIsVendorDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);

  const openAddVendorDialog = () => {
    setSelectedVendor(null);
    setEditMode(false);
    setIsVendorDialogOpen(true);
  };

  const openEditVendorDialog = (vendor: any) => {
    setSelectedVendor(vendor);
    setEditMode(true);
    setIsVendorDialogOpen(true);
  };

  const openImportDialog = () => {
    setIsImportDialogOpen(true);
  };

  const openDetailsDialog = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsDetailsDialogOpen(true);
  };

  const handleViewVendorDetails = (vendor: any) => {
    openDetailsDialog(vendor);
  };

  const handleExportVendors = () => {
    toast.success("جاري تصدير بيانات الموردين");
    handleExportData();
  };

  const handleExportSelectedVendors = () => {
    toast.success(`جاري تصدير بيانات ${selectedVendors.length} مورد`);
    handleExportSelected();
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Header title="إدارة الموردين" showBack={true}>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportVendors}
              className="flex items-center gap-2"
            >
              <Download size={16} className="ml-1" />
              تصدير
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={openImportDialog}
              className="flex items-center gap-2"
            >
              <Upload size={16} className="ml-1" />
              استيراد
            </Button>
            <Button 
              size="sm" 
              onClick={openAddVendorDialog}
              className="flex items-center gap-2"
            >
              <UserPlus size={16} className="ml-1" />
              إضافة مورد
            </Button>
          </div>
        </Header>
      </div>

      <main className="container mx-auto p-6">
        <VendorStats 
          totalVendors={totalVendors}
          activeVendors={activeVendors}
          inactiveVendors={inactiveVendors}
        />

        <Card className="mb-6">
          <CardHeader className="py-4 px-6">
            <div className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-medium">فلترة الموردين</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter size={16} className="ml-1" />
                {showFilters ? "إخفاء الفلتر" : "إظهار الفلتر"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="py-2">
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
          </CardContent>
        </Card>

        {selectedVendors.length > 0 && (
          <VendorSelectionActions
            selectedVendors={selectedVendors}
            onExportSelected={handleExportSelectedVendors}
            onDeleteSelected={handleDeleteSelected}
          />
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
            <CardTitle className="text-lg font-medium">قائمة الموردين</CardTitle>
            <span className="text-sm text-gray-500">
              إجمالي النتائج: {vendors.length}
            </span>
          </CardHeader>
          <CardContent className="p-0">
            <VendorList
              vendors={vendors}
              selectedVendors={selectedVendors}
              onToggleSelection={handleToggleSelection}
              onSelectAll={handleSelectAll}
              onViewVendor={handleViewVendorDetails}
              onEditVendor={openEditVendorDialog}
              onViewTransactions={handleViewTransactions}
              onDeleteVendor={handleDeleteVendor}
              searchTerm={searchTerm}
            />
          </CardContent>
        </Card>
      </main>

      <VendorDialog
        open={isVendorDialogOpen}
        onClose={() => setIsVendorDialogOpen(false)}
        vendor={selectedVendor}
        isEditMode={editMode}
      />

      <VendorImportDialog
        open={isImportDialogOpen}
        onClose={() => setIsImportDialogOpen(false)}
      />

      <VendorDetailsDialog
        open={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        vendor={selectedVendor}
      />
    </div>
  );
};

export default VendorsManagePage;

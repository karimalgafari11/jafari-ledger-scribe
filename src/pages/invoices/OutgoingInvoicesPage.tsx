
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Download, Filter, FilePlus, CalendarDays, Search } from "lucide-react";
import { useOutgoingInvoices } from "@/hooks/invoices/useOutgoingInvoices";
import { InvoiceFilters } from "@/components/invoices/outgoing/InvoiceFilters";
import { InvoicesTable } from "@/components/invoices/outgoing/InvoicesTable";
import { InvoiceStatCards } from "@/components/invoices/outgoing/InvoiceStatCards";
import { InvoicesActions } from "@/components/invoices/outgoing/InvoicesActions";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const OutgoingInvoicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    invoices,
    isLoading,
    statistics,
    filter,
    setFilter,
    selectedInvoices,
    toggleInvoiceSelection,
    selectAllInvoices,
    unselectAllInvoices,
    exportInvoices,
    deleteInvoices
  } = useOutgoingInvoices();

  const handleNewInvoice = () => {
    navigate("/invoices/new");
  };

  const handleExport = (format: "pdf" | "excel") => {
    exportInvoices(format);
    toast.success(`تم تصدير الفواتير بنجاح بتنسيق ${format}`);
  };

  const handleBulkDelete = () => {
    if (selectedInvoices.length === 0) {
      toast.error("الرجاء تحديد الفواتير المراد حذفها أولا");
      return;
    }
    
    deleteInvoices(selectedInvoices);
    toast.success("تم حذف الفواتير المحددة بنجاح");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setFilter({
      ...filter,
      query: e.target.value
    });
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <Layout>
      <div className="h-full w-full flex flex-col overflow-hidden">
        <Header title="الفواتير الصادرة" showBack={true}>
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleNewInvoice} 
              className="rtl"
              size="sm"
            >
              <Plus className="ml-2 h-4 w-4" />
              فاتورة جديدة
            </Button>
            <Button variant="outline" onClick={() => handleExport("pdf")} size="sm" className="hidden md:flex">
              <Download className="ml-2 h-4 w-4" />
              تصدير PDF
            </Button>
            <Button variant="outline" onClick={() => handleExport("excel")} size="sm" className="hidden md:flex">
              <Download className="ml-2 h-4 w-4" />
              تصدير Excel
            </Button>
          </div>
        </Header>

        <div className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="mb-6">
            <InvoiceStatCards statistics={statistics} isLoading={isLoading} />
          </div>

          <Card className="overflow-hidden">
            <CardHeader className="bg-white py-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle className="text-xl">قائمة الفواتير الصادرة</CardTitle>
                <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                  <div className="relative w-full md:w-[280px]">
                    <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="بحث في الفواتير..."
                      value={searchQuery}
                      onChange={handleSearch}
                      className="pr-8 w-full"
                    />
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" onClick={toggleFilters} className="w-full sm:w-auto">
                      <Filter className="ml-2 h-4 w-4" />
                      فلترة
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("/invoices/new")}
                      className="w-full sm:w-auto"
                    >
                      <FilePlus className="ml-2 h-4 w-4" />
                      فاتورة جديدة
                    </Button>
                  </div>
                </div>
              </div>
              
              {isFiltersOpen && (
                <InvoiceFilters 
                  filter={filter}
                  onFilterChange={setFilter}
                  onClose={toggleFilters}
                />
              )}

              {selectedInvoices.length > 0 && (
                <InvoicesActions 
                  selectedCount={selectedInvoices.length}
                  onExport={handleExport}
                  onDelete={handleBulkDelete}
                  onPrint={() => toast.info("جاري إعداد الطباعة...")}
                  onWhatsApp={() => toast.info("جاري إرسال الرسائل عبر واتساب...")}
                  onSelectAll={selectAllInvoices}
                  onUnselectAll={unselectAllInvoices}
                />
              )}
            </CardHeader>

            <CardContent className="p-0">
              <InvoicesTable
                invoices={invoices}
                isLoading={isLoading}
                selectedInvoices={selectedInvoices}
                onToggleSelection={toggleInvoiceSelection}
                onView={(id) => navigate(`/invoices/view/${id}`)}
                onEdit={(id) => navigate(`/invoices/edit/${id}`)}
                onDelete={(id) => {
                  deleteInvoices([id]);
                  toast.success("تم حذف الفاتورة بنجاح");
                }}
                onDuplicate={(id) => {
                  navigate(`/invoices/duplicate/${id}`);
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default OutgoingInvoicesPage;


import React from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { FilePlus, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSalesOrders } from "@/hooks/useSalesOrders";
import { SalesOrdersContent } from "@/components/sales-orders/SalesOrdersContent";

const SalesOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    salesOrderStats,
    filteredSalesOrders,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleProcessOrder,
    handleShipOrder,
    handleCompleteOrder,
  } = useSalesOrders();

  const handleCreateOrder = () => {
    toast.info("إنشاء أمر بيع جديد");
    // في التطبيق الحقيقي، سيتم توجيه المستخدم إلى صفحة إنشاء أمر بيع جديد
  };
  
  const handleExportOrders = () => {
    toast.info("جاري تصدير أوامر البيع");
    // في التطبيق الحقيقي، سيتم تصدير أوامر البيع كملف
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <Header title="أوامر البيع" showBack={true} onBackClick={handleBack}>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportOrders}>
            <Download size={16} className="ml-1" />
            تصدير
          </Button>
          <Button size="sm" onClick={handleCreateOrder}>
            <FilePlus size={16} className="ml-1" />
            أمر بيع جديد
          </Button>
        </div>
      </Header>

      <SalesOrdersContent
        salesOrderStats={salesOrderStats}
        filteredSalesOrders={filteredSalesOrders}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
        onProcessOrder={handleProcessOrder}
        onShipOrder={handleShipOrder}
        onCompleteOrder={handleCompleteOrder}
      />
    </div>
  );
};

export default SalesOrdersPage;

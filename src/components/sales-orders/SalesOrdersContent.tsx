
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesOrdersStats } from "./SalesOrdersStats";
import { SalesOrdersFilter } from "./SalesOrdersFilter";
import { SalesOrdersTable } from "./SalesOrdersTable";
import { toast } from "sonner";

interface SalesOrdersContentProps {
  salesOrderStats: Array<{
    label: string;
    value: number;
    color: string;
  }>;
  filteredSalesOrders: Array<{
    id: string;
    date: Date;
    customer: string;
    total: number;
    status: string;
    items: number;
    expectedDelivery: Date;
  }>;
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onProcessOrder: (id: string) => void;
  onShipOrder: (id: string) => void;
  onCompleteOrder: (id: string) => void;
}

export const SalesOrdersContent: React.FC<SalesOrdersContentProps> = ({
  salesOrderStats,
  filteredSalesOrders,
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onProcessOrder,
  onShipOrder,
  onCompleteOrder,
}) => {
  const handleViewOrder = (id: string) => {
    toast.info(`عرض أمر البيع ${id}`);
    // في التطبيق الحقيقي، سيتم توجيه المستخدم إلى صفحة تفاصيل أمر البيع
  };

  return (
    <main className="flex-1 overflow-hidden p-6">
      {/* إحصائيات أوامر البيع */}
      <SalesOrdersStats stats={salesOrderStats} />

      {/* فلترة وبحث */}
      <SalesOrdersFilter
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={onSearchChange}
        onStatusFilterChange={onStatusFilterChange}
      />

      {/* جدول أوامر البيع */}
      <Card className="flex-1 overflow-hidden shadow-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">
            قائمة أوامر البيع
          </CardTitle>
          <span className="text-sm text-gray-500">
            إجمالي النتائج: {filteredSalesOrders.length}
          </span>
        </CardHeader>
        <CardContent className="p-0">
          <SalesOrdersTable
            orders={filteredSalesOrders}
            onViewOrder={handleViewOrder}
            onProcessOrder={onProcessOrder}
            onShipOrder={onShipOrder}
            onCompleteOrder={onCompleteOrder}
          />
        </CardContent>
      </Card>
    </main>
  );
};

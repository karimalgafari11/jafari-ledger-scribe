
import React from "react";
import { DataGrid } from "@/components/inventory/DataGrid";
import { ActionDefinition } from "@/components/inventory/types";
import { Product } from "@/types/inventory";
import { ColumnManager } from "@/components/inventory/ColumnManager";

interface ProductGridSectionProps {
  products: Product[];
  displayColumns: any[];
  actions: ActionDefinition[];
  selectedProducts: string[];
  toggleProductSelection: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
  defaultColumns: any[];
  visibleColumns: string[];
  columnOrder: string[];
  toggleColumnVisibility: (columnId: string, visible: boolean) => void;
  updateColumnOrder: (newOrder: string[]) => void;
}

export const ProductGridSection: React.FC<ProductGridSectionProps> = ({
  products,
  displayColumns,
  actions,
  selectedProducts,
  toggleProductSelection,
  onSelectAll,
  defaultColumns,
  visibleColumns,
  columnOrder,
  toggleColumnVisibility,
  updateColumnOrder,
}) => {
  return (
    <>
      {/* إدارة الأعمدة */}
      <div className="flex justify-end">
        <ColumnManager 
          columns={defaultColumns}
          visibleColumns={visibleColumns}
          columnOrder={columnOrder}
          onVisibilityChange={toggleColumnVisibility}
          onOrderChange={updateColumnOrder}
        />
      </div>

      <DataGrid
        data={products}
        columns={displayColumns}
        actions={actions}
        selectable={true}
        selectedRows={selectedProducts}
        onToggleSelection={toggleProductSelection}
        onSelectAll={onSelectAll}
        idField="id"
        emptyMessage="لا توجد منتجات متاحة"
        className="rounded-md overflow-hidden"
      />
    </>
  );
};

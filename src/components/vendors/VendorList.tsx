
import React from "react";
import { DataGrid } from "@/components/inventory/DataGrid";
import { Eye, Edit, FileText, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ColumnDefinition, ActionDefinition } from "@/components/inventory/types";

interface VendorListProps {
  vendors: any[];
  selectedVendors: string[];
  onToggleSelection: (id: string) => void;
  onSelectAll: () => void;
  onViewVendor: (vendor: any) => void;
  onEditVendor: (vendor: any) => void;
  onViewTransactions: (vendor: any) => void;
  onDeleteVendor: (vendor: any) => void;
  searchTerm: string;
}

export const VendorList: React.FC<VendorListProps> = ({
  vendors,
  selectedVendors,
  onToggleSelection,
  onSelectAll,
  onViewVendor,
  onEditVendor,
  onViewTransactions,
  onDeleteVendor,
  searchTerm
}) => {
  // Define columns for the vendor data grid
  const columns: ColumnDefinition[] = [
    { id: 'name', header: 'اسم المورد', accessorKey: 'name', isVisible: true },
    { 
      id: 'status', 
      header: 'الحالة', 
      accessorKey: 'status', 
      isVisible: true,
      cell: (value: string) => (
        <Badge className={value === 'نشط' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-gray-100 text-gray-800 border-gray-300'}>
          {value}
        </Badge>
      )
    },
    { id: 'contactPerson', header: 'الشخص المسؤول', accessorKey: 'contactPerson', isVisible: true },
    { id: 'phone', header: 'رقم الهاتف', accessorKey: 'phone', isVisible: true },
    { id: 'email', header: 'البريد الإلكتروني', accessorKey: 'email', isVisible: true },
    { 
      id: 'balance', 
      header: 'الرصيد', 
      accessorKey: 'balance', 
      isVisible: true,
      cell: (value: number, row: any) => (
        <span className={value > 0 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
          {value.toLocaleString('ar-SA')} {row.currency}
        </span>
      )
    },
    { id: 'category', header: 'التصنيف', accessorKey: 'category', isVisible: true },
    { id: 'taxNumber', header: 'الرقم الضريبي', accessorKey: 'taxNumber', isVisible: true }
  ];

  // Define actions for the vendor data grid
  const actions: ActionDefinition[] = [
    { 
      label: "عرض تفاصيل",
      icon: <Eye className="text-blue-600" />, 
      onClick: (vendor: any) => onViewVendor(vendor),
      variant: "ghost" as const
    },
    { 
      label: "تعديل",
      icon: <Edit className="text-amber-600" />, 
      onClick: (vendor: any) => onEditVendor(vendor),
      variant: "ghost" as const
    },
    { 
      label: "المعاملات",
      icon: <FileText className="text-indigo-600" />, 
      onClick: (vendor: any) => onViewTransactions(vendor),
      variant: "ghost" as const
    },
    { 
      label: "حذف",
      icon: <Trash className="text-red-600" />, 
      onClick: (vendor: any) => onDeleteVendor(vendor),
      variant: "ghost" as const,
      condition: (vendor: any) => vendor.balance === 0
    }
  ];

  // Filter vendors based on search term
  const filteredVendors = vendors.filter(vendor => 
    searchTerm === '' || 
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.phone.includes(searchTerm)
  );

  return (
    <div className="rounded-md border flex-grow overflow-auto">
      <DataGrid
        data={filteredVendors}
        columns={columns}
        actions={actions}
        selectable={true}
        selectedRows={selectedVendors}
        onToggleSelection={onToggleSelection}
        onSelectAll={onSelectAll}
        emptyMessage="لا توجد بيانات موردين متاحة"
      />
      <div className="mt-4 text-sm text-muted-foreground">
        إجمالي الموردين: {filteredVendors.length}
      </div>
    </div>
  );
};

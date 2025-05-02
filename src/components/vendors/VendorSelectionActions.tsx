
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VendorSelectionActionsProps {
  selectedVendors: string[];
  onExportSelected: () => void;
  onDeleteSelected: () => void;
}

export const VendorSelectionActions: React.FC<VendorSelectionActionsProps> = ({
  selectedVendors,
  onExportSelected,
  onDeleteSelected
}) => {
  if (selectedVendors.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <Badge variant="secondary">تم اختيار {selectedVendors.length} مورد</Badge>
      <Button 
        variant="outline" 
        size="sm"
        onClick={onExportSelected}
      >
        تصدير المحدد
      </Button>
      <Button 
        variant="destructive" 
        size="sm"
        onClick={onDeleteSelected}
      >
        حذف المحدد
      </Button>
    </div>
  );
};

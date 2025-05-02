
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Upload, UserPlus } from "lucide-react";
import { toast } from "sonner";

interface VendorActionsProps {
  onExportData: () => void;
  onImportData: () => void;
  onAddNewVendor: () => void;
}

export const VendorActions: React.FC<VendorActionsProps> = ({
  onExportData,
  onImportData,
  onAddNewVendor
}) => {
  return (
    <div className="flex flex-wrap space-x-2 rtl:space-x-reverse gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2"
        onClick={onExportData}
      >
        <Download size={16} /> تصدير البيانات
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2"
        onClick={onImportData}
      >
        <Upload size={16} /> استيراد البيانات
      </Button>
      <Button 
        variant="default" 
        className="flex items-center gap-2"
        onClick={onAddNewVendor}
      >
        <UserPlus size={16} /> إضافة مورد جديد
      </Button>
    </div>
  );
};

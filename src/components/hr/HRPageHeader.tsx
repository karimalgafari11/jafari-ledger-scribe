
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface HRPageHeaderProps {
  title: string;
  description: string;
  onAddNew?: () => void;
  addButtonLabel?: string;
  showAddButton?: boolean;
}

const HRPageHeader: React.FC<HRPageHeaderProps> = ({
  title,
  description,
  onAddNew,
  addButtonLabel = "إضافة جديد",
  showAddButton = true
}) => {
  return (
    <div className="bg-white shadow-sm rounded-lg px-6 py-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-500 mt-1">{description}</p>
        </div>
        {showAddButton && onAddNew && (
          <Button onClick={onAddNew} className="self-start md:self-center">
            <Plus className="ml-2 h-4 w-4" />
            {addButtonLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default HRPageHeader;

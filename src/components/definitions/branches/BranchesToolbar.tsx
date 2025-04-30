
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";

interface BranchesToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddBranch: () => void;
}

export const BranchesToolbar = ({
  searchTerm,
  onSearchChange,
  onAddBranch,
}: BranchesToolbarProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
      <div className="relative w-full md:w-1/3">
        <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="بحث في الفروع..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pr-10"
        />
      </div>
      <Button onClick={onAddBranch} className="bg-primary hover:bg-primary/90">
        <Plus className="ml-2 h-4 w-4" /> إضافة فرع جديد
      </Button>
    </div>
  );
};

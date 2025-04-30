
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Filter } from "lucide-react";
import { Branch } from "@/types/definitions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WarehousesToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  branchFilter: string;
  onBranchFilterChange: (value: string) => void;
  branches: Branch[];
  onAddWarehouse: () => void;
}

export const WarehousesToolbar = ({
  searchTerm,
  onSearchChange,
  branchFilter,
  onBranchFilterChange,
  branches,
  onAddWarehouse,
}: WarehousesToolbarProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
      <div className="flex gap-2 w-full md:w-2/3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="بحث في المستودعات..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pr-10"
          />
        </div>
        
        <div className="w-1/3">
          <Select
            value={branchFilter}
            onValueChange={onBranchFilterChange}
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="الفرع" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كل الفروع</SelectItem>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button onClick={onAddWarehouse} className="bg-primary hover:bg-primary/90">
        <Plus className="ml-2 h-4 w-4" /> إضافة مستودع جديد
      </Button>
    </div>
  );
};

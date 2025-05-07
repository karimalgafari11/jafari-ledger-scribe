
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, X } from "lucide-react";

interface ItemTableHeaderProps {
  isSearching: boolean;
  searchTerm: string;
  toggleSearch: () => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsAddingItem: (isAdding: boolean) => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
}

export const ItemTableHeader: React.FC<ItemTableHeaderProps> = ({
  isSearching,
  searchTerm,
  toggleSearch,
  handleSearchChange,
  setIsAddingItem,
  isAddingItem,
  editingItemIndex
}) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold">الأصناف</h3>
      
      {isSearching ? (
        <div className="flex items-center gap-2 w-1/2">
          <Input
            type="text"
            placeholder="ابحث عن منتج..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-8"
            autoFocus
          />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSearch} 
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="space-x-2 rtl:space-x-reverse">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSearch}
            className="flex items-center gap-1"
            disabled={isAddingItem || editingItemIndex !== null}
          >
            <Search className="h-4 w-4" />
            بحث
          </Button>
          <Button
            size="sm"
            onClick={() => setIsAddingItem(true)}
            className="flex items-center gap-1"
            disabled={isAddingItem || editingItemIndex !== null}
          >
            <Plus className="h-4 w-4" />
            إضافة صنف
          </Button>
        </div>
      )}
    </div>
  );
};

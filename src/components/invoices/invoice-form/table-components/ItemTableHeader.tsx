
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Plus } from "lucide-react";

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
    <div className="flex justify-between items-center mb-1">
      <h3 className="text-base font-bold">الأصناف</h3>
      <div className="flex gap-1">
        {isSearching ? (
          <div className="relative w-64">
            <Input
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="ابحث عن صنف..."
              className="h-8 text-sm"
              autoFocus
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-1 top-1/2 transform -translate-y-1/2 h-5 w-5"
              onClick={toggleSearch}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <>
            <Button 
              variant="outline" 
              size="xs" 
              onClick={toggleSearch}
              className="h-8 text-sm flex items-center"
            >
              <Search className="mr-1 h-4 w-4" />
              البحث
            </Button>
          </>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsAddingItem(true)}
          className="h-8 text-sm"
          disabled={isAddingItem || editingItemIndex !== null}
        >
          <Plus className="ml-1 h-4 w-4" />
          إضافة صنف
        </Button>
      </div>
    </div>
  );
};

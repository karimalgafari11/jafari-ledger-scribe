
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
    <div className="flex justify-between items-center mb-2 print-hide">
      <div className="flex-1 flex items-center space-x-2 rtl:space-x-reverse">
        <Button
          type="button"
          size="sm"
          disabled={isAddingItem || editingItemIndex !== null}
          onClick={() => setIsAddingItem(true)}
          className="text-xs"
        >
          <Plus className="h-4 w-4 ml-1" />
          إضافة صنف
        </Button>

        {isSearching ? (
          <div className="relative flex-1 max-w-sm">
            <Input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pr-8 text-xs h-8"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-0 left-0 h-8 w-8"
              onClick={toggleSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={toggleSearch} className="text-xs">
            <Search className="h-4 w-4 ml-1" />
            بحث سريع
          </Button>
        )}
      </div>
      
      <div>
        <span className="text-xs text-muted-foreground">
          {isAddingItem 
            ? "جارٍ إضافة صنف جديد..." 
            : editingItemIndex !== null 
            ? "جارٍ تعديل الصنف..." 
            : `عدد الأصناف: ${0}`
          }
        </span>
      </div>
    </div>
  );
};

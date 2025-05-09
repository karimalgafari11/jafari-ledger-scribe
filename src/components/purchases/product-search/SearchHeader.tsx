
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Grid3X3, List } from "lucide-react";

interface SearchHeaderProps {
  searchTerm: string;
  setSearchTerm: (query: string) => void;
  viewMode: "grid" | "table";
  setViewMode: (viewMode: "grid" | "table") => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
  searchInputRef
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-4 border-b">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            type="search"
            placeholder="ابحث بالاسم أو رقم الصنف..."
            className="pr-10 pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
            autoFocus
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex border rounded-md">
          <Button
            variant={viewMode === 'grid' ? "default" : "ghost"}
            size="icon"
            className="rounded-l-none rounded-r-md"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'table' ? "default" : "ghost"}
            size="icon"
            className="rounded-r-none rounded-l-md"
            onClick={() => setViewMode('table')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

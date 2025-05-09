
import React from "react";
import { Search, X, Grid3X3, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
  searchInputRef
}) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Search className="h-5 w-5 text-gray-400" />
      <Input
        type="text"
        placeholder="ابحث عن منتج بالاسم أو الرمز أو الباركود..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow"
        autoFocus
        ref={searchInputRef}
      />
      {searchTerm && (
        <Button variant="ghost" size="icon" onClick={() => setSearchTerm("")}>
          <X className="h-4 w-4" />
        </Button>
      )}
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => setViewMode("grid")}
        className={viewMode === "grid" ? "bg-blue-100" : ""}
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => setViewMode("table")}
        className={viewMode === "table" ? "bg-blue-100" : ""}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
};


import React from "react";
import { Input } from "@/components/ui/input";
import { SearchResults } from "./SearchResults";
import { Product } from "@/types/inventory";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ProductSearchInputProps {
  searchTerm: string;
  searchResults: Product[];
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (product: any) => void;
  onClose: () => void;
}

export const ProductSearchInput: React.FC<ProductSearchInputProps> = ({
  searchTerm,
  searchResults,
  onSearchChange,
  onSelect,
  onClose
}) => {
  return (
    <div className="mb-2">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="ابحث عن صنف..."
          value={searchTerm}
          onChange={onSearchChange}
          className="mb-1"
          autoFocus
        />
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      {searchResults.length > 0 && (
        <SearchResults results={searchResults} onSelect={onSelect} />
      )}
    </div>
  );
};

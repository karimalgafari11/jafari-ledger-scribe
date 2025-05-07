
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/types/inventory";

interface SearchResultsProps {
  results: Product[];
  onSelect: (product: Product) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelect }) => {
  return (
    <ScrollArea className="search-results max-h-60">
      {results.map((product) => (
        <Button
          key={product.id}
          variant="ghost"
          className="w-full justify-between text-right px-4 py-2 rounded-none border-b hover:bg-blue-50"
          onClick={() => onSelect(product)}
        >
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{product.code}</span>
          <div className="text-right">
            <div>{product.name}</div>
            <div className="text-sm font-bold">{product.price.toFixed(2)} ر.س</div>
          </div>
        </Button>
      ))}
    </ScrollArea>
  );
};

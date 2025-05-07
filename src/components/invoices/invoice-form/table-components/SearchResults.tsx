
import React from "react";
import { Product } from "@/types/inventory";

interface SearchResultsProps {
  results: Product[];
  onSelect: (product: Product) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelect }) => {
  return (
    <div className="search-results mb-2 z-50 print-hide">
      {results.map(product => (
        <div
          key={product.id}
          className="p-2 hover:bg-blue-50 cursor-pointer border-b border-gray-200 flex justify-between"
          onClick={() => onSelect(product)}
        >
          <div>
            <div className="font-medium">{product.name}</div>
            <div className="text-xs text-gray-500">{product.code}</div>
          </div>
          <div className="text-right">
            <div className="font-bold">{product.price} ر.س</div>
            <div className="text-xs text-gray-500">
              {product.inStock ? `المخزون: ${product.quantity}` : 'غير متوفر'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

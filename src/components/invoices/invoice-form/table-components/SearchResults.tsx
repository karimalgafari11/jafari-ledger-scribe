
import React from "react";

interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
}

interface SearchResultsProps {
  results: Product[];
  onSelect: (product: Product) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelect }) => {
  if (results.length === 0) return null;
  
  return (
    <div className="search-results">
      {results.map((product) => (
        <div 
          key={product.id} 
          className="p-2 hover:bg-gray-100 cursor-pointer text-sm border-b"
          onClick={() => onSelect(product)}
        >
          <div className="font-semibold">{product.name}</div>
          <div className="text-xs text-gray-500">{product.code} - {product.price} ر.س</div>
        </div>
      ))}
    </div>
  );
};

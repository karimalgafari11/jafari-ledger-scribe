
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface ItemSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  value?: string;
  autoFocus?: boolean;
}

export const ItemSearch: React.FC<ItemSearchProps> = ({
  onSearch,
  placeholder = "البحث عن المنتجات...",
  value = "",
  autoFocus = false
}) => {
  const [searchQuery, setSearchQuery] = useState(value);

  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch(searchQuery);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full space-x-2 rtl:space-x-reverse">
      <div className="flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          autoFocus={autoFocus}
          className="w-full"
        />
      </div>
      <Button type="submit" variant="outline" size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};


import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface JournalSearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export const JournalSearch: React.FC<JournalSearchProps> = ({
  searchTerm,
  onSearch,
}) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [isFocused, setIsFocused] = useState(false);

  // استخدام useEffect لتنفيذ البحث بعد توقف المستخدم عن الكتابة
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== searchTerm) {
        onSearch(localSearch);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, onSearch, searchTerm]);

  const handleClear = () => {
    setLocalSearch("");
    onSearch("");
  };

  return (
    <div className={`relative flex-1 max-w-md transition-all ${isFocused ? 'ring-2 ring-primary/20 rounded-md' : ''}`}>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
        <Search className="h-4 w-4" />
      </div>
      <Input
        type="text"
        placeholder="بحث في القيود..."
        className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-200 dark:border-gray-700"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {localSearch && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

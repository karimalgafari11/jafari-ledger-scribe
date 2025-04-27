
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface JournalSearchProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

export const JournalSearch: React.FC<JournalSearchProps> = ({
  searchTerm,
  onSearch,
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative flex-grow">
      <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        placeholder="بحث عن رقم القيد، اسم الحساب، المبلغ، أو الوصف..."
        value={searchTerm}
        onChange={handleSearch}
        className="pl-10 pr-10"
      />
    </div>
  );
};

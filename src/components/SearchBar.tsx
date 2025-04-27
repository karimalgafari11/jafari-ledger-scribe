
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBar({ placeholder = "بحث...", onChange }: SearchBarProps) {
  return (
    <div className="relative rtl">
      <Input
        className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200"
        placeholder={placeholder}
        onChange={onChange}
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-1 top-1/2 -translate-y-1/2"
      >
        <Search 
          className="text-gray-500"
          size={20}
        />
      </Button>
    </div>
  );
}

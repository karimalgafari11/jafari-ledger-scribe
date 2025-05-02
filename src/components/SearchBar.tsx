
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export function SearchBar({ 
  placeholder = "بحث...", 
  onChange,
  className = ""
}: SearchBarProps) {
  return (
    <div className="relative rtl">
      <Input
        className={`pl-6 pr-1 w-full rounded-sm border border-gray-200 ${className}`}
        placeholder={placeholder}
        onChange={onChange}
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0.5 top-1/2 -translate-y-1/2 h-4 w-4 p-0"
      >
        <Search 
          className="text-gray-400"
          size={12}
        />
      </Button>
    </div>
  );
}


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
        className={`pl-8 pr-2 w-full rounded-md border border-gray-200 ${className}`}
        placeholder={placeholder}
        onChange={onChange}
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-1 top-1/2 -translate-y-1/2 h-5 w-5 p-0"
      >
        <Search 
          className="text-gray-500"
          size={14}
        />
      </Button>
    </div>
  );
}


import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditableCellProps {
  value: string;
  active: boolean;
  onActivate: () => void;
  onChange: (value: string) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  type?: "text" | "number";
  className?: string;
  placeholder?: string;
}

export const EditableCell: React.FC<EditableCellProps> = ({ 
  value, 
  active, 
  onActivate, 
  onChange, 
  inputRef,
  type = "text",
  className = "",
  placeholder = ""
}) => {
  // Focus the input when active state changes
  useEffect(() => {
    if (active && inputRef && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 10);
    }
  }, [active, inputRef]);

  if (active) {
    return (
      <Input
        ref={inputRef}
        type={type}
        className={`w-full border-none focus:ring-0 ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  return (
    <div 
      className={`cursor-pointer w-full min-h-[24px] flex items-center ${className}`}
      onClick={onActivate}
    >
      {value || (placeholder && <span className="text-gray-400">{placeholder}</span>)}
    </div>
  );
};

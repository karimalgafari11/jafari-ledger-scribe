
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditableCellProps {
  active: boolean;
  value: string | number;
  type?: "text" | "number";
  field: string;
  index: number;
  inputRef: React.RefObject<HTMLInputElement>;
  onChange: (index: number, field: string, value: any) => void;
  onBlur: () => void;
  min?: string;
  step?: string;
  discountType?: 'percentage' | 'fixed';
  onDiscountTypeChange?: (value: 'percentage' | 'fixed') => void;
  showPercentageSymbol?: boolean;
}

export const EditableCell: React.FC<EditableCellProps> = ({ 
  active, 
  value, 
  type = "text",
  field,
  index,
  inputRef,
  onChange,
  onBlur,
  min,
  step,
  discountType,
  onDiscountTypeChange,
  showPercentageSymbol
}) => {
  // Focus the input when active state changes
  useEffect(() => {
    if (active && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 10);
    }
  }, [active, inputRef]);

  if (!active) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from bubbling up to table
  };

  if (field === "discount" && discountType) {
    return (
      <div className="flex items-center editable-cell" onClick={handleClick}>
        <Input 
          ref={inputRef}
          autoFocus={true}
          type="number"
          min={min || "0"}
          step={step || "0.01"}
          className="w-3/4 text-center border-none focus:ring-0"
          value={value}
          onChange={(e) => onChange(index, field, Number(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter') {
              e.preventDefault(); // Prevent default behavior
              onBlur();
            }
          }}
          onClick={(e) => e.stopPropagation()}
        />
        <Select 
          value={discountType}
          onValueChange={(value) => onDiscountTypeChange && onDiscountTypeChange(value as 'percentage' | 'fixed')}
        >
          <SelectTrigger className="w-1/4 border-none focus:ring-0 p-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="percentage">%</SelectItem>
            <SelectItem value="fixed">ر.س</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (field === "tax" && showPercentageSymbol) {
    return (
      <div className="flex items-center editable-cell" onClick={handleClick}>
        <Input 
          ref={inputRef}
          autoFocus={true}
          type="number"
          min={min || "0"}
          step={step || "0.01"}
          className="w-full text-center border-none focus:ring-0"
          value={value}
          onChange={(e) => onChange(index, field, Number(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter') {
              e.preventDefault();
              onBlur();
            }
          }}
          onClick={(e) => e.stopPropagation()}
        />
        <span className="ml-1">%</span>
      </div>
    );
  }
  
  return (
    <Input 
      ref={inputRef}
      autoFocus={true}
      type={type}
      min={min}
      step={step}
      className="w-full text-center border-none focus:ring-0 editable-cell"
      value={value}
      onChange={(e) => {
        const newValue = type === "number" ? Number(e.target.value) : e.target.value;
        onChange(index, field, newValue);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape' || e.key === 'Enter') {
          e.preventDefault();
          onBlur();
        }
      }}
      onClick={(e) => e.stopPropagation()}
    />
  );
};

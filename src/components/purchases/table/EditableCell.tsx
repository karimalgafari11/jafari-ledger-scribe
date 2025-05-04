
import React from "react";
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
  if (!active) return null;

  if (field === "discount" && discountType) {
    return (
      <div className="flex items-center">
        <Input 
          ref={inputRef}
          autoFocus={true}
          type="number"
          min={min || "0"}
          step={step || "0.01"}
          className="w-3/4 text-center border-none focus:ring-0"
          value={value}
          onChange={(e) => onChange(index, field, Number(e.target.value))}
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
      <div className="flex items-center">
        <Input 
          ref={inputRef}
          autoFocus={true}
          type="number"
          min={min || "0"}
          step={step || "0.01"}
          className="w-full text-center border-none focus:ring-0"
          value={value}
          onChange={(e) => onChange(index, field, Number(e.target.value))}
          onBlur={onBlur}
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
      className="w-full text-center border-none focus:ring-0"
      value={value}
      onChange={(e) => {
        const newValue = type === "number" ? Number(e.target.value) : e.target.value;
        onChange(index, field, newValue);
      }}
      onBlur={onBlur}
    />
  );
};

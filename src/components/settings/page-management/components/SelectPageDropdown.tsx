
import React from 'react';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { type PageItem } from '@/hooks/usePageManagement';

interface SelectPageDropdownProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { id: string, label: string, path?: string, depth: number }[];
  disabledValue?: string;
  className?: string;
}

const SelectPageDropdown = ({
  label,
  value,
  onValueChange,
  options,
  disabledValue,
  className = "grid grid-cols-4 items-center gap-4"
}: SelectPageDropdownProps) => {
  return (
    <div className={className}>
      <Label htmlFor={label.toLowerCase()} className="text-right col-span-1">
        {label}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="col-span-3">
          <SelectValue placeholder={`اختر ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={option.id}
                value={option.id}
                disabled={option.id === disabledValue}
              >
                {option.depth > 0 ? '└'.repeat(option.depth) + ' ' : ''}
                {option.label}
                {option.path ? ` (${option.path})` : ''}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectPageDropdown;

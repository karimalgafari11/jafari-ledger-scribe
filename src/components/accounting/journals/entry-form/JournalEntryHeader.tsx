
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface JournalEntryHeaderProps {
  entryNumber: string;
  entryDate: string;
  status: string;
  onEntryNumberChange: (value: string) => void;
  onEntryDateChange: (value: string) => void;
  isEditable: boolean;
  isCreateMode: boolean;
}

export const JournalEntryHeader: React.FC<JournalEntryHeaderProps> = ({
  entryNumber,
  entryDate,
  status,
  onEntryNumberChange,
  onEntryDateChange,
  isEditable,
  isCreateMode,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label htmlFor="entryNumber">رقم القيد</Label>
        <Input
          id="entryNumber"
          value={entryNumber}
          onChange={(e) => onEntryNumberChange(e.target.value)}
          disabled={!isCreateMode || !isEditable}
        />
      </div>
      
      <div>
        <Label htmlFor="entryDate">تاريخ القيد</Label>
        <Input
          id="entryDate"
          type="date"
          value={entryDate}
          onChange={(e) => onEntryDateChange(e.target.value)}
          disabled={!isEditable}
        />
      </div>
      
      <div>
        <Label htmlFor="status">الحالة</Label>
        <Input
          id="status"
          value={status === 'draft' ? 'مسودة' : status === 'approved' ? 'معتمد' : 'ملغي'}
          disabled
        />
      </div>
    </div>
  );
};

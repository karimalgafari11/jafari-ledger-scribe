
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JournalEntryHeader } from "./JournalEntryHeader";
import { JournalEntryLines } from "./JournalEntryLines";
import { JournalStatus, JournalEntryLine } from "@/types/journal";

interface JournalEntryFormProps {
  entryNumber: string;
  entryDate: string;
  description: string;
  status: JournalStatus;
  lines: Omit<JournalEntryLine, "id">[];
  totalDebit: number;
  totalCredit: number;
  isBalanced: boolean;
  isEditable: boolean;
  isCreateMode: boolean;
  onEntryNumberChange: (value: string) => void;
  onEntryDateChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onLineChange: (index: number, field: keyof Omit<JournalEntryLine, "id">, value: string | number) => void;
  onAddLine: () => void;
  onRemoveLine: (index: number) => void;
}

export const JournalEntryForm: React.FC<JournalEntryFormProps> = ({
  entryNumber,
  entryDate,
  description,
  status,
  lines,
  totalDebit,
  totalCredit,
  isBalanced,
  isEditable,
  isCreateMode,
  onEntryNumberChange,
  onEntryDateChange,
  onDescriptionChange,
  onLineChange,
  onAddLine,
  onRemoveLine,
}) => {
  return (
    <div className="space-y-6">
      <JournalEntryHeader
        entryNumber={entryNumber}
        entryDate={entryDate}
        status={status}
        onEntryNumberChange={onEntryNumberChange}
        onEntryDateChange={onEntryDateChange}
        isEditable={isEditable}
        isCreateMode={isCreateMode}
      />
      
      <div>
        <Label htmlFor="description">الوصف العام</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          disabled={!isEditable}
          placeholder="أدخل وصفاً عاماً للقيد"
        />
      </div>
      
      <JournalEntryLines
        lines={lines}
        onLineChange={onLineChange}
        onAddLine={onAddLine}
        onRemoveLine={onRemoveLine}
        isEditable={isEditable}
        totalDebit={totalDebit}
        totalCredit={totalCredit}
        isBalanced={isBalanced}
      />
    </div>
  );
};

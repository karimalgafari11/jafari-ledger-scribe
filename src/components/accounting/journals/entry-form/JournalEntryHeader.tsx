
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JournalStatus } from "@/types/journal";
import { JournalStatusBadge } from "../JournalStatusBadge";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";

interface JournalEntryHeaderProps {
  entryNumber: string;
  entryDate: string;
  status: JournalStatus;
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
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onEntryDateChange(date.toISOString().split('T')[0]);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h3 className="text-xl font-semibold">
          {isCreateMode ? "إنشاء قيد جديد" : "تعديل القيد"}
        </h3>
        {!isCreateMode && <JournalStatusBadge status={status} size="lg" />}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="entryNumber" className="text-sm font-medium">
            رقم القيد
          </Label>
          <Input
            id="entryNumber"
            value={entryNumber}
            onChange={(e) => onEntryNumberChange(e.target.value)}
            disabled={!isEditable}
            className="w-full"
            placeholder="رقم القيد"
            dir="rtl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="entryDate" className="text-sm font-medium">
            التاريخ
          </Label>
          <div className="flex">
            <Popover>
              <PopoverTrigger asChild disabled={!isEditable}>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-right font-normal",
                    !entryDate && "text-muted-foreground"
                  )}
                  disabled={!isEditable}
                >
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {entryDate ? (
                    format(new Date(entryDate), "dd MMMM yyyy", { locale: arSA })
                  ) : (
                    <span>اختر تاريخ</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={entryDate ? new Date(entryDate) : undefined}
                  onSelect={handleDateSelect}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

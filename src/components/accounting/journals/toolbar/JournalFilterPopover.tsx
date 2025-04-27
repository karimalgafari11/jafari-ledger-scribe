
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { JournalStatus } from "@/types/journal";

interface JournalFilterPopoverProps {
  dateRange: {from?: Date; to?: Date};
  status: JournalStatus | "";
  user: string;
  period: "day" | "week" | "month" | "";
  onApplyFilters: (
    dateRange: {from?: Date; to?: Date},
    status: JournalStatus | "",
    user: string,
    period: "day" | "week" | "month" | ""
  ) => void;
  onResetFilters: () => void;
}

export const JournalFilterPopover: React.FC<JournalFilterPopoverProps> = ({
  dateRange,
  status,
  user,
  period,
  onApplyFilters,
  onResetFilters,
}) => {
  const [localDateRange, setLocalDateRange] = React.useState(dateRange);
  const [localStatus, setLocalStatus] = React.useState(status);
  const [localUser, setLocalUser] = React.useState(user);
  const [localPeriod, setLocalPeriod] = React.useState(period);

  const handleApply = () => {
    onApplyFilters(localDateRange, localStatus, localUser, localPeriod);
  };

  const handleReset = () => {
    setLocalDateRange({});
    setLocalStatus("");
    setLocalUser("");
    setLocalPeriod("");
    onResetFilters();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="min-w-[120px]">
          <Filter className="ml-1 h-4 w-4" /> فلترة
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-4" align="end">
        <h3 className="text-lg font-medium mb-4">خيارات الفلترة</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>تاريخ القيد</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">من</Label>
                <Calendar
                  mode="single"
                  selected={localDateRange.from}
                  onSelect={(date) => setLocalDateRange(prev => ({ ...prev, from: date || undefined }))}
                  className="border rounded-md p-2"
                />
              </div>
              <div>
                <Label className="text-xs">إلى</Label>
                <Calendar
                  mode="single"
                  selected={localDateRange.to}
                  onSelect={(date) => setLocalDateRange(prev => ({ ...prev, to: date || undefined }))}
                  className="border rounded-md p-2"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>حالة القيد</Label>
            <select 
              className="w-full p-2 border rounded-md"
              value={localStatus}
              onChange={(e) => setLocalStatus(e.target.value as JournalStatus | "")}
            >
              <option value="">الكل</option>
              <option value="draft">مسودة</option>
              <option value="approved">معتمد</option>
              <option value="canceled">ملغي</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>المستخدم</Label>
            <select 
              className="w-full p-2 border rounded-md"
              value={localUser}
              onChange={(e) => setLocalUser(e.target.value)}
            >
              <option value="">الكل</option>
              <option value="أحمد محمد">أحمد محمد</option>
              <option value="سارة أحمد">سارة أحمد</option>
              <option value="محمد علي">محمد علي</option>
              <option value="عمر خالد">عمر خالد</option>
              <option value="ليلى محمد">ليلى محمد</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>الفترة الزمنية</Label>
            <select 
              className="w-full p-2 border rounded-md"
              value={localPeriod}
              onChange={(e) => setLocalPeriod(e.target.value as "day" | "week" | "month" | "")}
            >
              <option value="">الكل</option>
              <option value="day">اليوم</option>
              <option value="week">هذا الأسبوع</option>
              <option value="month">هذا الشهر</option>
            </select>
          </div>

          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={handleReset}>إعادة تعيين</Button>
            <Button onClick={handleApply}>تطبيق</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};


import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { JournalStatus } from "@/types/journal";
import { Calendar as CalendarIcon, Filter, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";

interface JournalFilterPopoverProps {
  dateRange: { from?: Date; to?: Date };
  status: JournalStatus | "";
  user: string;
  period: "day" | "week" | "month" | "";
  onApplyFilters: (
    dateRange: { from?: Date; to?: Date },
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
  const [localDateRange, setLocalDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>(dateRange);
  const [localStatus, setLocalStatus] = useState<JournalStatus | "">(status);
  const [localUser, setLocalUser] = useState(user);
  const [localPeriod, setLocalPeriod] = useState<"day" | "week" | "month" | "">(
    period
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    onApplyFilters(localDateRange, localStatus, localUser, localPeriod);
    setIsOpen(false);
  };

  const handleReset = () => {
    setLocalDateRange({});
    setLocalStatus("");
    setLocalUser("");
    setLocalPeriod("");
    onResetFilters();
    setIsOpen(false);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setLocalDateRange((prev) => {
      if (!prev.from) {
        return { from: date, to: undefined };
      } else if (prev.from && !prev.to && date >= prev.from) {
        return { from: prev.from, to: date };
      } else {
        return { from: date, to: undefined };
      }
    });
  };

  // حساب عدد الفلاتر النشطة
  const activeFiltersCount =
    (localDateRange.from || localDateRange.to ? 1 : 0) +
    (localStatus ? 1 : 0) +
    (localUser ? 1 : 0) +
    (localPeriod ? 1 : 0);

  // خيارات الفترة
  const periodOptions = [
    { value: "", label: "بدون تحديد" },
    { value: "day", label: "اليوم" },
    { value: "week", label: "هذا الأسبوع" },
    { value: "month", label: "هذا الشهر" },
  ];

  // خيارات الحالة
  const statusOptions = [
    { value: "", label: "جميع الحالات" },
    { value: "draft", label: "مسودة" },
    { value: "pending", label: "معلق" },
    { value: "approved", label: "معتمد" },
    { value: "canceled", label: "ملغي" },
  ];

  // قائمة المستخدمين (يمكن استبدالها بقائمة فعلية)
  const users = [
    { value: "", label: "جميع المستخدمين" },
    { value: "admin", label: "مدير النظام" },
    { value: "accountant", label: "المحاسب" },
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="relative gap-1"
          onClick={() => setIsOpen(true)}
        >
          <Filter className="h-4 w-4" />
          <span>تصفية</span>
          {activeFiltersCount > 0 && (
            <span className="absolute -top-2 -left-2 flex items-center justify-center bg-primary text-primary-foreground text-xs h-5 w-5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-4" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="font-medium">خيارات التصفية</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-8 text-xs gap-1 hover:bg-transparent hover:text-red-500"
            >
              <X className="h-3 w-3" />
              إعادة تعيين
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium mb-1">الفترة الزمنية</h4>
            <div className="flex flex-col gap-2">
              <Select
                value={localPeriod}
                onValueChange={(value) => 
                  setLocalPeriod(value as "day" | "week" | "month" | "")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر الفترة" />
                </SelectTrigger>
                <SelectContent>
                  {periodOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <span className="text-xs text-gray-500">من تاريخ</span>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right font-normal h-10"
                    onClick={() => {}}
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {localDateRange.from ? (
                      format(localDateRange.from, "PP", { locale: arSA })
                    ) : (
                      <span className="text-gray-400">اختر التاريخ</span>
                    )}
                  </Button>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-gray-500">إلى تاريخ</span>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right font-normal h-10"
                    onClick={() => {}}
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {localDateRange.to ? (
                      format(localDateRange.to, "PP", { locale: arSA })
                    ) : (
                      <span className="text-gray-400">اختر التاريخ</span>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded border mb-2">
                <Calendar
                  mode="range"
                  selected={localDateRange}
                  onSelect={(range) => {
                    if (range) {
                      setLocalDateRange(range);
                    }
                  }}
                  initialFocus
                  className="pointer-events-auto"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium mb-1">حالة القيد</h4>
            <Select
              value={localStatus}
              onValueChange={(value) => setLocalStatus(value as JournalStatus | "")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر الحالة" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium mb-1">المستخدم</h4>
            <Select
              value={localUser}
              onValueChange={(value) => setLocalUser(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر المستخدم" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.value} value={user.value}>
                    {user.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleApply}>تطبيق الفلاتر</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

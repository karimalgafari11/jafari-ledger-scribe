
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { InvoiceFilter } from "@/hooks/invoices/useOutgoingInvoices";
import { X, CalendarDays } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface InvoiceFiltersProps {
  filter: InvoiceFilter;
  onFilterChange: (filter: InvoiceFilter) => void;
  onClose: () => void;
}

export const InvoiceFilters: React.FC<InvoiceFiltersProps> = ({
  filter,
  onFilterChange,
  onClose,
}) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    filter.dateRange
  );

  const handleStatusChange = (value: string) => {
    onFilterChange({
      ...filter,
      status: value as "all" | "paid" | "pending" | "overdue" | "draft",
    });
  };

  const handlePaymentMethodChange = (value: string) => {
    onFilterChange({
      ...filter,
      paymentMethod: value === "all" ? "all" : (value as "cash" | "credit"),
    });
  };

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filter,
      customer: e.target.value,
    });
  };

  const handleMinAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    onFilterChange({
      ...filter,
      minAmount: value,
    });
  };

  const handleMaxAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    onFilterChange({
      ...filter,
      maxAmount: value,
    });
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    onFilterChange({
      ...filter,
      dateRange: range,
    });
  };

  const handleClearFilters = () => {
    onFilterChange({
      status: "all",
      dateRange: undefined,
      customer: "",
      paymentMethod: undefined,
      minAmount: undefined,
      maxAmount: undefined,
      query: filter.query, // نحتفظ بنص البحث الحالي
    });
    setDateRange(undefined);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md mt-2 border">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">تصفية الفواتير</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium">حالة الفاتورة</label>
          <Select
            value={filter.status}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="paid">مدفوعة</SelectItem>
              <SelectItem value="pending">قيد الانتظار</SelectItem>
              <SelectItem value="overdue">متأخرة</SelectItem>
              <SelectItem value="draft">مسودة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">الفترة الزمنية</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-right"
              >
                <CalendarDays className="ml-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "yyyy/MM/dd", { locale: ar })} -{" "}
                      {format(dateRange.to, "yyyy/MM/dd", { locale: ar })}
                    </>
                  ) : (
                    format(dateRange.from, "yyyy/MM/dd", { locale: ar })
                  )
                ) : (
                  "اختر التاريخ"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={handleDateRangeChange}
                locale={ar}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">طريقة الدفع</label>
          <Select
            value={filter.paymentMethod || "all"}
            onValueChange={handlePaymentMethodChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="طريقة الدفع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="cash">نقدي</SelectItem>
              <SelectItem value="credit">آجل</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">العميل</label>
          <Input
            value={filter.customer}
            onChange={handleCustomerChange}
            placeholder="اسم العميل"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">المبلغ الأدنى</label>
          <Input
            type="number"
            value={filter.minAmount?.toString() || ""}
            onChange={handleMinAmountChange}
            placeholder="من"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">المبلغ الأقصى</label>
          <Input
            type="number"
            value={filter.maxAmount?.toString() || ""}
            onChange={handleMaxAmountChange}
            placeholder="إلى"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant="ghost" className="ml-2" onClick={handleClearFilters}>
          مسح الكل
        </Button>
        <Button onClick={onClose}>تطبيق</Button>
      </div>
    </div>
  );
};

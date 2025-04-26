
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterPopoverProps {
  activeCategory: string;
  onFilterChange: (value: string) => void;
}

export function FilterPopover({ activeCategory, onFilterChange }: FilterPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2"
          >
            <path d="M4 12h8" />
            <path d="M4 18V6" />
            <path d="M12 6v12" />
            <path d="M16 12h4" />
            <path d="M16 6v12" />
          </svg>
          تصفية
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 rtl">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">الفئة</h4>
            <Select onValueChange={onFilterChange} defaultValue={activeCategory}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع التقارير</SelectItem>
                <SelectItem value="favorites">المفضلة</SelectItem>
                <SelectItem value="sales">المبيعات</SelectItem>
                <SelectItem value="inventory">المخزون</SelectItem>
                <SelectItem value="financial">المالية</SelectItem>
                <SelectItem value="inventory-control">التحكم بالمخزون</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

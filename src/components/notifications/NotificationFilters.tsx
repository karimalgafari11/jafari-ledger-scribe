
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

interface NotificationFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priorityFilter: string;
  setPriorityFilter: (priority: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  readFilter: string;
  setReadFilter: (read: string) => void;
  onClearFilters: () => void;
}

const NotificationFilters = ({
  searchQuery,
  setSearchQuery,
  priorityFilter,
  setPriorityFilter,
  categoryFilter,
  setCategoryFilter,
  readFilter,
  setReadFilter,
  onClearFilters,
}: NotificationFiltersProps) => {
  const hasActiveFilters = priorityFilter !== 'all' || categoryFilter !== 'all' || readFilter !== 'all' || searchQuery;
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث في الإشعارات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 w-full"
          />
        </div>
        <Button variant="outline" size="icon" className="flex-shrink-0">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[150px]">
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="الأولوية" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>الأولوية</SelectLabel>
                <SelectItem value="all">جميع الأولويات</SelectItem>
                <SelectItem value="critical">حرجة</SelectItem>
                <SelectItem value="high">عالية</SelectItem>
                <SelectItem value="medium">متوسطة</SelectItem>
                <SelectItem value="low">منخفضة</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1 min-w-[150px]">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="الفئة" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>الفئة</SelectLabel>
                <SelectItem value="all">جميع الفئات</SelectItem>
                <SelectItem value="inventory">المخزون</SelectItem>
                <SelectItem value="invoices">الفواتير</SelectItem>
                <SelectItem value="expenses">المصروفات</SelectItem>
                <SelectItem value="customer">العملاء</SelectItem>
                <SelectItem value="system">النظام</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1 min-w-[150px]">
          <Select value={readFilter} onValueChange={setReadFilter}>
            <SelectTrigger>
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>الحالة</SelectLabel>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="unread">غير مقروءة</SelectItem>
                <SelectItem value="read">مقروءة</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {hasActiveFilters && (
          <Button variant="ghost" onClick={onClearFilters} className="flex-shrink-0">
            مسح الفلاتر
          </Button>
        )}
      </div>
    </div>
  );
};

export default NotificationFilters;

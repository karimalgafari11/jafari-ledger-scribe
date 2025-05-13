
import React from "react";
import { Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const DashboardHeader: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
      <h2 className="text-2xl font-bold mb-2 lg:mb-0">لوحة التحكم</h2>
      <div className="flex flex-wrap gap-2">
        <Select defaultValue="week">
          <SelectTrigger className="w-[180px]">
            <Calendar className="ml-2 h-4 w-4" />
            <SelectValue placeholder="اختر الفترة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">آخر 7 أيام</SelectItem>
            <SelectItem value="month">آخر 30 يوم</SelectItem>
            <SelectItem value="quarter">آخر 90 يوم</SelectItem>
            <SelectItem value="year">هذا العام</SelectItem>
          </SelectContent>
        </Select>
        <Button className="flex items-center">
          <RefreshCw className="ml-2 h-4 w-4" />
          تحديث
        </Button>
      </div>
    </div>
  );
};

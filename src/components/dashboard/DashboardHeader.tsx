
import React from 'react';

export const DashboardHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">لوحة التحكم</h2>
      <div className="flex gap-2">
        <select
          className="px-3 py-1 border rounded-md text-sm"
          defaultValue="this-week"
        >
          <option value="today">اليوم</option>
          <option value="yesterday">أمس</option>
          <option value="this-week">هذا الأسبوع</option>
          <option value="this-month">هذا الشهر</option>
          <option value="last-month">الشهر الماضي</option>
          <option value="this-year">هذا العام</option>
        </select>
        <button className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-md">
          تحديث
        </button>
      </div>
    </div>
  );
};

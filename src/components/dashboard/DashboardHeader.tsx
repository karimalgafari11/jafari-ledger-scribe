
import React from "react";

export const DashboardHeader: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
      <h2 className="text-2xl font-bold mb-2 lg:mb-0">لوحة التحكم</h2>
      <div className="flex flex-wrap gap-2">
        <select className="border rounded p-1 px-2 text-sm">
          <option>آخر 7 أيام</option>
          <option>آخر 30 يوم</option>
          <option>آخر 90 يوم</option>
          <option>هذا العام</option>
        </select>
        <button className="bg-primary text-white rounded p-1 px-3 text-sm">
          تحديث
        </button>
      </div>
    </div>
  );
};

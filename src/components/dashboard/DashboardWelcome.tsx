
import React from 'react';

export interface DashboardWelcomeProps {
  date: Date;
  onDateChange: (date: Date) => void;
  period: string;
  onPeriodChange: (period: string) => void;
  userName?: string;
  companyName?: string;
}

const DashboardWelcome: React.FC<DashboardWelcomeProps> = ({
  date,
  onDateChange,
  period,
  onPeriodChange,
  userName = "المستخدم",
  companyName = "نظام المحاسبة"
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-6 text-white mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">مرحباً بك، {userName}</h1>
          <p className="opacity-90">إليك آخر البيانات والتقارير الخاصة بشركة {companyName}</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <select 
            value={period} 
            onChange={(e) => onPeriodChange(e.target.value)}
            className="bg-white/10 border border-white/20 rounded px-3 py-1 text-sm"
          >
            <option value="daily">يومي</option>
            <option value="weekly">أسبوعي</option>
            <option value="monthly">شهري</option>
            <option value="yearly">سنوي</option>
          </select>
          <input
            type="date"
            className="bg-white/10 border border-white/20 rounded px-3 py-1 text-sm"
            value={date.toISOString().split('T')[0]}
            onChange={(e) => onDateChange(new Date(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardWelcome;

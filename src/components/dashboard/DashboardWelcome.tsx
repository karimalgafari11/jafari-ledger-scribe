
import React from "react";
import { Header } from "@/components/Header";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import { DateRange } from "react-day-picker";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardWelcomeProps {
  date: DateRange;
  onDateChange: (date: DateRange) => void;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  onPeriodChange: (value: any) => void;
  branch: string;
  onBranchChange: (value: string) => void;
}

const DashboardWelcome: React.FC<DashboardWelcomeProps> = ({
  date,
  onDateChange,
  period,
  onPeriodChange,
  branch,
  onBranchChange
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-blue-500 w-full">
      <Header title="لوحة التحكم الرئيسية" />
      <div className={`w-full ${isMobile ? 'px-2 py-2' : ''}`}>
        <DashboardFilters 
          date={date} 
          onDateChange={onDateChange} 
          period={period} 
          onPeriodChange={value => onPeriodChange(value)} 
          branch={branch} 
          onBranchChange={onBranchChange} 
        />
      </div>
    </div>
  );
};

export default DashboardWelcome;

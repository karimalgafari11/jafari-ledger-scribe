
import React from 'react';
import { CalendarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardWelcomeProps {
  date?: Date;
  onDateChange?: (date: Date) => void;
  period?: string;
  onPeriodChange?: (period: string) => void;
  userName?: string;
  companyName?: string;
}

const DashboardWelcome: React.FC<DashboardWelcomeProps> = ({
  date = new Date(),
  onDateChange,
  period = 'monthly',
  onPeriodChange,
  userName = 'المستخدم',
  companyName = 'شركتي'
}) => {
  const formattedDate = new Intl.DateTimeFormat('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);

  return (
    <Card className="mb-6 border-none bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-900 mb-1">مرحبًا {userName}!</h1>
            <p className="text-blue-700 flex items-center">
              <CalendarIcon className="ml-2 h-4 w-4 text-blue-500" />
              {formattedDate}
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <p className="text-sm text-blue-700">
              نظام {companyName} المحاسبي
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardWelcome;

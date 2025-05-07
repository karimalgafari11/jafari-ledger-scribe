
import React from 'react';
import { Bell, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface NotificationStatsCardsProps {
  total: number;
  unread: number;
  critical: number;
}

const NotificationStatsCards = ({ total, unread, critical }: NotificationStatsCardsProps) => {
  // حساب النسب المئوية للعرض
  const unreadPercentage = total > 0 ? Math.round((unread / total) * 100) : 0;
  const criticalPercentage = total > 0 ? Math.round((critical / total) * 100) : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="p-4 flex items-center justify-between relative overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="z-10">
          <p className="text-sm text-muted-foreground">إجمالي الإشعارات</p>
          <p className="text-2xl font-bold mt-1">{total}</p>
          <div className="mt-2 flex items-center text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3 ml-1" />
            <span>زيادة بنسبة 12% عن الأسبوع الماضي</span>
          </div>
        </div>
        <div className="relative">
          <Bell className="h-8 w-8 text-blue-500 opacity-80 group-hover:scale-110 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {total > 99 ? "99+" : total}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 h-1 bg-blue-500 opacity-70" style={{ width: '100%' }}></div>
      </Card>
      
      <Card className="p-4 flex items-center justify-between relative overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="z-10">
          <p className="text-sm text-muted-foreground">الإشعارات غير المقروءة</p>
          <p className="text-2xl font-bold mt-1">{unread}</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="mt-2 flex items-center text-xs text-muted-foreground cursor-help">
                  {unreadPercentage > 30 ? (
                    <TrendingUp className="h-3 w-3 ml-1 text-amber-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 ml-1 text-green-500" />
                  )}
                  <span>{unreadPercentage}% من إجمالي الإشعارات</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>نسبة الإشعارات غير المقروءة من إجمالي الإشعارات</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="relative">
          <Bell className="h-8 w-8 text-amber-500 opacity-80 group-hover:scale-110 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unread > 99 ? "99+" : unread}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 h-1 bg-amber-500 opacity-70" style={{ width: `${unreadPercentage}%` }}></div>
      </Card>
      
      <Card className="p-4 flex items-center justify-between relative overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="z-10">
          <p className="text-sm text-muted-foreground">الإشعارات الهامة</p>
          <p className="text-2xl font-bold mt-1">{critical}</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="mt-2 flex items-center text-xs text-muted-foreground cursor-help">
                  {criticalPercentage > 10 ? (
                    <TrendingUp className="h-3 w-3 ml-1 text-red-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 ml-1 text-green-500" />
                  )}
                  <span>{criticalPercentage}% من إجمالي الإشعارات</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>نسبة الإشعارات الهامة من إجمالي الإشعارات</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="relative">
          <Bell className="h-8 w-8 text-red-500 opacity-80 group-hover:scale-110 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {critical > 99 ? "99+" : critical}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 h-1 bg-red-500 opacity-70" style={{ width: `${criticalPercentage}%` }}></div>
      </Card>
    </div>
  );
};

export default NotificationStatsCards;

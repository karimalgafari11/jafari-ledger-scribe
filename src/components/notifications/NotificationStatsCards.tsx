
import React from 'react';
import { Bell } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface NotificationStatsCardsProps {
  total: number;
  unread: number;
  critical: number;
}

const NotificationStatsCards = ({ total, unread, critical }: NotificationStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">إجمالي الإشعارات</p>
          <p className="text-2xl font-bold mt-1">{total}</p>
        </div>
        <Bell className="h-8 w-8 text-blue-500 opacity-80" />
      </Card>
      
      <Card className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">الإشعارات غير المقروءة</p>
          <p className="text-2xl font-bold mt-1">{unread}</p>
        </div>
        <Bell className="h-8 w-8 text-amber-500 opacity-80" />
      </Card>
      
      <Card className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">الإشعارات الهامة</p>
          <p className="text-2xl font-bold mt-1">{critical}</p>
        </div>
        <Bell className="h-8 w-8 text-red-500 opacity-80" />
      </Card>
    </div>
  );
};

export default NotificationStatsCards;

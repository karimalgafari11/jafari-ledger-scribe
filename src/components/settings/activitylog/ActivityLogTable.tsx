
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { UserActivity } from '@/types/permissions';
import { format } from 'date-fns';

interface ActivityLogTableProps {
  activities: UserActivity[];
  isLoading: boolean;
}

const ActivityLogTable: React.FC<ActivityLogTableProps> = ({ activities, isLoading }) => {
  return (
    <div className="bg-white rounded-md shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>التاريخ والوقت</TableHead>
            <TableHead>المستخدم</TableHead>
            <TableHead>الإجراء</TableHead>
            <TableHead>الوحدة</TableHead>
            <TableHead>التفاصيل</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>عنوان IP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                جارِ التحميل...
              </TableCell>
            </TableRow>
          ) : activities.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                لا توجد سجلات نشاط
              </TableCell>
            </TableRow>
          ) : (
            activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">
                  {format(new Date(activity.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                </TableCell>
                <TableCell>{activity.username}</TableCell>
                <TableCell>{activity.action}</TableCell>
                <TableCell>{activity.module}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {activity.details}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      activity.status === 'success'
                        ? 'success'
                        : activity.status === 'warning'
                        ? 'warning'
                        : 'destructive'
                    }
                  >
                    {activity.status === 'success'
                      ? 'نجاح'
                      : activity.status === 'warning'
                      ? 'تحذير'
                      : 'فشل'}
                  </Badge>
                </TableCell>
                <TableCell>{activity.ipAddress}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActivityLogTable;

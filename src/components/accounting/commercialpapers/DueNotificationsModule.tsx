
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bell, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const DueNotificationsModule = () => {
  // Mock data for due notifications
  const dueNotifications = [
    { id: 1, number: "CP-002", dueDate: "2024-04-30", amount: 7500, party: "مؤسسة النور", type: "شيك", daysLeft: 0, priority: "عالية" },
    { id: 2, number: "CP-004", dueDate: "2024-05-03", amount: 4300, party: "شركة الأمل", type: "كمبيالة", daysLeft: 3, priority: "متوسطة" },
    { id: 3, number: "OP-001", dueDate: "2024-05-05", amount: 4200, party: "مؤسسة الوفاء", type: "كمبيالة", daysLeft: 5, priority: "منخفضة" },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Bell className="h-5 w-5 text-amber-500" />
            تنبيهات الاستحقاق
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>رقم الورقة</TableHead>
              <TableHead>تاريخ الاستحقاق</TableHead>
              <TableHead>الأيام المتبقية</TableHead>
              <TableHead>المبلغ</TableHead>
              <TableHead>الطرف المقابل</TableHead>
              <TableHead>النوع</TableHead>
              <TableHead>الأولوية</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dueNotifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>{notification.number}</TableCell>
                <TableCell>{notification.dueDate}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    notification.daysLeft === 0 ? 'bg-red-100 text-red-800' : 
                    notification.daysLeft <= 3 ? 'bg-amber-100 text-amber-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {notification.daysLeft === 0 ? 'اليوم' : `${notification.daysLeft} أيام`}
                  </span>
                </TableCell>
                <TableCell>{notification.amount.toLocaleString()}</TableCell>
                <TableCell>{notification.party}</TableCell>
                <TableCell>{notification.type}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    notification.priority === 'عالية' ? 'bg-red-100 text-red-800' : 
                    notification.priority === 'متوسطة' ? 'bg-amber-100 text-amber-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {notification.priority}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <AlertCircle size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};


import { UserActivity } from "@/types/permissions";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Eye, Info, Loader2 } from "lucide-react";
import { useState } from "react";

interface ActivityLogTableProps {
  activities: UserActivity[];
  isLoading: boolean;
}

const ActivityLogTable = ({ activities, isLoading }: ActivityLogTableProps) => {
  const [selectedActivity, setSelectedActivity] = useState<UserActivity | null>(null);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">لا توجد أنشطة لعرضها</p>
      </div>
    );
  }
  
  const getStatusBadge = (status: UserActivity['status']) => {
    switch (status) {
      case 'success':
        return <Badge variant="success">نجاح</Badge>;
      case 'failed':
        return <Badge variant="destructive">فشل</Badge>;
      case 'warning':
        return <Badge variant="warning">تحذير</Badge>;
      case 'info':
        return <Badge variant="outline">معلومات</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getActionLabel = (action: string) => {
    const actions: Record<string, string> = {
      login: 'تسجيل دخول',
      logout: 'تسجيل خروج',
      create: 'إنشاء',
      update: 'تعديل',
      delete: 'حذف',
      view: 'عرض',
      export: 'تصدير',
      import: 'استيراد',
      approve: 'اعتماد',
      reject: 'رفض',
      backup: 'نسخ احتياطي',
      restore: 'استعادة',
      system: 'نظام'
    };
    
    return actions[action] || action;
  };
  
  const getModuleLabel = (module: string) => {
    const modules: Record<string, string> = {
      accounting: 'المحاسبة',
      inventory: 'المخزون',
      sales: 'المبيعات',
      expenses: 'المصروفات',
      auth: 'المصادقة',
      reports: 'التقارير',
      settings: 'الإعدادات',
      admin: 'الإدارة'
    };
    
    return modules[module] || module;
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-background">
          <TableRow>
            <TableHead>التاريخ والوقت</TableHead>
            <TableHead>المستخدم</TableHead>
            <TableHead>الإجراء</TableHead>
            <TableHead>الوحدة</TableHead>
            <TableHead>التفاصيل</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>التفاصيل</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell className="whitespace-nowrap">
                <div className="flex items-center">
                  <Calendar className="ml-2 h-4 w-4 text-muted-foreground" />
                  {formatDate(activity.timestamp)}
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{activity.username}</div>
              </TableCell>
              <TableCell>{getActionLabel(activity.action)}</TableCell>
              <TableCell>{getModuleLabel(activity.module)}</TableCell>
              <TableCell className="max-w-[250px] truncate">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>{activity.details}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{activity.details}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell dir="ltr">{activity.ipAddress}</TableCell>
              <TableCell>{getStatusBadge(activity.status)}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedActivity(activity)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] rtl">
                    <DialogHeader>
                      <DialogTitle>تفاصيل النشاط</DialogTitle>
                      <DialogDescription>
                        كافة المعلومات المتعلقة بهذا النشاط
                      </DialogDescription>
                    </DialogHeader>
                    {selectedActivity && (
                      <div className="space-y-4 my-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-semibold">التاريخ والوقت:</p>
                            <p className="text-sm">{formatDate(selectedActivity.timestamp)}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold">المستخدم:</p>
                            <p className="text-sm">{selectedActivity.username}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold">الإجراء:</p>
                            <p className="text-sm">{getActionLabel(selectedActivity.action)}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold">الوحدة:</p>
                            <p className="text-sm">{getModuleLabel(selectedActivity.module)}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm font-semibold">التفاصيل:</p>
                            <p className="text-sm">{selectedActivity.details}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold">عنوان IP:</p>
                            <p className="text-sm" dir="ltr">{selectedActivity.ipAddress}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold">الحالة:</p>
                            <p className="text-sm">{getStatusBadge(selectedActivity.status)}</p>
                          </div>
                        </div>
                        
                        {selectedActivity.metadata && (
                          <div>
                            <p className="text-sm font-semibold mb-2">البيانات الإضافية:</p>
                            <pre className="bg-muted p-2 rounded text-xs overflow-auto max-h-40 rtl">
                              {JSON.stringify(selectedActivity.metadata, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActivityLogTable;

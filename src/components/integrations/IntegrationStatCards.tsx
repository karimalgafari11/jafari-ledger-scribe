
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Database, Link, Check, AlertTriangle } from 'lucide-react';

interface ExternalSystem {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'pending' | 'error';
  lastSync?: Date;
  url?: string;
  apiKey?: string;
  description?: string;
  connections?: number;
  dataTransferred?: string;
  successRate?: number;
}

interface IntegrationStatCardsProps {
  systems: ExternalSystem[];
}

export const IntegrationStatCards = ({ systems }: IntegrationStatCardsProps) => {
  // حساب الإحصائيات
  const activeCount = systems.filter(s => s.status === 'active').length;
  const errorCount = systems.filter(s => s.status === 'error').length;
  const pendingCount = systems.filter(s => s.status === 'pending').length;
  const inactiveCount = systems.filter(s => s.status === 'inactive').length;

  // حساب متوسط نسبة النجاح
  const activeSystems = systems.filter(s => s.status === 'active' && s.successRate !== undefined);
  const averageSuccessRate = activeSystems.length > 0
    ? activeSystems.reduce((sum, sys) => sum + (sys.successRate || 0), 0) / activeSystems.length
    : 0;
    
  // تنسيق النسبة المئوية
  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="overflow-hidden">
        <div className="bg-blue-50 h-1.5" style={{ width: `${(activeCount / systems.length) * 100}%` }}></div>
        <CardContent className="p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">أنظمة نشطة</p>
              <p className="text-3xl font-bold">{activeCount}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatPercentage((activeCount / systems.length) * 100)} من الإجمالي
              </p>
            </div>
            <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center">
              <Check className="h-6 w-6 text-blue-700" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <div className="bg-red-50 h-1.5" style={{ width: `${(errorCount / systems.length) * 100}%` }}></div>
        <CardContent className="p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">أنظمة بها أخطاء</p>
              <p className="text-3xl font-bold">{errorCount}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatPercentage((errorCount / systems.length) * 100)} من الإجمالي
              </p>
            </div>
            <div className="bg-red-100 h-12 w-12 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-700" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <div className="bg-purple-50 h-1.5" style={{ width: `${(pendingCount / systems.length) * 100}%` }}></div>
        <CardContent className="p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">معدل نجاح الاتصال</p>
              <p className="text-3xl font-bold">{formatPercentage(averageSuccessRate)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                للأنظمة النشطة خلال 24 ساعة
              </p>
            </div>
            <div className="bg-purple-100 h-12 w-12 rounded-full flex items-center justify-center">
              <Link className="h-6 w-6 text-purple-700" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <div className="bg-green-50 h-1.5" style={{ width: `100%` }}></div>
        <CardContent className="p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">إجمالي الاتصالات</p>
              <p className="text-3xl font-bold">
                {systems.reduce((sum, system) => sum + (system.connections || 0), 0)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                عملية نقل بيانات منذ البداية
              </p>
            </div>
            <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center">
              <Database className="h-6 w-6 text-green-700" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

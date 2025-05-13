
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useSystemUpdates } from '@/hooks/useSystemUpdates';
import { formatDistanceToNow } from 'date-fns';
import { ArrowDownToLine, Check, RefreshCw } from 'lucide-react';

const SystemUpdatesPage = () => {
  const {
    currentVersion,
    latestVersion,
    availableUpdates,
    recentUpdates,
    updateStatus,
    isLoading,
    isChecking,
    checkForUpdates,
    installUpdate
  } = useSystemUpdates();

  return (
    <PageContainer title="التحديثات والإصدارات" showBack>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">إدارة التحديثات</h2>
          <Button 
            variant="outline" 
            onClick={checkForUpdates}
            disabled={isChecking}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
            التحقق من التحديثات
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Version Card */}
          <Card>
            <CardHeader>
              <CardTitle>الإصدار الحالي</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-64" />
                </div>
              ) : currentVersion ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold">
                      {currentVersion.version}
                    </h3>
                    <Badge variant="secondary">{currentVersion.isStable ? "مستقر" : "تجريبي"}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    تم التثبيت: {formatDistanceToNow(new Date(currentVersion.releaseDate))} مضت
                  </p>
                  <p>{currentVersion.description}</p>
                </div>
              ) : (
                <p className="text-gray-500">لا يوجد إصدار مثبت</p>
              )}
            </CardContent>
          </Card>

          {/* Latest Version Card */}
          <Card>
            <CardHeader>
              <CardTitle>آخر إصدار متاح</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-64" />
                </div>
              ) : latestVersion ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold">
                      {latestVersion.version}
                    </h3>
                    <Badge variant="secondary">{latestVersion.isStable ? "مستقر" : "تجريبي"}</Badge>
                    {updateStatus === 'available' && (
                      <Badge variant="default" className="bg-green-600">متاح</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    تاريخ الإصدار: {formatDistanceToNow(new Date(latestVersion.releaseDate))} مضت
                  </p>
                  <p>{latestVersion.description}</p>
                  {updateStatus === 'available' && (
                    <Button 
                      onClick={() => installUpdate(latestVersion.id)}
                      className="mt-4"
                    >
                      <ArrowDownToLine className="h-4 w-4 mr-2" />
                      تثبيت التحديث
                    </Button>
                  )}
                  {currentVersion && currentVersion.version === latestVersion.version && (
                    <div className="flex items-center gap-2 text-green-600 mt-2">
                      <Check className="h-4 w-4" />
                      <span>أنت تستخدم أحدث إصدار</span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">لا توجد إصدارات متاحة</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Available Updates */}
        <Card>
          <CardHeader>
            <CardTitle>التحديثات المتاحة</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-12 w-full" />
                  </div>
                ))}
              </div>
            ) : availableUpdates && availableUpdates.length > 0 ? (
              <div className="space-y-4">
                {availableUpdates.map(update => (
                  <div key={update.id} className="flex justify-between items-center border-b pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">نسخة {update.version}</h4>
                        <Badge variant="outline">{update.isStable ? "مستقر" : "تجريبي"}</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{update.description}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => installUpdate(update.id)}
                    >
                      <ArrowDownToLine className="h-3 w-3 mr-1" />
                      تثبيت
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">لا توجد تحديثات متاحة للتثبيت</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Updates */}
        <Card>
          <CardHeader>
            <CardTitle>سجل التحديثات</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-12 w-full" />
                  </div>
                ))}
              </div>
            ) : recentUpdates && recentUpdates.length > 0 ? (
              <div className="space-y-4">
                {recentUpdates.map(update => (
                  <div key={update.id} className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">
                        {update.version ? `نسخة ${update.version.version}` : 'إصدار غير معروف'}
                      </h4>
                      <Badge variant={update.status === 'completed' ? 'success' : 'secondary'}>
                        {update.status === 'completed' ? 'مكتمل' : 
                         update.status === 'in_progress' ? 'قيد التنفيذ' :
                         update.status === 'pending' ? 'معلق' : 'فشل'}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>
                        {formatDistanceToNow(new Date(update.installedAt))} مضت
                      </span>
                      {update.notes && <span>{update.notes}</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">لا يوجد سجل تحديثات</p>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default SystemUpdatesPage;

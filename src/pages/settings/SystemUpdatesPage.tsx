
import React from 'react';
import { useSystemUpdates } from '@/hooks/useSystemUpdates';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ReloadIcon, DownloadIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import { SoftwareVersion, UserUpdate } from '@/types/software-updates';
import { toast } from 'sonner';

const SystemUpdatesPage: React.FC = () => {
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

  const handleInstallUpdate = async (version: SoftwareVersion) => {
    const confirmed = window.confirm(`هل أنت متأكد من تثبيت الإصدار ${version.version}؟`);
    if (confirmed) {
      await installUpdate(version.id);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6 rtl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">إدارة التحديثات والإصدارات</h1>
        <Button 
          onClick={checkForUpdates} 
          disabled={isChecking || isLoading} 
          variant="outline"
        >
          {isChecking ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              جاري التحقق...
            </>
          ) : (
            <>
              <ReloadIcon className="mr-2 h-4 w-4" />
              التحقق من وجود تحديثات
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>حالة النظام</span>
              {updateStatus === 'available' && (
                <Badge variant="destructive">تحديث متوفر</Badge>
              )}
              {updateStatus === 'installed' && (
                <Badge variant="success" className="bg-green-500">محدث</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">الإصدار الحالي</div>
              <div className="flex justify-between items-center">
                <div className="font-semibold text-xl">
                  {currentVersion ? currentVersion.version : 'غير معروف'} 
                  {currentVersion?.isStable ? 
                    <Badge variant="outline" className="ml-2 text-xs bg-green-100">مستقر</Badge> : 
                    <Badge variant="outline" className="ml-2 text-xs bg-yellow-100">تجريبي</Badge>
                  }
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentVersion && `تم الإصدار ${new Date(currentVersion.releaseDate).toLocaleDateString('ar')}`}
                </div>
              </div>
              {currentVersion?.description && (
                <p className="mt-2 text-sm">{currentVersion.description}</p>
              )}
            </div>

            {latestVersion && currentVersion && latestVersion.id !== currentVersion.id && (
              <div className="bg-primary/10 p-4 rounded-lg border border-primary">
                <div className="text-sm font-medium mb-1">أحدث إصدار متاح</div>
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-xl">
                    {latestVersion.version}
                    {latestVersion.isStable ? 
                      <Badge variant="outline" className="ml-2 text-xs bg-green-100">مستقر</Badge> : 
                      <Badge variant="outline" className="ml-2 text-xs bg-yellow-100">تجريبي</Badge>
                    }
                  </div>
                  <div className="text-sm text-muted-foreground">
                    تم الإصدار {new Date(latestVersion.releaseDate).toLocaleDateString('ar')}
                  </div>
                </div>
                {latestVersion.description && (
                  <p className="mt-2 text-sm">{latestVersion.description}</p>
                )}
                <div className="mt-3">
                  <Button 
                    onClick={() => handleInstallUpdate(latestVersion)}
                    disabled={isLoading}
                    className="w-full"
                  >
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    تثبيت التحديث
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إحصائيات التحديثات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">عدد التحديثات المتاحة</span>
              <Badge variant="secondary">{availableUpdates.length}</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">الإصدار الحالي</span>
              <span className="font-medium">{currentVersion?.version || 'غير معروف'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">أحدث إصدار</span>
              <span className="font-medium">{latestVersion?.version || 'غير معروف'}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">آخر تحقق</span>
              <span className="text-xs text-muted-foreground">{new Date().toLocaleString('ar')}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="available">
        <TabsList className="mb-4">
          <TabsTrigger value="available">التحديثات المتاحة</TabsTrigger>
          <TabsTrigger value="history">سجل التحديثات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="space-y-4">
          {availableUpdates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
              <CheckCircleIcon className="h-12 w-12 mb-4 text-green-500" />
              <h3 className="text-lg font-medium">النظام محدث بالكامل</h3>
              <p className="max-w-sm">لا توجد تحديثات متاحة حاليًا. أنت تستخدم أحدث إصدار من النظام.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {availableUpdates.map((version) => (
                <Card key={version.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl flex items-center">
                        الإصدار {version.version}
                        {version.isStable ? (
                          <Badge variant="outline" className="mr-2 text-xs bg-green-100">مستقر</Badge>
                        ) : (
                          <Badge variant="outline" className="mr-2 text-xs bg-yellow-100">تجريبي</Badge>
                        )}
                      </CardTitle>
                      <div className="text-sm text-muted-foreground">
                        {new Date(version.releaseDate).toLocaleDateString('ar')}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {version.description && (
                      <p className="text-sm mb-4">{version.description}</p>
                    )}
                    {version.releaseNotes && (
                      <>
                        <div className="text-sm font-medium mb-2">ملاحظات الإصدار:</div>
                        <div className="text-sm bg-muted p-3 rounded whitespace-pre-line">
                          {version.releaseNotes}
                        </div>
                      </>
                    )}
                    {version.features && Object.keys(version.features).length > 0 && (
                      <div className="mt-3">
                        <div className="text-sm font-medium mb-2">الميزات:</div>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(version.features).map(([feature, isEnabled]) => (
                            isEnabled && (
                              <div key={feature} className="flex items-center text-sm">
                                <CheckCircleIcon className="h-4 w-4 mr-1 text-green-500" />
                                <span>{feature}</span>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleInstallUpdate(version)} 
                      disabled={isLoading}
                      className="w-full"
                    >
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      تثبيت التحديث
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history">
          {recentUpdates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
              <AlertCircleIcon className="h-12 w-12 mb-4 text-amber-500" />
              <h3 className="text-lg font-medium">لم يتم تثبيت أي تحديثات سابقة</h3>
              <p className="max-w-sm">لم نجد سجل لأي تحديثات تم تثبيتها مسبقًا.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentUpdates.map((update) => (
                <Card key={update.id} className="overflow-hidden">
                  <div className={`h-1 ${
                    update.status === 'completed' ? 'bg-green-500' : 
                    update.status === 'failed' ? 'bg-red-500' : 
                    'bg-amber-500'
                  }`} />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">
                        {update.version?.version || 'إصدار غير معروف'}
                      </CardTitle>
                      <Badge variant={
                        update.status === 'completed' ? 'default' : 
                        update.status === 'failed' ? 'destructive' : 
                        'outline'
                      }>
                        {update.status === 'completed' ? 'مكتمل' : 
                         update.status === 'failed' ? 'فشل' : 
                         update.status === 'in_progress' ? 'جاري التثبيت' : 
                         'قيد الانتظار'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 pb-2">
                    {update.notes && (
                      <p className="text-sm">{update.notes}</p>
                    )}
                    <div className="text-xs text-muted-foreground">
                      تم التثبيت: {new Date(update.installedAt).toLocaleString('ar')}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemUpdatesPage;

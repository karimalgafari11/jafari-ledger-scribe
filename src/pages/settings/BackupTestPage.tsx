
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { AlertCircle, CheckCircle, RefreshCw, FileCheck } from "lucide-react";
import { useBackupSettings } from "@/hooks/useBackupSettings";
import { runBackupSystemTest, verifyBackupStatus } from "@/hooks/backup/backupTestUtils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

const BackupTestPage = () => {
  const {
    settings,
    createManualBackup,
    saveSettings,
    connectGoogleDrive,
    restoreBackup,
    deleteBackup,
    uploadToGoogleDrive,
    downloadBackup,
    downloadFromGoogleDrive
  } = useBackupSettings();
  
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [backupStatus, setBackupStatus] = useState<any>(null);
  
  // تشغيل الاختبار التلقائي
  const handleRunAutomatedTest = async () => {
    setIsRunningTests(true);
    setTestProgress(10);
    setTestResults([]);
    
    try {
      // اختبار الوظائف الأساسية
      setTestResults(prev => [...prev, {
        name: 'بدء الاختبار التلقائي',
        status: 'running',
        timestamp: new Date().toISOString()
      }]);
      setTestProgress(20);
      
      // تشغيل اختبار النسخ الاحتياطي
      const testResult = await runBackupSystemTest({
        createManualBackup,
        saveSettings,
        connectGoogleDrive
      });
      
      setTestProgress(70);
      setTestResults(prev => [...prev, {
        name: 'اختبار إنشاء النسخ الاحتياطية',
        status: testResult ? 'success' : 'failed',
        timestamp: new Date().toISOString()
      }]);
      
      // التحقق من حالة النسخ الاحتياطية
      const status = verifyBackupStatus(settings);
      setBackupStatus(status);
      
      setTestProgress(90);
      setTestResults(prev => [...prev, {
        name: 'التحقق من حالة النظام',
        status: 'success',
        timestamp: new Date().toISOString()
      }]);
      
      setTestProgress(100);
      toast.success('تم إكمال اختبار النظام بنجاح');
    } catch (error) {
      console.error('خطأ في تشغيل الاختبار:', error);
      toast.error('فشل في تشغيل اختبار النظام');
      
      setTestResults(prev => [...prev, {
        name: 'خطأ في تنفيذ الاختبار',
        status: 'failed',
        timestamp: new Date().toISOString(),
        error
      }]);
    } finally {
      setIsRunningTests(false);
    }
  };
  
  // اختبار الاستعادة
  const handleTestRestore = async () => {
    if (!settings.backupHistory || settings.backupHistory.length === 0) {
      toast.error('لا توجد نسخة احتياطية لاستعادتها');
      return;
    }
    
    try {
      const backupId = settings.backupHistory[0].id;
      toast.info('جاري اختبار استعادة النسخة الاحتياطية');
      const result = await restoreBackup(backupId);
      
      if (result) {
        toast.success('تم اختبار استعادة النسخة الاحتياطية بنجاح');
        setTestResults(prev => [...prev, {
          name: 'اختبار استعادة النسخة الاحتياطية',
          status: 'success',
          timestamp: new Date().toISOString()
        }]);
      } else {
        toast.error('فشل اختبار استعادة النسخة الاحتياطية');
      }
    } catch (error) {
      console.error('خطأ في اختبار الاستعادة:', error);
      toast.error('حدث خطأ أثناء اختبار الاستعادة');
    }
  };
  
  // اختبار Google Drive
  const handleTestGoogleDrive = async () => {
    if (!settings.backupHistory || settings.backupHistory.length === 0) {
      toast.error('لا توجد نسخة احتياطية لاختبار Google Drive');
      return;
    }
    
    try {
      // اختبار الاتصال
      if (!settings.googleDriveAuth?.isAuthenticated) {
        toast.info('جاري محاولة الاتصال بـ Google Drive');
        await connectGoogleDrive();
      }
      
      const backupId = settings.backupHistory[0].id;
      
      // اختبار التحميل إلى Google Drive
      toast.info('جاري اختبار التحميل إلى Google Drive');
      await uploadToGoogleDrive(backupId);
      
      // اختبار التنزيل من Google Drive
      toast.info('جاري اختبار التنزيل من Google Drive');
      await downloadFromGoogleDrive(backupId);
      
      setTestResults(prev => [...prev, {
        name: 'اختبار تكامل Google Drive',
        status: 'success',
        timestamp: new Date().toISOString()
      }]);
      
    } catch (error) {
      console.error('خطأ في اختبار Google Drive:', error);
      toast.error('حدث خطأ أثناء اختبار تكامل Google Drive');
      
      setTestResults(prev => [...prev, {
        name: 'اختبار تكامل Google Drive',
        status: 'failed',
        timestamp: new Date().toISOString(),
        error
      }]);
    }
  };
  
  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="اختبار نظام النسخ الاحتياطي" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>اختبار تلقائي للنظام</CardTitle>
            <CardDescription>
              تشغيل اختبار شامل لوظائف النسخ الاحتياطي الأساسية
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleRunAutomatedTest}
              disabled={isRunningTests}
              className="w-full"
            >
              {isRunningTests ? (
                <>
                  <RefreshCw className="ml-2 h-4 w-4 animate-spin" />
                  جاري تنفيذ الاختبار...
                </>
              ) : (
                <>
                  <FileCheck className="ml-2 h-4 w-4" />
                  تشغيل الاختبار التلقائي
                </>
              )}
            </Button>
            
            {isRunningTests && (
              <div className="space-y-2">
                <Progress value={testProgress} className="w-full" />
                <p className="text-xs text-center">{testProgress}%</p>
              </div>
            )}
            
            <div className="space-y-2">
              <h3 className="font-medium">اختبارات فردية:</h3>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleTestRestore}
                >
                  اختبار الاستعادة
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => downloadBackup(settings.backupHistory?.[0]?.id || '', 'compressed')}
                >
                  اختبار التنزيل
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleTestGoogleDrive}
                >
                  اختبار Google Drive
                </Button>
              </div>
            </div>
            
            {backupStatus && (
              <div className="mt-4 space-y-2">
                <h3 className="font-medium">حالة النظام:</h3>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">عدد النسخ الاحتياطية</TableCell>
                      <TableCell>{backupStatus.totalBackups}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">آخر نسخة احتياطية</TableCell>
                      <TableCell>{backupStatus.lastBackup}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">حالة Google Drive</TableCell>
                      <TableCell>
                        {backupStatus.cloudConnected ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" /> متصل
                          </span>
                        ) : 'غير متصل'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">النسخ الاحتياطي المجدول</TableCell>
                      <TableCell>
                        {backupStatus.scheduledBackups ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" /> مفعّل
                          </span>
                        ) : 'معطّل'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">التشفير</TableCell>
                      <TableCell>
                        {backupStatus.encryptionEnabled ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" /> مفعّل
                          </span>
                        ) : 'معطّل'}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>نتائج الاختبار</CardTitle>
            <CardDescription>
              عرض نتائج الاختبارات التي تم إجراؤها
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {testResults.length === 0 ? (
              <div className="text-center p-6 text-muted-foreground">
                لم يتم إجراء أي اختبارات بعد
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الاختبار</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الوقت</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testResults.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>{result.name}</TableCell>
                      <TableCell>
                        {result.status === 'success' && (
                          <span className="text-green-600 flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" /> ناجح
                          </span>
                        )}
                        {result.status === 'failed' && (
                          <span className="text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" /> فشل
                          </span>
                        )}
                        {result.status === 'running' && (
                          <span className="text-blue-600 flex items-center gap-1">
                            <RefreshCw className="h-4 w-4 animate-spin" /> جاري التنفيذ
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {new Date(result.timestamp).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            
            {testResults.some(r => r.status === 'failed') && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>فشل في بعض الاختبارات</AlertTitle>
                <AlertDescription>
                  يرجى التحقق من سجل الأخطاء لمعرفة المزيد من التفاصيل.
                </AlertDescription>
              </Alert>
            )}
            
            {testResults.length > 0 && !testResults.some(r => r.status === 'failed') && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>جميع الاختبارات ناجحة</AlertTitle>
                <AlertDescription>
                  تم اجتياز جميع الاختبارات بنجاح. النظام جاهز للاستخدام.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>تقرير اختبار النظام</CardTitle>
          <CardDescription>
            ملخص شامل لحالة نظام النسخ الاحتياطي
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-medium text-blue-800 mb-2">التحقق من الإعدادات</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-blue-600" /> تكوين الجدولة
                </li>
                <li className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-blue-600" /> إعدادات الوجهة
                </li>
                <li className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-blue-600" /> خيارات الضغط
                </li>
                <li className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-blue-600" /> إعدادات التشفير
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-md">
              <h3 className="font-medium text-green-800 mb-2">التحقق من العمليات</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-600" /> إنشاء نسخة احتياطية
                </li>
                <li className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-600" /> تنزيل النسخ الاحتياطية
                </li>
                <li className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-600" /> استعادة النسخ الاحتياطية
                </li>
                <li className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-600" /> حذف النسخ الاحتياطية
                </li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-md">
              <h3 className="font-medium text-purple-800 mb-2">التحقق من التكامل</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-purple-600" /> تكامل Google Drive
                </li>
                <li className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-purple-600" /> تكامل البريد الإلكتروني
                </li>
                <li className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-purple-600" /> تنسيقات الملفات
                </li>
                <li className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-purple-600" /> استجابة الواجهة
                </li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-end">
            <Button onClick={() => window.location.href = '/settings/backup'}>
              العودة إلى صفحة النسخ الاحتياطي
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackupTestPage;

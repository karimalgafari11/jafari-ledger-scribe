import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  RefreshCw, Save, UploadCloud, FileUp, Download, Trash2, Mail, 
  File, CloudUpload, CloudDownload, Cloud
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { useBackupSettings } from "@/hooks/useBackupSettings";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const BackupPage = () => {
  const {
    settings,
    isLoading,
    isBackingUp,
    isRestoring,
    isConnectingGoogleDrive,
    isUploadingToGoogleDrive,
    backupProgress,
    restoreProgress,
    uploadProgress,
    downloadFormat,
    setDownloadFormat,
    updateSetting,
    saveSettings,
    createManualBackup,
    restoreBackup,
    deleteBackup,
    downloadBackup,
    downloadOriginalBackup,
    sendBackupByEmail,
    connectGoogleDrive,
    disconnectGoogleDrive,
    uploadToGoogleDrive,
    downloadFromGoogleDrive
  } = useBackupSettings();

  const [sendEmailTo, setSendEmailTo] = useState("");
  const [selectedBackupFormat, setSelectedBackupFormat] = useState<'compressed' | 'original' | 'sql' | 'json'>('compressed');
  const isGoogleDriveConnected = settings.googleDriveAuth?.isAuthenticated || false;
  
  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="النسخ الاحتياطي واستعادة البيانات" />

      <Tabs defaultValue="schedule" className="mt-6">
        <TabsList className="mb-6">
          <TabsTrigger value="schedule">جدولة النسخ الاحتياطي</TabsTrigger>
          <TabsTrigger value="backups">النسخ الاحتياطية</TabsTrigger>
          <TabsTrigger value="cloud">تخزين سحابي</TabsTrigger>
          <TabsTrigger value="settings">إعدادات متقدمة</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>جدولة النسخ الاحتياطي التلقائي</CardTitle>
                <CardDescription>
                  ضبط توقيت وتكرار النسخ الاحتياطي التلقائي للبيانات
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="frequency">تكرار النسخ الاحتياطي</Label>
                    <Select 
                      defaultValue={settings.frequency}
                      onValueChange={(value) => updateSetting("frequency", value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر التكرار" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">يومي</SelectItem>
                        <SelectItem value="weekly">أسبوعي</SelectItem>
                        <SelectItem value="monthly">شهري</SelectItem>
                        <SelectItem value="manual">يدوي فقط</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">وقت النسخ الاحتياطي</Label>
                    <Input 
                      type="time" 
                      id="time" 
                      value={settings.time} 
                      onChange={(e) => updateSetting("time", e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="keepBackups">عدد النسخ الاحتياطية للاحتفاظ بها</Label>
                    <Input 
                      type="number" 
                      id="keepBackups" 
                      value={settings.keepBackups} 
                      min="1"
                      max="100"
                      onChange={(e) => updateSetting("keepBackups", parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <Label htmlFor="auto-restore">استعادة تلقائية عند الفشل</Label>
                    <Switch 
                      id="auto-restore"
                      checked={settings.autoRestore}
                      onCheckedChange={(checked) => updateSetting("autoRestore", checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={saveSettings} 
                  disabled={isLoading}
                  className="ml-2"
                >
                  <Save className="ml-2 h-4 w-4" />
                  حفظ الإعدادات
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>النسخ الاحتياطي اليدوي</CardTitle>
                <CardDescription>
                  إنشاء نسخة احتياطية يدوية للنظام
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {settings.lastBackup && (
                  <div className="text-sm text-muted-foreground">
                    آخر نسخة احتياطية: {format(new Date(settings.lastBackup), 'yyyy/MM/dd - HH:mm')}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="destinationType">وجهة النسخ الاحتياطي</Label>
                  <Select 
                    defaultValue={settings.destinationType}
                    onValueChange={(value) => updateSetting("destinationType", value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الوجهة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">تخزين محلي</SelectItem>
                      <SelectItem value="cloud">تخزين سحابي</SelectItem>
                      <SelectItem value="email">إرسال بالبريد الإلكتروني</SelectItem>
                      <SelectItem value="ftp">FTP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backupFormat">تنسيق النسخة الاحتياطية</Label>
                  <Select 
                    defaultValue={selectedBackupFormat}
                    onValueChange={(value) => setSelectedBackupFormat(value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر تنسيق النسخة الاحتياطية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compressed">ملف مضغوط (ZIP)</SelectItem>
                      <SelectItem value="original">ملف أصلي (غير مضغوط)</SelectItem>
                      <SelectItem value="sql">SQL</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {settings.destinationType === "email" && (
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني للإرسال</Label>
                    <Input 
                      type="email" 
                      id="email"
                      placeholder="example@example.com"
                      value={settings.emailRecipients && settings.emailRecipients.length > 0 ? settings.emailRecipients[0] : ""}
                      onChange={(e) => updateSetting("emailRecipients", [e.target.value])}
                    />
                  </div>
                )}
                
                {isBackingUp && (
                  <div className="space-y-2 py-2">
                    <Label>تقدم النسخ الاحتياطي</Label>
                    <Progress value={backupProgress} className="w-full" />
                    <div className="text-xs text-center text-muted-foreground">
                      {backupProgress}%
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => createManualBackup(selectedBackupFormat)} 
                  disabled={isBackingUp}
                  className="w-full"
                  variant="default"
                >
                  <UploadCloud className="ml-2 h-4 w-4" />
                  {isBackingUp ? "جاري النسخ..." : "إنشاء نسخة احتياطية الآن"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="backups">
          <Card>
            <CardHeader>
              <CardTitle>سجل النسخ الاحتياطية</CardTitle>
              <CardDescription>
                عرض وإدارة النسخ الاحتياطية المتوفرة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>التاريخ والوقت</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>الحجم</TableHead>
                      <TableHead>الوجهة</TableHead>
                      <TableHead>التنسيق</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead className="text-left">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {settings.backupHistory && settings.backupHistory.length > 0 ? (
                      settings.backupHistory.map((backup) => (
                        <TableRow key={backup.id}>
                          <TableCell>{format(new Date(backup.createdAt), 'yyyy/MM/dd - HH:mm')}</TableCell>
                          <TableCell>
                            {backup.type === 'auto' ? 'تلقائي' : 'يدوي'}
                          </TableCell>
                          <TableCell>{backup.size}</TableCell>
                          <TableCell>
                            {backup.destination === 'local' ? 'محلي' :
                             backup.destination === 'cloud' ? (
                               <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                                 <Cloud className="h-3 w-3" /> سحابي
                               </Badge>
                             ) : 
                             backup.destination === 'email' ? 'بريد إلكتروني' : 'FTP'}
                          </TableCell>
                          <TableCell>
                            <Badge variant={backup.fileFormat === 'compressed' ? 'default' : 
                                         backup.fileFormat === 'original' ? 'secondary' :
                                         backup.fileFormat === 'sql' ? 'secondary' : 'destructive'}>
                              {backup.fileFormat === 'compressed' ? 'مضغوط' : 
                               backup.fileFormat === 'original' ? 'أصلي' : 
                               backup.fileFormat === 'sql' ? 'SQL' : 'JSON'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${
                              backup.status === 'success' ? 'bg-green-100 text-green-800' : 
                              backup.status === 'failed' ? 'bg-red-100 text-red-800' : 
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {backup.status === 'success' ? 'ناجح' : 
                               backup.status === 'failed' ? 'فشل' : 
                               'جاري التنفيذ'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={() => restoreBackup(backup.id)}
                                      disabled={isRestoring || backup.status !== 'success'}
                                    >
                                      <RefreshCw className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>استعادة النسخة الاحتياطية</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => downloadBackup(backup.id, backup.fileFormat || 'compressed')}
                                    >
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>تنزيل النسخة الاحتياطية</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => downloadOriginalBackup(backup.id)}
                                    >
                                      <File className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>تنزيل النسخة الأصلية</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              {isGoogleDriveConnected && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => uploadToGoogleDrive(backup.id)}
                                        disabled={isUploadingToGoogleDrive || backup.destination === 'cloud'}
                                      >
                                        <CloudUpload className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>تحميل إلى Google Drive</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}

                              {backup.googleDriveFileId && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => downloadFromGoogleDrive(backup.id)}
                                      >
                                        <CloudDownload className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>تنزيل من Google Drive</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={() => {
                                        const email = window.prompt("أدخل البريد الإلكتروني:");
                                        if (email) sendBackupByEmail(backup.id, email);
                                      }}
                                    >
                                      <Mail className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>إرسال بالبريد الإلكتروني</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={() => deleteBackup(backup.id)}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>حذف النسخة الاحتياطية</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                          لا توجد نسخ احتياطية متوفرة.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {isRestoring && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>جاري استعادة النسخة الاحتياطية...</Label>
                    <span className="text-xs">{restoreProgress}%</span>
                  </div>
                  <Progress value={restoreProgress} className="w-full" />
                </div>
              )}

              {isUploadingToGoogleDrive && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>جاري التحميل إلى Google Drive...</Label>
                    <span className="text-xs">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}
              
              <div className="mt-6">
                <Alert>
                  <AlertTitle>تنزيل النسخ الاحتياطية</AlertTitle>
                  <AlertDescription>
                    يمكنك تنزيل النسخ الاحتياطية بأكثر من تنسيق. استخدم أيقونة التنزيل للملفات المضغوطة وأيقونة الملف للنسخ الأصلية.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cloud">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ربط حساب Google Drive</CardTitle>
                <CardDescription>
                  استخدم حساب Google Drive لتخزين النسخ الاحتياطية وتنزيلها
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isGoogleDriveConnected ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Cloud className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-900">متصل بحساب Google Drive</h4>
                        <p className="text-sm text-green-700">{settings.googleDriveAuth?.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>المجلد المستهدف</Label>
                      <Input 
                        type="text"
                        placeholder="معرف مجلد Google Drive"
                        value={settings.cloudFolderId || ""}
                        onChange={e => updateSetting("cloudFolderId", e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        اترك هذا الحقل فارغًا لاستخدام المجلد الرئيسي
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Alert variant="outline" className="border-amber-200 bg-amber-50">
                      <AlertTitle className="text-amber-800">غير متصل</AlertTitle>
                      <AlertDescription className="text-amber-700">
                        لم يتم الاتصال بحساب Google Drive بعد. اضغط على زر "اتصال بـ Google Drive" أدناه لإجراء الاتصال.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
                
                {isConnectingGoogleDrive && (
                  <div className="mt-4">
                    <Progress value={70} className="w-full mb-2" />
                    <p className="text-center text-sm text-muted-foreground">
                      جاري الاتصال بـ Google Drive...
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {isGoogleDriveConnected ? (
                  <Button 
                    onClick={disconnectGoogleDrive}
                    className="w-full"
                    variant="outline"
                  >
                    <Cloud className="ml-2 h-4 w-4" />
                    قطع الاتصال بـ Google Drive
                  </Button>
                ) : (
                  <Button 
                    onClick={connectGoogleDrive}
                    className="w-full"
                    variant="default"
                    disabled={isConnectingGoogleDrive}
                  >
                    <Cloud className="ml-2 h-4 w-4" />
                    {isConnectingGoogleDrive ? "جاري الاتصال..." : "اتصال بـ Google Drive"}
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>النسخ الاحتياطي التلقائي إلى السحابة</CardTitle>
                <CardDescription>
                  إعداد نسخ احتياطي تلقائي إلى حساب Google Drive الخاص بك
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-cloud-backup">نسخ احتياطي تلقائي إلى السحابة</Label>
                  <Switch 
                    id="auto-cloud-backup"
                    disabled={!isGoogleDriveConnected}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>تنسيق النسخ الاحتياطي</Label>
                  <Select defaultValue="compressed" disabled={!isGoogleDriveConnected}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر التنسيق" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compressed">ملف مضغوط (ZIP)</SelectItem>
                      <SelectItem value="sql">SQL</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Alert>
                  <AlertTitle>معلومات مهمة</AlertTitle>
                  <AlertDescription>
                    سيتم نسخ البيانات احتياطيًا إلى Google Drive تلقائيًا بعد كل نسخ احتياطي محلي إذا تم تفعيل هذه الميزة.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter>
                <Button 
                  disabled={!isGoogleDriveConnected}
                  className="w-full"
                  onClick={saveSettings}
                >
                  <Save className="ml-2 h-4 w-4" />
                  حفظ إعدادات السحابة
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>تفضيلات تنزيل النسخ الاحتياطية</CardTitle>
              <CardDescription>
                اختر التنسيق المفضل لتنزيل الملفات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>تنسيق التنزيل الافتراضي</Label>
                  <Select 
                    defaultValue={downloadFormat}
                    onValueChange={(value) => setDownloadFormat(value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر التنسيق" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compressed">ملف مضغوط (ZIP)</SelectItem>
                      <SelectItem value="original">ملف أصلي (غير مضغوط)</SelectItem>
                      <SelectItem value="sql">SQL</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse gap-2">
                  <Button className="flex-1" variant="outline">
                    <File className="ml-2 h-4 w-4" />
                    تنزيل أحدث نسخة احتياطية
                  </Button>
                  <Button className="flex-1" variant="outline" disabled={!isGoogleDriveConnected}>
                    <CloudDownload className="ml-2 h-4 w-4" />
                    تنزيل من السحابة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات النسخ الاحتياطي المتقدمة</CardTitle>
                <CardDescription>
                  ضبط الخيارات المتقدمة لعمليات النسخ الاحتياطي
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="encryptBackup">تشفير النسخة الاحتياطية</Label>
                  <Switch 
                    id="encryptBackup"
                    checked={settings.encryptBackup}
                    onCheckedChange={(checked) => updateSetting("encryptBackup", checked)}
                  />
                </div>
                
                {settings.encryptBackup && (
                  <div className="space-y-2">
                    <Label htmlFor="encryptionPassword">كلمة مرور التشفير</Label>
                    <Input 
                      type="password" 
                      id="encryptionPassword"
                      value={settings.encryptionPassword || ""}
                      onChange={(e) => updateSetting("encryptionPassword", e.target.value)}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="compressionLevel">مستوى الضغط</Label>
                  <Select 
                    defaultValue={settings.compressionLevel}
                    onValueChange={(value) => updateSetting("compressionLevel", value as any)}
                  >
                    <SelectTrigger id="compressionLevel">
                      <SelectValue placeholder="اختر مستوى الضغط" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">بدون ضغط</SelectItem>
                      <SelectItem value="low">منخفض</SelectItem>
                      <SelectItem value="medium">متوسط</SelectItem>
                      <SelectItem value="high">عالي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-attachments">تضمين المرفقات</Label>
                  <Switch 
                    id="include-attachments"
                    checked={settings.includeAttachments}
                    onCheckedChange={(checked) => updateSetting("includeAttachments", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-settings">تضمين الإعدادات</Label>
                  <Switch 
                    id="include-settings"
                    checked={settings.includeSettings}
                    onCheckedChange={(checked) => updateSetting("includeSettings", checked)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={saveSettings} 
                  disabled={isLoading}
                >
                  <Save className="ml-2 h-4 w-4" />
                  حفظ الإعد����دات المتقدمة
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>إعدادات وجهة النسخ الاحتياطي</CardTitle>
                <CardDescription>
                  ضبط إعدادات وجهات النسخ الاحتياطي المختلفة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {settings.destinationType === "ftp" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="ftpHost">عنوان الخادم</Label>
                      <Input 
                        id="ftpHost"
                        value={settings.ftpHost || ""}
                        onChange={(e) => updateSetting("ftpHost", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ftpPort">رقم المنفذ</Label>
                      <Input 
                        id="ftpPort"
                        type="number"
                        value={settings.ftpPort || 21}
                        min="1"
                        max="65535"
                        onChange={(e) => updateSetting("ftpPort", parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ftpUsername">اسم المستخدم</Label>
                      <Input 
                        id="ftpUsername"
                        value={settings.ftpUsername || ""}
                        onChange={(e) => updateSetting("ftpUsername", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ftpPassword">كلمة المرور</Label>
                      <Input 
                        id="ftpPassword"
                        type="password"
                        value={settings.ftpPassword || ""}
                        onChange={(e) => updateSetting("ftpPassword", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ftpPath">مسار التخزين</Label>
                      <Input 
                        id="ftpPath"
                        value={settings.ftpPath || "/backups"}
                        onChange={(e) => updateSetting("ftpPath", e.target.value)}
                      />
                    </div>
                  </>
                )}
                
                {settings.destinationType === "cloud" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="cloudProvider">مزود الخدمة السحابية</Label>
                      <Select 
                        defaultValue={settings.cloudProvider}
                        onValueChange={(value) => updateSetting("cloudProvider", value as any)}
                      >
                        <SelectTrigger id="cloudProvider">
                          <SelectValue placeholder="اختر مزود الخدمة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="google-drive">Google Drive</SelectItem>
                          <SelectItem value="dropbox">Dropbox</SelectItem>
                          <SelectItem value="onedrive">OneDrive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cloudFolderId">معرف المجلد</Label>
                      <Input 
                        id="cloudFolderId"
                        value={settings.cloudFolderId || ""}
                        onChange={(e) => updateSetting("cloudFolderId", e.target.value)}
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={connectGoogleDrive}
                      disabled={isConnectingGoogleDrive || isGoogleDriveConnected}
                    >
                      <FileUp className="ml-2 h-4 w-4" />
                      {isGoogleDriveConnected ? 
                        'تم الاتصال بالخدمة السحابية' : 
                        'تكوين الاتصال بالخدمة السحابية'}
                    </Button>
                  </>
                )}
                
                {settings.destinationType === "local" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="location">مسار التخزين المحلي</Label>
                      <Input 
                        id="location"
                        value={settings.location}
                        onChange={(e) => updateSetting("location", e.target.value)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      يمكنك تحديد مسار مجلد على جهاز الخادم لتخزين النسخ الاحتياطية فيه.
                    </p>
                  </>
                )}
                
                {settings.destinationType === "email" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="emailRecipients">البريد الإلكتروني للمستلمين</Label>
                      <div className="flex gap-2">
                        <Input
                          type="email" 
                          id="emailRecipients"
                          value={sendEmailTo}
                          onChange={(e) => setSendEmailTo(e.target.value)}
                          placeholder="email@example.com"
                        />
                        <Button
                          variant="outline"
                          onClick={() => {
                            if (sendEmailTo) {
                              const currentRecipients = settings.emailRecipients || [];
                              updateSetting("emailRecipients", [...currentRecipients, sendEmailTo]);
                              setSendEmailTo("");
                            }
                          }}
                        >
                          إضافة
                        </Button>
                      </div>
                    </div>
                    
                    {settings.emailRecipients && settings.emailRecipients.length > 0 && (
                      <div className="space-y-2">
                        <Label>المستلمون</Label>
                        <div className="flex flex-wrap gap-2">
                          {settings.emailRecipients.map((email, index) => (
                            <div key={index} className="bg-gray-100 text-gray-800 text-sm rounded-full px-3 py-1 flex items-center">
                              {email}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const updatedRecipients = [...settings.emailRecipients || []];
                                  updatedRecipients.splice(index, 1);
                                  updateSetting("emailRecipients", updatedRecipients);
                                }}
                                className="ml-1 h-4 w-4 p-0 text-gray-500 hover:text-gray-700"
                              >
                                &times;
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={saveSettings} 
                  disabled={isLoading}
                >
                  <Save className="ml-2 h-4 w-4" />
                  حفظ إعدادات الوجهة
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackupPage;

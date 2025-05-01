
import React from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, RefreshCw, Save, UploadCloud, FileUp, Download, Trash2, Mail } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { useBackupSettings } from "@/hooks/useBackupSettings";

const BackupPage = () => {
  const {
    settings,
    isLoading,
    isBackingUp,
    isRestoring,
    backupProgress,
    restoreProgress,
    updateSetting,
    saveSettings,
    createManualBackup,
    restoreBackup,
    deleteBackup,
    downloadBackup,
    sendBackupByEmail
  } = useBackupSettings();

  const [sendEmailTo, setSendEmailTo] = React.useState("");
  
  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="النسخ الاحتياطي واستعادة البيانات" />

      <Tabs defaultValue="schedule" className="mt-6">
        <TabsList className="mb-6">
          <TabsTrigger value="schedule">جدولة النسخ الاحتياطي</TabsTrigger>
          <TabsTrigger value="backups">النسخ الاحتياطية</TabsTrigger>
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
                  onClick={createManualBackup} 
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
                          <TableCell>{
                            backup.destination === 'local' ? 'محلي' :
                            backup.destination === 'cloud' ? 'سحابي' : 
                            backup.destination === 'email' ? 'بريد إلكتروني' : 'FTP'
                          }</TableCell>
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
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => restoreBackup(backup.id)}
                                disabled={isRestoring || backup.status !== 'success'}
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => downloadBackup(backup.id)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
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
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => deleteBackup(backup.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
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
                  حفظ الإعدادات المتقدمة
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
                    >
                      <FileUp className="ml-2 h-4 w-4" />
                      تكوين الاتصال بالخدمة السحابية
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

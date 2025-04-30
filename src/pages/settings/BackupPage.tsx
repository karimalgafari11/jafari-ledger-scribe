
import React, { useState } from 'react';
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DatabaseBackup, 
  Upload, 
  Download, 
  Trash2, 
  Send, 
  RotateCw, 
  Clock, 
  Database, 
  Lock, 
  Settings
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useBackupSettings } from "@/hooks/useBackupSettings";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

const BackupPage = () => {
  const {
    settings,
    isLoading,
    isRestoring,
    isBackingUp,
    restoreProgress,
    backupProgress,
    updateSetting,
    updateSettings,
    saveSettings,
    createManualBackup,
    restoreBackup,
    deleteBackup,
    downloadBackup,
    sendBackupByEmail
  } = useBackupSettings();

  const [emailAddress, setEmailAddress] = useState("");
  const [selectedBackupId, setSelectedBackupId] = useState("");
  const [activeTab, setActiveTab] = useState("schedule");

  const handleSave = async () => {
    await saveSettings();
  };

  const formatDate = (date: Date) => {
    return format(date, 'yyyy-MM-dd HH:mm', { locale: ar });
  };
  
  return (
    <Layout className="rtl">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">إعدادات النسخ الاحتياطي</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleSave} 
              disabled={isLoading}
            >
              {isLoading ? "جاري الحفظ..." : "حفظ الإعدادات"}
            </Button>
            <Button 
              onClick={createManualBackup} 
              className="bg-green-600 hover:bg-green-700"
              disabled={isBackingUp}
            >
              {isBackingUp ? (
                <span className="flex items-center">
                  <RotateCw className="h-4 w-4 mr-2 animate-spin" />
                  جاري النسخ...
                </span>
              ) : (
                <span className="flex items-center">
                  <Upload className="h-4 w-4 mr-2" />
                  نسخ احتياطي الآن
                </span>
              )}
            </Button>
          </div>
        </div>

        {isBackingUp && (
          <Alert className="mb-6">
            <DatabaseBackup className="h-4 w-4" />
            <AlertTitle>جاري إنشاء نسخة احتياطية...</AlertTitle>
            <AlertDescription>
              <Progress className="mt-2" value={backupProgress} />
            </AlertDescription>
          </Alert>
        )}

        {isRestoring && (
          <Alert className="mb-6">
            <RotateCw className="h-4 w-4" />
            <AlertTitle>جاري استعادة النسخة الاحتياطية...</AlertTitle>
            <AlertDescription>
              <Progress className="mt-2" value={restoreProgress} />
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 grid grid-cols-5 h-auto">
            <TabsTrigger value="schedule" className="flex items-center gap-2 px-4 py-3">
              <Clock className="h-4 w-4" />
              <span>الجدولة</span>
            </TabsTrigger>
            <TabsTrigger value="destination" className="flex items-center gap-2 px-4 py-3">
              <Database className="h-4 w-4" />
              <span>وجهة النسخ</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 px-4 py-3">
              <Lock className="h-4 w-4" />
              <span>الأمان</span>
            </TabsTrigger>
            <TabsTrigger value="options" className="flex items-center gap-2 px-4 py-3">
              <Settings className="h-4 w-4" />
              <span>خيارات متقدمة</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2 px-4 py-3">
              <DatabaseBackup className="h-4 w-4" />
              <span>سجل النسخ</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-6 w-6" />
                  جدولة النسخ الاحتياطي
                </CardTitle>
                <CardDescription>تحديد موعد وتكرار النسخ الاحتياطي التلقائي</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="frequency">تكرار النسخ الاحتياطي</Label>
                    <Select 
                      value={settings.frequency} 
                      onValueChange={(value) => updateSetting('frequency', value as any)}
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
                      id="time" 
                      type="time" 
                      value={settings.time} 
                      onChange={(e) => updateSetting('time', e.target.value)} 
                      disabled={settings.frequency === 'manual'}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keepBackups">عدد النسخ المحفوظة</Label>
                    <Input 
                      id="keepBackups" 
                      type="number" 
                      value={settings.keepBackups} 
                      onChange={(e) => updateSetting('keepBackups', parseInt(e.target.value))}
                      min="1"
                    />
                  </div>

                  <div className="space-y-2 flex items-end">
                    <div className="space-y-2 flex items-center gap-2">
                      <Switch 
                        id="autoRestore" 
                        checked={settings.autoRestore} 
                        onCheckedChange={(checked) => updateSetting('autoRestore', checked)}
                      />
                      <Label htmlFor="autoRestore">استعادة تلقائية عند فشل النظام</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="destination">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-6 w-6" />
                  وجهة النسخ الاحتياطي
                </CardTitle>
                <CardDescription>تحديد أماكن تخزين النسخ الاحتياطية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <RadioGroup 
                    value={settings.destinationType}
                    onValueChange={(value) => updateSetting('destinationType', value as any)}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="local" id="local" />
                      <Label htmlFor="local">التخزين المحلي</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="ftp" id="ftp" />
                      <Label htmlFor="ftp">خادم FTP</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="cloud" id="cloud" />
                      <Label htmlFor="cloud">التخزين السحابي</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="email" id="email" />
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                    </div>
                  </RadioGroup>

                  {settings.destinationType === 'local' && (
                    <div className="space-y-2 border-t pt-4">
                      <Label htmlFor="location">مسار التخزين المحلي</Label>
                      <Input 
                        id="location" 
                        value={settings.location} 
                        onChange={(e) => updateSetting('location', e.target.value)} 
                      />
                    </div>
                  )}

                  {settings.destinationType === 'ftp' && (
                    <div className="space-y-4 border-t pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ftpHost">عنوان الخادم</Label>
                          <Input 
                            id="ftpHost" 
                            value={settings.ftpHost || ''} 
                            onChange={(e) => updateSetting('ftpHost', e.target.value)} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ftpPort">المنفذ</Label>
                          <Input 
                            id="ftpPort" 
                            type="number" 
                            value={settings.ftpPort || 21} 
                            onChange={(e) => updateSetting('ftpPort', parseInt(e.target.value))} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ftpUsername">اسم المستخدم</Label>
                          <Input 
                            id="ftpUsername" 
                            value={settings.ftpUsername || ''} 
                            onChange={(e) => updateSetting('ftpUsername', e.target.value)} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ftpPassword">كلمة المرور</Label>
                          <Input 
                            id="ftpPassword" 
                            type="password" 
                            value={settings.ftpPassword || ''} 
                            onChange={(e) => updateSetting('ftpPassword', e.target.value)} 
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="ftpPath">المسار على الخادم</Label>
                          <Input 
                            id="ftpPath" 
                            value={settings.ftpPath || '/backup/'} 
                            onChange={(e) => updateSetting('ftpPath', e.target.value)} 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {settings.destinationType === 'cloud' && (
                    <div className="space-y-4 border-t pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cloudProvider">مزود الخدمة السحابية</Label>
                        <Select 
                          value={settings.cloudProvider || 'google-drive'} 
                          onValueChange={(value) => updateSetting('cloudProvider', value as any)}
                        >
                          <SelectTrigger>
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
                        <Label htmlFor="cloudAuthToken">رمز الوصول</Label>
                        <Input 
                          id="cloudAuthToken" 
                          value={settings.cloudAuthToken || ''} 
                          onChange={(e) => updateSetting('cloudAuthToken', e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cloudFolderId">معرف المجلد</Label>
                        <Input 
                          id="cloudFolderId" 
                          value={settings.cloudFolderId || ''} 
                          onChange={(e) => updateSetting('cloudFolderId', e.target.value)} 
                        />
                      </div>
                      <Button variant="outline">اختبار الاتصال</Button>
                    </div>
                  )}

                  {settings.destinationType === 'email' && (
                    <div className="space-y-4 border-t pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="emailRecipients">عناوين البريد الإلكتروني</Label>
                        <Input 
                          id="emailRecipients" 
                          placeholder="أدخل عناوين البريد مفصولة بفواصل"
                          value={settings.emailRecipients?.join(',') || ''} 
                          onChange={(e) => updateSetting('emailRecipients', e.target.value.split(','))} 
                        />
                        <p className="text-xs text-muted-foreground mt-1">أدخل عناوين البريد الإلكتروني مفصولة بفواصل</p>
                      </div>
                      <Button variant="outline">اختبار الإرسال</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-6 w-6" />
                  إعدادات الأمان
                </CardTitle>
                <CardDescription>تشفير وحماية النسخ الاحتياطية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 space-x-reverse justify-between border-b pb-4">
                    <div>
                      <Label htmlFor="encryptBackup">تشفير النسخ الاحتياطية</Label>
                      <p className="text-sm text-muted-foreground">حماية النسخ الاحتياطية باستخدام التشفير</p>
                    </div>
                    <Switch 
                      id="encryptBackup" 
                      checked={settings.encryptBackup} 
                      onCheckedChange={(checked) => updateSetting('encryptBackup', checked)}
                    />
                  </div>

                  {settings.encryptBackup && (
                    <div className="space-y-2">
                      <Label htmlFor="encryptionPassword">كلمة مرور التشفير</Label>
                      <Input 
                        id="encryptionPassword" 
                        type="password" 
                        value={settings.encryptionPassword || ''} 
                        onChange={(e) => updateSetting('encryptionPassword', e.target.value)} 
                      />
                      <p className="text-xs text-muted-foreground mt-1">تحذير: في حال فقدان كلمة المرور، لن تتمكن من استعادة النسخة الاحتياطية</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="options">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-6 w-6" />
                  خيارات متقدمة
                </CardTitle>
                <CardDescription>إعدادات متقدمة للنسخ الاحتياطي</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="compressionLevel">مستوى الضغط</Label>
                    <Select 
                      value={settings.compressionLevel} 
                      onValueChange={(value) => updateSetting('compressionLevel', value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر مستوى الضغط" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">بدون ضغط</SelectItem>
                        <SelectItem value="low">ضغط منخفض</SelectItem>
                        <SelectItem value="medium">ضغط متوسط</SelectItem>
                        <SelectItem value="high">ضغط مرتفع</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4 border-t pt-4">
                    <h3 className="text-lg font-medium">محتوى النسخ الاحتياطي</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox 
                          id="includeSettings" 
                          checked={settings.includeSettings} 
                          onCheckedChange={(checked) => updateSetting('includeSettings', checked === true)}
                        />
                        <Label htmlFor="includeSettings">تضمين إعدادات النظام</Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox 
                          id="includeAttachments" 
                          checked={settings.includeAttachments} 
                          onCheckedChange={(checked) => updateSetting('includeAttachments', checked === true)}
                        />
                        <Label htmlFor="includeAttachments">تضمين المرفقات والملفات</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DatabaseBackup className="h-6 w-6" />
                  سجل النسخ الاحتياطية
                </CardTitle>
                <CardDescription>تاريخ النسخ الاحتياطية وإمكانية استعادتها</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-right py-3 px-4 font-medium">التاريخ</th>
                        <th className="text-right py-3 px-4 font-medium">الحجم</th>
                        <th className="text-right py-3 px-4 font-medium">النوع</th>
                        <th className="text-right py-3 px-4 font-medium">الحالة</th>
                        <th className="text-right py-3 px-4 font-medium">الوجهة</th>
                        <th className="text-right py-3 px-4 font-medium">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {settings.backupHistory.map((backup) => (
                        <tr key={backup.id} className="border-b">
                          <td className="py-3 px-4">{formatDate(new Date(backup.createdAt))}</td>
                          <td className="py-3 px-4">{backup.size}</td>
                          <td className="py-3 px-4">{backup.type === 'auto' ? 'تلقائي' : 'يدوي'}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              backup.status === 'success' 
                                ? 'bg-green-100 text-green-800' 
                                : backup.status === 'failed' 
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {backup.status === 'success' ? 'ناجح' : 
                               backup.status === 'failed' ? 'فشل' : 'قيد التنفيذ'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {backup.destination === 'local' ? 'محلي' : 
                             backup.destination === 'ftp' ? 'FTP' : 
                             backup.destination === 'cloud' ? 'سحابي' : 'بريد إلكتروني'}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedBackupId(backup.id)}>
                                    <RotateCw className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>تأكيد استعادة النسخة الاحتياطية</DialogTitle>
                                    <DialogDescription>
                                      هل أنت متأكد من استعادة النسخة الاحتياطية بتاريخ {formatDate(new Date(backup.createdAt))}؟
                                      <br />
                                      سيتم استبدال البيانات الحالية بالكامل بالبيانات الموجودة في النسخة الاحتياطية.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button variant="outline">إلغاء</Button>
                                    </DialogClose>
                                    <Button
                                      onClick={() => restoreBackup(backup.id)}
                                      className="bg-amber-600 hover:bg-amber-700"
                                    >
                                      تأكيد الاستعادة
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => downloadBackup(backup.id)}>
                                <Download className="h-4 w-4" />
                              </Button>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedBackupId(backup.id)}>
                                    <Send className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>إرسال النسخة الاحتياطية بالبريد الإلكتروني</DialogTitle>
                                    <DialogDescription>
                                      أدخل عنوان البريد الإلكتروني لإرسال النسخة الاحتياطية إليه
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-2 py-4">
                                    <Label htmlFor="email-input">البريد الإلكتروني</Label>
                                    <Input 
                                      id="email-input"
                                      value={emailAddress}
                                      onChange={(e) => setEmailAddress(e.target.value)}
                                      placeholder="example@domain.com"
                                    />
                                  </div>
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button variant="outline">إلغاء</Button>
                                    </DialogClose>
                                    <Button
                                      onClick={() => sendBackupByEmail(backup.id, emailAddress)}
                                      className="bg-blue-600 hover:bg-blue-700"
                                    >
                                      إرسال
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => setSelectedBackupId(backup.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>تأكيد حذف النسخة الاحتياطية</DialogTitle>
                                    <DialogDescription>
                                      هل أنت متأكد من حذف النسخة الاحتياطية بتاريخ {formatDate(new Date(backup.createdAt))}؟
                                      <br />
                                      هذا الإجراء لا يمكن التراجع عنه.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button variant="outline">إلغاء</Button>
                                    </DialogClose>
                                    <Button
                                      onClick={() => deleteBackup(backup.id)}
                                      variant="destructive"
                                    >
                                      تأكيد الحذف
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </td>
                        </tr>
                      ))}
                      
                      {settings.backupHistory.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-6 text-center text-muted-foreground">
                            لا توجد نسخ احتياطية مسجلة
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default BackupPage;


import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Database, Download, Upload, Calendar, RotateCw, Clock, Cloud, HardDrive, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatDate } from "@/utils/formatters";

// Mock backups data
const mockBackups = [
  {
    id: "1",
    name: "النسخة الاحتياطية اليومية",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    size: "45.2 ميجابايت",
    type: "يومي",
    status: "completed",
    path: "/backups/daily-2023-05-11.zip"
  },
  {
    id: "2",
    name: "النسخة الاحتياطية الأسبوعية",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    size: "120.5 ميجابايت",
    type: "أسبوعي",
    status: "completed",
    path: "/backups/weekly-2023-05-05.zip"
  },
  {
    id: "3",
    name: "النسخة الاحتياطية الشهرية",
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    size: "350.8 ميجابايت",
    type: "شهري",
    status: "completed",
    path: "/backups/monthly-2023-04-12.zip"
  },
  {
    id: "4",
    name: "نسخة احتياطية يدوية",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    size: "55.3 ميجابايت",
    type: "يدوي",
    status: "completed",
    path: "/backups/manual-2023-05-10.zip"
  }
];

// Mock backup settings
const mockBackupSettings = {
  automatic: true,
  dailyBackup: true,
  dailyBackupTime: "02:00",
  weeklyBackup: true,
  weeklyBackupDay: "saturday",
  weeklyBackupTime: "03:00",
  monthlyBackup: true,
  monthlyBackupDay: "1",
  monthlyBackupTime: "04:00",
  retentionDays: 30,
  retentionWeekly: 12,
  retentionMonthly: 12,
  compressBackups: true,
  backupLocation: "local",
  cloudProvider: "",
  cloudSettings: {
    accessKey: "",
    secretKey: "",
    bucket: "",
    region: ""
  }
};

const BackupPage = () => {
  const [backups, setBackups] = useState(mockBackups);
  const [settings, setSettings] = useState(mockBackupSettings);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("backups");

  const handleSaveSettings = () => {
    toast.success("تم حفظ إعدادات النسخ الاحتياطي بنجاح");
  };

  const handleCreateBackup = () => {
    setIsCreatingBackup(true);
    setBackupProgress(0);
    
    // Simulate backup process
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCreatingBackup(false);
          
          // Add new backup to the list
          const newBackup = {
            id: (backups.length + 1).toString(),
            name: "نسخة احتياطية يدوية",
            date: new Date(),
            size: "60.7 ميجابايت",
            type: "يدوي",
            status: "completed",
            path: `/backups/manual-${new Date().toISOString().split('T')[0]}.zip`
          };
          
          setBackups(prev => [newBackup, ...prev]);
          toast.success("تم إنشاء النسخة الاحتياطية بنجاح");
          return 0;
        }
        return prev + 5;
      });
    }, 300);
  };

  const handleRestoreBackup = () => {
    if (selectedBackup) {
      toast.info(`جاري استعادة النسخة الاحتياطية: ${selectedBackup.name}`);
      
      // Simulate restore process
      setTimeout(() => {
        toast.success("تم استعادة النسخة الاحتياطية بنجاح");
        setIsRestoreDialogOpen(false);
      }, 3000);
    }
  };

  const handleDeleteBackup = (backupId: string) => {
    setBackups(prev => prev.filter(backup => backup.id !== backupId));
    toast.success("تم حذف النسخة الاحتياطية بنجاح");
  };

  const handleToggleSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleChangeSettingValue = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleChangeCloudSetting = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      cloudSettings: {
        ...prev.cloudSettings,
        [key]: value
      }
    }));
  };

  return (
    <PageContainer title="النسخ الاحتياطي" showBack={true}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إدارة النسخ الاحتياطي</h1>
          <Button onClick={handleCreateBackup} disabled={isCreatingBackup}>
            <Database className="ml-2 h-4 w-4" />
            إنشاء نسخة احتياطية
          </Button>
        </div>

        {isCreatingBackup && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>جاري إنشاء نسخة احتياطية...</span>
                  <span>{backupProgress}%</span>
                </div>
                <Progress value={backupProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="backups" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="backups">النسخ الاحتياطية</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            <TabsTrigger value="cloud">التخزين السحابي</TabsTrigger>
          </TabsList>
          
          <TabsContent value="backups">
            <Card>
              <CardHeader>
                <CardTitle>النسخ الاحتياطية المتوفرة</CardTitle>
                <CardDescription>
                  قائمة بجميع النسخ الاحتياطية المتوفرة للنظام
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم النسخة</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>الحجم</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead className="text-left">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {backups.map((backup) => (
                      <TableRow key={backup.id}>
                        <TableCell className="font-medium">{backup.name}</TableCell>
                        <TableCell>{formatDate(backup.date)}</TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {backup.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default" className="bg-green-500">
                            {backup.status === "completed" ? "مكتمل" : "جاري"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedBackup(backup);
                                setIsRestoreDialogOpen(true);
                              }}
                            >
                              <RotateCw className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toast.success(`تم تنزيل النسخة الاحتياطية: ${backup.name}`)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteBackup(backup.id)}
                            >
                              <Database className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات النسخ الاحتياطي</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertTitle className="flex items-center">
                    <Clock className="h-4 w-4 ml-2" />
                    النسخ الاحتياطي التلقائي
                  </AlertTitle>
                  <AlertDescription>
                    تمكين النسخ الاحتياطي التلقائي بشكل دوري (يومي، أسبوعي، شهري)
                  </AlertDescription>
                </Alert>
                
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch
                    id="automatic"
                    checked={settings.automatic}
                    onCheckedChange={(checked) => handleToggleSetting("automatic", checked)}
                  />
                  <Label htmlFor="automatic" className="mr-2">تفعيل النسخ الاحتياطي التلقائي</Label>
                </div>
                
                {settings.automatic && (
                  <>
                    <div className="border p-4 rounded-md space-y-4">
                      <h3 className="text-md font-medium flex items-center">
                        <Calendar className="h-4 w-4 ml-2" />
                        النسخ الاحتياطي اليومي
                      </h3>
                      
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Switch
                          id="dailyBackup"
                          checked={settings.dailyBackup}
                          onCheckedChange={(checked) => handleToggleSetting("dailyBackup", checked)}
                        />
                        <Label htmlFor="dailyBackup" className="mr-2">تفعيل النسخ الاحتياطي اليومي</Label>
                      </div>
                      
                      {settings.dailyBackup && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-8">
                          <div className="space-y-2">
                            <Label htmlFor="dailyBackupTime">وقت النسخ اليومي</Label>
                            <Input
                              id="dailyBackupTime"
                              type="time"
                              value={settings.dailyBackupTime}
                              onChange={(e) => handleChangeSettingValue("dailyBackupTime", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="retentionDays">مدة الاحتفاظ (بالأيام)</Label>
                            <Input
                              id="retentionDays"
                              type="number"
                              value={settings.retentionDays}
                              onChange={(e) => handleChangeSettingValue("retentionDays", parseInt(e.target.value))}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="border p-4 rounded-md space-y-4">
                      <h3 className="text-md font-medium flex items-center">
                        <Calendar className="h-4 w-4 ml-2" />
                        النسخ الاحتياطي الأسبوعي
                      </h3>
                      
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Switch
                          id="weeklyBackup"
                          checked={settings.weeklyBackup}
                          onCheckedChange={(checked) => handleToggleSetting("weeklyBackup", checked)}
                        />
                        <Label htmlFor="weeklyBackup" className="mr-2">تفعيل النسخ الاحتياطي الأسبوعي</Label>
                      </div>
                      
                      {settings.weeklyBackup && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mr-8">
                          <div className="space-y-2">
                            <Label htmlFor="weeklyBackupDay">يوم النسخ الأسبوعي</Label>
                            <Select
                              value={settings.weeklyBackupDay}
                              onValueChange={(value) => handleChangeSettingValue("weeklyBackupDay", value)}
                            >
                              <SelectTrigger id="weeklyBackupDay">
                                <SelectValue placeholder="اختر اليوم" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="saturday">السبت</SelectItem>
                                <SelectItem value="sunday">الأحد</SelectItem>
                                <SelectItem value="monday">الإثنين</SelectItem>
                                <SelectItem value="tuesday">الثلاثاء</SelectItem>
                                <SelectItem value="wednesday">الأربعاء</SelectItem>
                                <SelectItem value="thursday">الخميس</SelectItem>
                                <SelectItem value="friday">الجمعة</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="weeklyBackupTime">وقت النسخ الأسبوعي</Label>
                            <Input
                              id="weeklyBackupTime"
                              type="time"
                              value={settings.weeklyBackupTime}
                              onChange={(e) => handleChangeSettingValue("weeklyBackupTime", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="retentionWeekly">مدة الاحتفاظ (بالأسابيع)</Label>
                            <Input
                              id="retentionWeekly"
                              type="number"
                              value={settings.retentionWeekly}
                              onChange={(e) => handleChangeSettingValue("retentionWeekly", parseInt(e.target.value))}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="border p-4 rounded-md space-y-4">
                      <h3 className="text-md font-medium flex items-center">
                        <Calendar className="h-4 w-4 ml-2" />
                        النسخ الاحتياطي الشهري
                      </h3>
                      
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Switch
                          id="monthlyBackup"
                          checked={settings.monthlyBackup}
                          onCheckedChange={(checked) => handleToggleSetting("monthlyBackup", checked)}
                        />
                        <Label htmlFor="monthlyBackup" className="mr-2">تفعيل النسخ الاحتياطي الشهري</Label>
                      </div>
                      
                      {settings.monthlyBackup && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mr-8">
                          <div className="space-y-2">
                            <Label htmlFor="monthlyBackupDay">يوم النسخ الشهري</Label>
                            <Select
                              value={settings.monthlyBackupDay}
                              onValueChange={(value) => handleChangeSettingValue("monthlyBackupDay", value)}
                            >
                              <SelectTrigger id="monthlyBackupDay">
                                <SelectValue placeholder="اختر اليوم" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 31 }, (_, i) => (
                                  <SelectItem key={i+1} value={(i+1).toString()}>
                                    {i+1}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="monthlyBackupTime">وقت النسخ الشهري</Label>
                            <Input
                              id="monthlyBackupTime"
                              type="time"
                              value={settings.monthlyBackupTime}
                              onChange={(e) => handleChangeSettingValue("monthlyBackupTime", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="retentionMonthly">مدة الاحتفاظ (بالأشهر)</Label>
                            <Input
                              id="retentionMonthly"
                              type="number"
                              value={settings.retentionMonthly}
                              onChange={(e) => handleChangeSettingValue("retentionMonthly", parseInt(e.target.value))}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
                
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch
                    id="compressBackups"
                    checked={settings.compressBackups}
                    onCheckedChange={(checked) => handleToggleSetting("compressBackups", checked)}
                  />
                  <Label htmlFor="compressBackups" className="mr-2">ضغط النسخ الاحتياطية</Label>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveSettings}>
                    حفظ الإعدادات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cloud">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات التخزين السحابي</CardTitle>
                <CardDescription>
                  تكوين التخزين السحابي للنسخ الاحتياطية
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <input
                        type="radio"
                        id="localStorage"
                        name="backupLocation"
                        value="local"
                        checked={settings.backupLocation === "local"}
                        onChange={() => handleChangeSettingValue("backupLocation", "local")}
                        className="ml-2"
                      />
                      <Label htmlFor="localStorage" className="flex items-center">
                        <HardDrive className="h-4 w-4 ml-2" />
                        التخزين المحلي
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <input
                        type="radio"
                        id="cloudStorage"
                        name="backupLocation"
                        value="cloud"
                        checked={settings.backupLocation === "cloud"}
                        onChange={() => handleChangeSettingValue("backupLocation", "cloud")}
                        className="ml-2"
                      />
                      <Label htmlFor="cloudStorage" className="flex items-center">
                        <Cloud className="h-4 w-4 ml-2" />
                        التخزين السحابي
                      </Label>
                    </div>
                  </div>
                  
                  {settings.backupLocation === "cloud" && (
                    <div className="border p-4 rounded-md space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cloudProvider">مزود الخدمة السحابية</Label>
                        <Select
                          value={settings.cloudProvider}
                          onValueChange={(value) => handleChangeSettingValue("cloudProvider", value)}
                        >
                          <SelectTrigger id="cloudProvider">
                            <SelectValue placeholder="اختر مزود الخدمة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aws">Amazon S3</SelectItem>
                            <SelectItem value="gcp">Google Cloud Storage</SelectItem>
                            <SelectItem value="azure">Microsoft Azure</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {settings.cloudProvider && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="accessKey">مفتاح الوصول</Label>
                            <Input
                              id="accessKey"
                              value={settings.cloudSettings.accessKey}
                              onChange={(e) => handleChangeCloudSetting("accessKey", e.target.value)}
                              placeholder="أدخل مفتاح الوصول"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="secretKey">المفتاح السري</Label>
                            <Input
                              id="secretKey"
                              type="password"
                              value={settings.cloudSettings.secretKey}
                              onChange={(e) => handleChangeCloudSetting("secretKey", e.target.value)}
                              placeholder="أدخل المفتاح السري"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bucket">اسم الحاوية</Label>
                            <Input
                              id="bucket"
                              value={settings.cloudSettings.bucket}
                              onChange={(e) => handleChangeCloudSetting("bucket", e.target.value)}
                              placeholder="أدخل اسم الحاوية"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="region">المنطقة</Label>
                            <Input
                              id="region"
                              value={settings.cloudSettings.region}
                              onChange={(e) => handleChangeCloudSetting("region", e.target.value)}
                              placeholder="أدخل المنطقة"
                            />
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center mt-4">
                        <Button variant="outline" onClick={() => toast.info("جاري اختبار الاتصال...")}>
                          اختبار الاتصال
                        </Button>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <ExternalLink className="h-4 w-4 ml-1" />
                          <a href="#" className="hover:underline">دليل الإعداد</a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveSettings}>
                    حفظ الإعدادات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialog for restoring a backup */}
        <Dialog open={isRestoreDialogOpen} onOpenChange={setIsRestoreDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تأكيد استعادة النسخة الاحتياطية</DialogTitle>
              <DialogDescription>
                هل أنت متأكد من أنك تريد استعادة النظام من النسخة الاحتياطية "{selectedBackup?.name}"؟ سيؤدي هذا إلى استبدال جميع البيانات الحالية.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRestoreDialogOpen(false)}>
                إلغاء
              </Button>
              <Button variant="destructive" onClick={handleRestoreBackup}>
                استعادة
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
};

export default BackupPage;

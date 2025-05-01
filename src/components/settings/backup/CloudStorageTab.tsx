import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { Cloud, CloudDownload, File, Folder, GoogleDrive, Download } from "lucide-react";
import { BackupSettings } from "@/types/settings";

interface CloudStorageTabProps {
  settings: BackupSettings;
  isConnectingGoogleDrive: boolean;
  downloadFormat: 'compressed' | 'original' | 'sql' | 'json';
  setDownloadFormat: (format: 'compressed' | 'original' | 'sql' | 'json') => void;
  updateSetting: <K extends keyof BackupSettings>(key: K, value: BackupSettings[K]) => void;
  saveSettings: () => Promise<boolean>;
  connectGoogleDrive: () => Promise<boolean>;
  disconnectGoogleDrive: () => Promise<boolean>;
  downloadFromGoogleDrive?: (backupId?: string) => Promise<boolean>;
}

export const CloudStorageTab: React.FC<CloudStorageTabProps> = ({
  settings,
  isConnectingGoogleDrive,
  downloadFormat,
  setDownloadFormat,
  updateSetting,
  saveSettings,
  connectGoogleDrive,
  disconnectGoogleDrive,
  downloadFromGoogleDrive
}) => {
  const isGoogleDriveConnected = settings.googleDriveAuth?.isAuthenticated || false;
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [googleEmail, setGoogleEmail] = useState("");
  const [authError, setAuthError] = useState("");
  const [showCloudBackupsDialog, setShowCloudBackupsDialog] = useState(false);
  const [selectedBackupId, setSelectedBackupId] = useState<string | undefined>(undefined);
  const [isAutoDownloading, setIsAutoDownloading] = useState(settings.autoDownloadFromCloud || false);
  const [showGoogleDriveExplorer, setShowGoogleDriveExplorer] = useState(false);
  const [googleDriveItems, setGoogleDriveItems] = useState<Array<{id: string, name: string, type: 'folder'|'file', size?: string}>>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [folderPath, setFolderPath] = useState<Array<{id: string | null, name: string}>>([{id: null, name: 'الرئيسية'}]);
  const [isLoadingGDriveContents, setIsLoadingGDriveContents] = useState(false);

  // Get cloud backups (those with googleDriveFileId)
  const cloudBackups = settings.backupHistory.filter(b => b.googleDriveFileId);

  useEffect(() => {
    // Set initial state for auto download
    setIsAutoDownloading(settings.autoDownloadFromCloud || false);
  }, [settings.autoDownloadFromCloud]);

  const handleGoogleDriveConnect = async () => {
    if (googleEmail.trim() === "") {
      setAuthError("يرجى إدخال البريد الإلكتروني لحساب Google");
      return;
    }
    
    // Store email in settings before connecting
    // Fix: Explicitly set isAuthenticated to false
    updateSetting("googleDriveAuth", {
      ...(settings.googleDriveAuth || {}),
      isAuthenticated: false, // Explicitly set to false initially
      email: googleEmail
    });
    
    setShowAuthDialog(false);
    const result = await connectGoogleDrive();
    
    if (result) {
      toast.success(`تم الاتصال بحساب Google Drive: ${googleEmail}`);
    } else {
      toast.error("فشل الاتصال بـ Google Drive، يرجى المحاولة مرة أخرى");
    }
  };
  
  const handleAutoBackupToggle = (checked: boolean) => {
    updateSetting("autoCloudBackup", checked);
  };
  
  const handleAutoDownloadToggle = (checked: boolean) => {
    setIsAutoDownloading(checked);
    updateSetting("autoDownloadFromCloud", checked);
  };
  
  const handleDownloadFromCloud = () => {
    if (!isGoogleDriveConnected) {
      toast.error("يرجى الاتصال بـ Google Drive أولاً");
      return;
    }
    
    // Show the Google Drive explorer dialog
    loadGoogleDriveContents(null);
    setShowGoogleDriveExplorer(true);
  };
  
  const handleDownloadBackup = async (backupId: string) => {
    if (!downloadFromGoogleDrive) {
      toast.error("وظيفة التنزيل من Google Drive غير متاحة");
      return;
    }
    
    setShowCloudBackupsDialog(false);
    const success = await downloadFromGoogleDrive(backupId);
    
    if (!success) {
      toast.error("فشل تنزيل النسخة الاحتياطية من Google Drive");
    }
  };

  // Simulate loading Google Drive contents
  const loadGoogleDriveContents = (folderId: string | null) => {
    setIsLoadingGDriveContents(true);
    
    // Update the folder path
    if (folderId === null) {
      // Reset to root
      setFolderPath([{id: null, name: 'الرئيسية'}]);
    } else {
      // Find the index of the folder in the current path (if it exists)
      const existingIndex = folderPath.findIndex(f => f.id === folderId);
      if (existingIndex >= 0) {
        // If we're navigating back, trim the path
        setFolderPath(folderPath.slice(0, existingIndex + 1));
      } else {
        // If it's a new folder, add it to the path
        const folderName = googleDriveItems.find(item => item.id === folderId)?.name || 'مجلد';
        setFolderPath([...folderPath, {id: folderId, name: folderName}]);
      }
    }
    
    // Set the current folder
    setCurrentFolderId(folderId);
    
    // Simulate API call to get folder contents
    setTimeout(() => {
      // Mock data - would be replaced with actual API call
      const mockItems = folderId === null ? [
        { id: 'folder1', name: 'النسخ الاحتياطية', type: 'folder' as const },
        { id: 'folder2', name: 'إعدادات النظام', type: 'folder' as const },
        { id: 'file1', name: 'backup_2023-05-01.zip', type: 'file' as const, size: '15.2 MB' },
        { id: 'file2', name: 'backup_2023-06-15.sql', type: 'file' as const, size: '8.7 MB' }
      ] : folderId === 'folder1' ? [
        { id: 'file3', name: 'weekly_backup_2023-07-01.zip', type: 'file' as const, size: '24.5 MB' },
        { id: 'file4', name: 'monthly_backup_2023-08-01.json', type: 'file' as const, size: '32.1 MB' },
        { id: 'folder3', name: 'نسخ قديمة', type: 'folder' as const }
      ] : folderId === 'folder2' ? [
        { id: 'file5', name: 'system_settings.json', type: 'file' as const, size: '1.2 MB' }
      ] : folderId === 'folder3' ? [
        { id: 'file6', name: 'archive_2022.zip', type: 'file' as const, size: '105.8 MB' }
      ] : [];
      
      setGoogleDriveItems(mockItems);
      setIsLoadingGDriveContents(false);
    }, 1000);
  };

  const downloadFileFromGoogleDrive = (fileId: string, fileName: string) => {
    toast.loading(`جاري تنزيل الملف: ${fileName}`);
    
    // Simulate download process
    setTimeout(() => {
      toast.success(`تم تنزيل الملف: ${fileName} بنجاح`);
      // Close the explorer
      setShowGoogleDriveExplorer(false);
    }, 2000);
  };

  return (
    <>
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
                
                <div className="space-y-2">
                  <Label>مسار التخزين السحابي</Label>
                  <Input 
                    type="text"
                    placeholder="مسار التخزين في Google Drive"
                    value={settings.cloudPath || ""}
                    onChange={e => updateSetting("cloudPath", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    على سبيل المثال: /نسخ-احتياطي/اسم-الشركة/
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
                
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">إعدادات السحابة</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    قم بربط حساب Google Drive للاستفادة من خدمات النسخ الاحتياطي السحابي، مما يوفر لك مساحة تخزين آمنة ويتيح لك الوصول إلى بياناتك من أي مكان.
                  </p>
                  <Button 
                    onClick={() => {
                      setAuthError("");
                      setShowAuthDialog(true);
                    }}
                    className="w-full"
                    variant="outline"
                  >
                    <Cloud className="ml-2 h-4 w-4" />
                    تسجيل الدخول إلى Google Drive
                  </Button>
                </div>
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
                onClick={() => {
                  setAuthError("");
                  setShowAuthDialog(true);
                }}
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
                checked={settings.autoCloudBackup || false}
                onCheckedChange={handleAutoBackupToggle}
                disabled={!isGoogleDriveConnected}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-cloud-download">تحميل تلقائي من السحابة</Label>
              <Switch 
                id="auto-cloud-download"
                checked={isAutoDownloading}
                onCheckedChange={handleAutoDownloadToggle}
                disabled={!isGoogleDriveConnected}
              />
            </div>
            
            <div className="space-y-2">
              <Label>تنسيق النسخ الاحتياطي</Label>
              <Select 
                defaultValue={settings.cloudBackupFormat || "compressed"} 
                onValueChange={(value) => updateSetting("cloudBackupFormat", value as any)}
                disabled={!isGoogleDriveConnected}
              >
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
            
            <div className="space-y-2">
              <Label>وجهة النسخ الاحتياطي</Label>
              <Select 
                defaultValue={settings.destinationType} 
                onValueChange={(value) => updateSetting("destinationType", value as "local" | "cloud" | "ftp" | "email")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الوجهة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">محلي</SelectItem>
                  <SelectItem value="cloud">سحابي (Google Drive)</SelectItem>
                  <SelectItem value="ftp">FTP</SelectItem>
                  <SelectItem value="email">بريد إلكتروني</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Alert>
              <AlertTitle>معلومات مهمة</AlertTitle>
              <AlertDescription>
                سيتم نسخ البيانات احتياطيًا إلى Google Drive تلقائيًا بعد كل نسخ احتياطي محلي إذا تم تفعيل هذه الميزة.
                {isAutoDownloading && (
                  <p className="mt-2 text-sm text-blue-700">
                    التحميل التلقائي من السحابة مفعّل. سيتم تحميل آخر نسخة احتياطية من Google Drive تلقائياً عند تشغيل النظام.
                  </p>
                )}
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button 
              disabled={!isGoogleDriveConnected && settings.destinationType === "cloud"}
              className="w-full"
              onClick={saveSettings}
            >
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    className="flex-1" 
                    variant="outline" 
                    disabled={!isGoogleDriveConnected}
                  >
                    <CloudDownload className="ml-2 h-4 w-4" />
                    تنزيل من السحابة
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="center">
                  <div className="grid gap-4 p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">خيارات التنزيل من Google Drive</h4>
                      <p className="text-sm text-muted-foreground">
                        اختر طريقة التنزيل من السحابة
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Button 
                        className="w-full" 
                        onClick={() => {
                          if (cloudBackups.length > 0) {
                            setShowCloudBackupsDialog(true);
                          } else {
                            toast.warning("لا توجد نسخ احتياطية في Google Drive");
                          }
                        }}
                      >
                        <Download className="ml-2 h-4 w-4" />
                        النسخ الاحتياطية المخزنة
                      </Button>
                      <Button 
                        className="w-full" 
                        onClick={handleDownloadFromCloud}
                      >
                        <GoogleDrive className="ml-2 h-4 w-4" />
                        تصفح ملفات Google Drive
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Google Drive Authentication Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="max-w-md rtl">
          <DialogHeader>
            <DialogTitle>تسجيل الدخول إلى Google Drive</DialogTitle>
            <DialogDescription>
              قم بإدخال بريدك الإلكتروني لربط حسابك مع Google Drive
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="google-email">البريد الإلكتروني</Label>
              <Input
                id="google-email"
                placeholder="أدخل بريدك الإلكتروني"
                value={googleEmail}
                onChange={(e) => setGoogleEmail(e.target.value)}
              />
              {authError && <p className="text-xs text-red-500">{authError}</p>}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-sm">
              <p className="text-blue-800">
                عند النقر على "متابعة" سيتم فتح نافذة جديدة للمصادقة مع Google Drive. 
                يرجى السماح للتطبيق بالوصول إلى ملفاتك للتمكن من إجراء النسخ الاحتياطي.
              </p>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="default"
              onClick={handleGoogleDriveConnect}
              disabled={isConnectingGoogleDrive}
            >
              {isConnectingGoogleDrive ? "جاري التسجيل..." : "متابعة"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAuthDialog(false)}
            >
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Cloud Backups Selection Dialog */}
      <Dialog open={showCloudBackupsDialog} onOpenChange={setShowCloudBackupsDialog}>
        <DialogContent className="max-w-md rtl">
          <DialogHeader>
            <DialogTitle>اختر نسخة احتياطية للتنزيل</DialogTitle>
            <DialogDescription>
              يرجى اختيار النسخة الاحتياطية التي ترغب في تنزيلها من Google Drive
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {cloudBackups.length > 0 ? (
              <div className="space-y-4">
                {cloudBackups.map(backup => (
                  <div 
                    key={backup.id} 
                    className={`p-3 border rounded-md cursor-pointer ${
                      selectedBackupId === backup.id ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                    onClick={() => setSelectedBackupId(backup.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{new Date(backup.createdAt).toLocaleDateString('ar-SA')}</p>
                        <p className="text-sm text-muted-foreground">{backup.size}</p>
                      </div>
                      <div className="text-xs bg-blue-100 text-blue-800 rounded px-2 py-1">
                        {backup.fileFormat === 'compressed' ? 'مضغوط' : 
                         backup.fileFormat === 'sql' ? 'SQL' : 
                         backup.fileFormat === 'json' ? 'JSON' : 'أصلي'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                لا توجد نسخ احتياطية مخزنة في Google Drive
              </div>
            )}
          </div>
          
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="default"
              onClick={() => selectedBackupId && handleDownloadBackup(selectedBackupId)}
              disabled={!selectedBackupId}
            >
              تنزيل
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCloudBackupsDialog(false)}
            >
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Google Drive Explorer Dialog */}
      <Dialog open={showGoogleDriveExplorer} onOpenChange={setShowGoogleDriveExplorer}>
        <DialogContent className="max-w-4xl rtl">
          <DialogHeader>
            <DialogTitle>تصفح ملفات Google Drive</DialogTitle>
            <DialogDescription>
              اختر الملف الذي ترغب في تحميله من Google Drive
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {/* Breadcrumb navigation */}
            <div className="flex flex-wrap items-center gap-1 mb-4 text-sm">
              {folderPath.map((folder, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span className="mx-1 text-muted-foreground">/</span>}
                  <button 
                    className={`hover:underline ${index === folderPath.length - 1 ? 'font-medium' : 'text-muted-foreground'}`}
                    onClick={() => loadGoogleDriveContents(folder.id)}
                  >
                    {folder.name}
                  </button>
                </React.Fragment>
              ))}
            </div>
            
            {isLoadingGDriveContents ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <p className="mb-2">جاري تحميل المحتويات...</p>
                  <Progress value={45} className="w-64" />
                </div>
              </div>
            ) : (
              <div className="border rounded-md">
                {googleDriveItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    هذا المجلد فارغ
                  </div>
                ) : (
                  <div className="divide-y">
                    {googleDriveItems.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex items-center justify-between p-3 hover:bg-muted cursor-pointer"
                        onClick={() => item.type === 'folder' 
                          ? loadGoogleDriveContents(item.id) 
                          : downloadFileFromGoogleDrive(item.id, item.name)
                        }
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-md ${item.type === 'folder' ? 'bg-amber-50' : 'bg-blue-50'}`}>
                            {item.type === 'folder' ? (
                              <Folder className="h-5 w-5 text-amber-600" />
                            ) : (
                              <File className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            {item.size && (
                              <p className="text-xs text-muted-foreground">{item.size}</p>
                            )}
                          </div>
                        </div>
                        {item.type === 'file' && (
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowGoogleDriveExplorer(false)}
            >
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

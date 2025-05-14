
import React from "react";
import { useAccountingSettings } from "@/hooks/useAccountingSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { 
  Save, 
  RefreshCw, 
  Zap, 
  FileText, 
  BarChart, 
  Mail, 
  Calendar
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export const AutomationSettings = () => {
  const { settings, isLoading, updateGeneralSettings } = useAccountingSettings();
  
  const [automationSettings, setAutomationSettings] = React.useState({
    autoJournalEntries: true,
    autoReconciliation: false,
    autoReports: true,
    autoEmailReports: false,
    reportFrequency: "monthly",
    reportTypes: ["balanceSheet", "incomeStatement"],
    autoBackup: true,
    autoArchiving: false,
    autoCurrencyUpdates: true,
  });

  const handleSave = () => {
    // في التطبيق الحقيقي، هنا سيتم حفظ إعدادات الأتمتة
    console.log("تم حفظ إعدادات الأتمتة:", automationSettings);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="ml-2 h-5 w-5 text-amber-500" />
            إعدادات الأتمتة المحاسبية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">القيود المحاسبية التلقائية</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">إنشاء قيود تلقائية</Label>
                <p className="text-sm text-muted-foreground">
                  إنشاء قيود محاسبية تلقائية من المستندات (الفواتير، المبيعات، المشتريات)
                </p>
              </div>
              <Switch
                checked={automationSettings.autoJournalEntries}
                onCheckedChange={(checked) => 
                  setAutomationSettings(prev => ({ ...prev, autoJournalEntries: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">تسوية الحسابات البنكية تلقائياً</Label>
                <p className="text-sm text-muted-foreground">
                  التسوية التلقائية للحسابات البنكية بناءً على كشوفات الحساب المستوردة
                </p>
              </div>
              <Switch
                checked={automationSettings.autoReconciliation}
                onCheckedChange={(checked) => 
                  setAutomationSettings(prev => ({ ...prev, autoReconciliation: checked }))
                }
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">التقارير الدورية</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">إنشاء تقارير تلقائية</Label>
                <p className="text-sm text-muted-foreground">
                  إنشاء التقارير المالية تلقائياً بشكل دوري
                </p>
              </div>
              <Switch
                checked={automationSettings.autoReports}
                onCheckedChange={(checked) => 
                  setAutomationSettings(prev => ({ ...prev, autoReports: checked }))
                }
              />
            </div>
            
            {automationSettings.autoReports && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-6">
                  <div className="space-y-2">
                    <Label htmlFor="reportFrequency">تكرار التقارير</Label>
                    <Select
                      value={automationSettings.reportFrequency}
                      onValueChange={(value) => 
                        setAutomationSettings(prev => ({ ...prev, reportFrequency: value }))
                      }
                    >
                      <SelectTrigger id="reportFrequency">
                        <SelectValue placeholder="اختر التكرار" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">يومي</SelectItem>
                        <SelectItem value="weekly">أسبوعي</SelectItem>
                        <SelectItem value="monthly">شهري</SelectItem>
                        <SelectItem value="quarterly">ربع سنوي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>أنواع التقارير</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox 
                          id="balanceSheet" 
                          checked={automationSettings.reportTypes.includes("balanceSheet")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setAutomationSettings(prev => ({
                                ...prev,
                                reportTypes: [...prev.reportTypes, "balanceSheet"]
                              }));
                            } else {
                              setAutomationSettings(prev => ({
                                ...prev,
                                reportTypes: prev.reportTypes.filter(t => t !== "balanceSheet")
                              }));
                            }
                          }}
                        />
                        <Label htmlFor="balanceSheet" className="text-sm">الميزانية العمومية</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox 
                          id="incomeStatement" 
                          checked={automationSettings.reportTypes.includes("incomeStatement")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setAutomationSettings(prev => ({
                                ...prev,
                                reportTypes: [...prev.reportTypes, "incomeStatement"]
                              }));
                            } else {
                              setAutomationSettings(prev => ({
                                ...prev,
                                reportTypes: prev.reportTypes.filter(t => t !== "incomeStatement")
                              }));
                            }
                          }}
                        />
                        <Label htmlFor="incomeStatement" className="text-sm">قائمة الدخل</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox 
                          id="cashFlow" 
                          checked={automationSettings.reportTypes.includes("cashFlow")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setAutomationSettings(prev => ({
                                ...prev,
                                reportTypes: [...prev.reportTypes, "cashFlow"]
                              }));
                            } else {
                              setAutomationSettings(prev => ({
                                ...prev,
                                reportTypes: prev.reportTypes.filter(t => t !== "cashFlow")
                              }));
                            }
                          }}
                        />
                        <Label htmlFor="cashFlow" className="text-sm">التدفقات النقدية</Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">إرسال التقارير بالبريد الإلكتروني</Label>
                    <p className="text-sm text-muted-foreground">
                      إرسال التقارير الدورية تلقائياً عبر البريد الإلكتروني
                    </p>
                  </div>
                  <Switch
                    checked={automationSettings.autoEmailReports}
                    onCheckedChange={(checked) => 
                      setAutomationSettings(prev => ({ ...prev, autoEmailReports: checked }))
                    }
                  />
                </div>
              </>
            )}
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">أتمتة أخرى</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">النسخ الاحتياطي التلقائي</Label>
                <p className="text-sm text-muted-foreground">
                  إنشاء نسخ احتياطية تلقائية للبيانات المحاسبية
                </p>
              </div>
              <Switch
                checked={automationSettings.autoBackup}
                onCheckedChange={(checked) => 
                  setAutomationSettings(prev => ({ ...prev, autoBackup: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">أرشفة البيانات القديمة</Label>
                <p className="text-sm text-muted-foreground">
                  أرشفة البيانات المحاسبية القديمة تلقائياً لتحسين الأداء
                </p>
              </div>
              <Switch
                checked={automationSettings.autoArchiving}
                onCheckedChange={(checked) => 
                  setAutomationSettings(prev => ({ ...prev, autoArchiving: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">تحديث أسعار العملات</Label>
                <p className="text-sm text-muted-foreground">
                  تحديث أسعار العملات تلقائياً من المصادر الرسمية
                </p>
              </div>
              <Switch
                checked={automationSettings.autoCurrencyUpdates}
                onCheckedChange={(checked) => 
                  setAutomationSettings(prev => ({ ...prev, autoCurrencyUpdates: checked }))
                }
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 space-x-reverse pt-4">
            <Button variant="outline" disabled={isLoading}>
              <RefreshCw className="ml-2 h-4 w-4" />
              إعادة ضبط الإعدادات
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="ml-2 h-4 w-4" />
              حفظ الإعدادات
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2 p-4 bg-blue-50 rounded-md">
              <FileText className="h-10 w-10 text-blue-500" />
              <h3 className="font-medium">القيود التلقائية</h3>
              <p className="text-sm text-gray-600">
                توفير الوقت من خلال إنشاء القيود المحاسبية تلقائياً
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-2 p-4 bg-green-50 rounded-md">
              <BarChart className="h-10 w-10 text-green-500" />
              <h3 className="font-medium">التقارير الدورية</h3>
              <p className="text-sm text-gray-600">
                الحصول على التقارير المالية الرئيسية بشكل دوري
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-2 p-4 bg-amber-50 rounded-md">
              <Calendar className="h-10 w-10 text-amber-500" />
              <h3 className="font-medium">الجدولة الذكية</h3>
              <p className="text-sm text-gray-600">
                جدولة المهام المحاسبية المتكررة بكفاءة
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

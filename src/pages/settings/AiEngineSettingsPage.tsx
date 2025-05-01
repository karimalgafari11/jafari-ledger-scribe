
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIEngineSettings } from "@/types/ai-finance";
import { toast } from "sonner";
import { useAiEngineSettings } from "@/hooks/useAiEngineSettings";
import { Calculator, DollarSign, Bell, FileText } from "lucide-react";

const AiEngineSettingsPage: React.FC = () => {
  const { settings, updateSettings, isLoading } = useAiEngineSettings();
  const [activeTab, setActiveTab] = useState("journal-entries");

  const handleSave = () => {
    updateSettings(settings);
    toast.success("تم حفظ الإعدادات بنجاح");
  };

  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="إعدادات محرك الذكاء الاصطناعي" showBack={true} />

      <div className="grid gap-6 mt-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>إعدادات محرك الذكاء الاصطناعي</CardTitle>
            <CardDescription>
              ضبط وتخصيص سلوك وقدرات محرك الذكاء الاصطناعي في النظام
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="journal-entries" className="flex items-center">
                  <Calculator className="ml-2 h-4 w-4" />
                  محرك القيود المحاسبية
                </TabsTrigger>
                <TabsTrigger value="pricing" className="flex items-center">
                  <DollarSign className="ml-2 h-4 w-4" />
                  التسعير الديناميكي
                </TabsTrigger>
                <TabsTrigger value="alerts" className="flex items-center">
                  <Bell className="ml-2 h-4 w-4" />
                  التنبيهات السلوكية
                </TabsTrigger>
                <TabsTrigger value="variance" className="flex items-center">
                  <FileText className="ml-2 h-4 w-4" />
                  تحليل الفروقات
                </TabsTrigger>
              </TabsList>

              <TabsContent value="journal-entries">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-lg">اقتراح القيود المحاسبية</h3>
                      <p className="text-sm text-muted-foreground">
                        تمكين محرك اقتراح وتصحيح القيود المحاسبية
                      </p>
                    </div>
                    <Switch 
                      checked={settings.journalEntrySuggestions.enabled} 
                      onCheckedChange={(checked) => 
                        updateSettings({
                          ...settings, 
                          journalEntrySuggestions: {
                            ...settings.journalEntrySuggestions,
                            enabled: checked
                          }
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="threshold">عتبة الثقة للاقتراحات (%)</Label>
                    <div className="flex items-center gap-4">
                      <Slider 
                        id="threshold"
                        value={[settings.journalEntrySuggestions.threshold]} 
                        onValueChange={(value) => 
                          updateSettings({
                            ...settings, 
                            journalEntrySuggestions: {
                              ...settings.journalEntrySuggestions,
                              threshold: value[0]
                            }
                          })
                        }
                        min={50}
                        max={95}
                        step={5}
                        className="flex-grow"
                      />
                      <div className="w-12 text-center">
                        {settings.journalEntrySuggestions.threshold}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">إنشاء القيود تلقائياً</h3>
                      <p className="text-sm text-muted-foreground">
                        إنشاء قيود مسودة بناءً على الاقتراحات عالية الثقة
                      </p>
                    </div>
                    <Switch 
                      checked={settings.journalEntrySuggestions.autoCreate} 
                      onCheckedChange={(checked) => 
                        updateSettings({
                          ...settings, 
                          journalEntrySuggestions: {
                            ...settings.journalEntrySuggestions,
                            autoCreate: checked
                          }
                        })
                      }
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pricing">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-lg">التسعير الديناميكي</h3>
                      <p className="text-sm text-muted-foreground">
                        تمكين تعديل أسعار المنتجات تلقائياً وفقاً للعوامل المحددة
                      </p>
                    </div>
                    <Switch 
                      checked={settings.dynamicPricing.enabled} 
                      onCheckedChange={(checked) => 
                        updateSettings({
                          ...settings, 
                          dynamicPricing: {
                            ...settings.dynamicPricing,
                            enabled: checked
                          }
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adjustmentPercentage">الحد الأقصى للتعديل (%)</Label>
                    <div className="flex items-center gap-4">
                      <Slider 
                        id="adjustmentPercentage"
                        value={[settings.dynamicPricing.maxAdjustmentPercentage]} 
                        onValueChange={(value) => 
                          updateSettings({
                            ...settings, 
                            dynamicPricing: {
                              ...settings.dynamicPricing,
                              maxAdjustmentPercentage: value[0]
                            }
                          })
                        }
                        min={1}
                        max={25}
                        step={1}
                        className="flex-grow"
                      />
                      <div className="w-12 text-center">
                        {settings.dynamicPricing.maxAdjustmentPercentage}%
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency">تكرار التعديل (بالأيام)</Label>
                    <Input 
                      id="frequency"
                      type="number"
                      min={1}
                      value={settings.dynamicPricing.frequencyDays}
                      onChange={(e) => 
                        updateSettings({
                          ...settings, 
                          dynamicPricing: {
                            ...settings.dynamicPricing,
                            frequencyDays: parseInt(e.target.value) || 7
                          }
                        })
                      }
                    />
                  </div>

                  <h3 className="font-medium mt-4">العوامل المؤثرة في التسعير</h3>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="considerDemand" className="cursor-pointer">الطلب على المنتج</Label>
                      <Switch 
                        id="considerDemand"
                        checked={settings.dynamicPricing.considerDemand} 
                        onCheckedChange={(checked) => 
                          updateSettings({
                            ...settings, 
                            dynamicPricing: {
                              ...settings.dynamicPricing,
                              considerDemand: checked
                            }
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="considerCost" className="cursor-pointer">تكلفة المنتج</Label>
                      <Switch 
                        id="considerCost"
                        checked={settings.dynamicPricing.considerCost} 
                        onCheckedChange={(checked) => 
                          updateSettings({
                            ...settings, 
                            dynamicPricing: {
                              ...settings.dynamicPricing,
                              considerCost: checked
                            }
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="considerCompetition" className="cursor-pointer">أسعار المنافسين</Label>
                      <Switch 
                        id="considerCompetition"
                        checked={settings.dynamicPricing.considerCompetition} 
                        onCheckedChange={(checked) => 
                          updateSettings({
                            ...settings, 
                            dynamicPricing: {
                              ...settings.dynamicPricing,
                              considerCompetition: checked
                            }
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="alerts">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-lg">التنبيهات السلوكية</h3>
                      <p className="text-sm text-muted-foreground">
                        تمكين نظام التنبيهات الذي يتعلم من سلوك المستخدم
                      </p>
                    </div>
                    <Switch 
                      checked={settings.behavioralAlerts.enabled} 
                      onCheckedChange={(checked) => 
                        updateSettings({
                          ...settings, 
                          behavioralAlerts: {
                            ...settings.behavioralAlerts,
                            enabled: checked
                          }
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="learningPeriod">فترة التعلم (بالأيام)</Label>
                    <Input 
                      id="learningPeriod"
                      type="number"
                      min={1}
                      value={settings.behavioralAlerts.learningPeriodDays}
                      onChange={(e) => 
                        updateSettings({
                          ...settings, 
                          behavioralAlerts: {
                            ...settings.behavioralAlerts,
                            learningPeriodDays: parseInt(e.target.value) || 14
                          }
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxDailyAlerts">الحد الأقصى للتنبيهات اليومية</Label>
                    <Input 
                      id="maxDailyAlerts"
                      type="number"
                      min={1}
                      max={20}
                      value={settings.behavioralAlerts.maxDailyAlerts}
                      onChange={(e) => 
                        updateSettings({
                          ...settings, 
                          behavioralAlerts: {
                            ...settings.behavioralAlerts,
                            maxDailyAlerts: parseInt(e.target.value) || 5
                          }
                        })
                      }
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="variance">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-lg">تحليل الفروقات المحاسبية</h3>
                      <p className="text-sm text-muted-foreground">
                        تمكين تحليل وشرح الفروقات والانحرافات المحاسبية
                      </p>
                    </div>
                    <Switch 
                      checked={settings.varianceAnalysis.enabled} 
                      onCheckedChange={(checked) => 
                        updateSettings({
                          ...settings, 
                          varianceAnalysis: {
                            ...settings.varianceAnalysis,
                            enabled: checked
                          }
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thresholdPercentage">عتبة الفروقات للتحليل (%)</Label>
                    <div className="flex items-center gap-4">
                      <Slider 
                        id="thresholdPercentage"
                        value={[settings.varianceAnalysis.thresholdPercentage]} 
                        onValueChange={(value) => 
                          updateSettings({
                            ...settings, 
                            varianceAnalysis: {
                              ...settings.varianceAnalysis,
                              thresholdPercentage: value[0]
                            }
                          })
                        }
                        min={1}
                        max={25}
                        step={1}
                        className="flex-grow"
                      />
                      <div className="w-12 text-center">
                        {settings.varianceAnalysis.thresholdPercentage}%
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="analysisPeriod">فترة التحليل</Label>
                    <Select
                      value={settings.varianceAnalysis.analysisPeriod}
                      onValueChange={(value: 'daily' | 'weekly' | 'monthly') => 
                        updateSettings({
                          ...settings,
                          varianceAnalysis: {
                            ...settings.varianceAnalysis,
                            analysisPeriod: value
                          }
                        })
                      }
                    >
                      <SelectTrigger id="analysisPeriod">
                        <SelectValue placeholder="اختر فترة التحليل" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">يومي</SelectItem>
                        <SelectItem value="weekly">أسبوعي</SelectItem>
                        <SelectItem value="monthly">شهري</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "جاري الحفظ..." : "حفظ الإعدادات"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AiEngineSettingsPage;

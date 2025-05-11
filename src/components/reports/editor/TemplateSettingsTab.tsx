
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"; // Replace Switch with Checkbox
import { ReportTemplateSettings } from "@/types/reportTemplate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TemplateSettingsTabProps {
  settings: ReportTemplateSettings;
  onSettingChange: (path: string[], value: any) => void;
}

const settingsSchema = z.object({
  pageSize: z.enum(["A4", "A5", "Letter"]),
  orientation: z.enum(["portrait", "landscape"]),
  margins: z.object({
    top: z.number().min(0),
    right: z.number().min(0),
    bottom: z.number().min(0),
    left: z.number().min(0),
  }),
  showPageNumbers: z.boolean(),
  headerHeight: z.number().min(0),
  footerHeight: z.number().min(0),
});

export const TemplateSettingsTab: React.FC<TemplateSettingsTabProps> = ({
  settings,
  onSettingChange
}) => {
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings,
  });

  const handleSettingChange = (path: string[], value: any) => {
    onSettingChange(path, value);
    
    // تحديث النموذج أيضاً
    const objectPath = path.join('.');
    form.setValue(objectPath as any, value);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="page" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="page">إعدادات الصفحة</TabsTrigger>
          <TabsTrigger value="appearance">المظهر والتنسيق</TabsTrigger>
          <TabsTrigger value="advanced">إعدادات متقدمة</TabsTrigger>
        </TabsList>

        <TabsContent value="page">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الصفحة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormLabel>حجم الصفحة</FormLabel>
                  <Select
                    value={settings.pageSize}
                    onValueChange={(value) => handleSettingChange(['pageSize'], value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر حجم الصفحة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A4">A4</SelectItem>
                      <SelectItem value="A5">A5</SelectItem>
                      <SelectItem value="Letter">Letter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <FormLabel>اتجاه الصفحة</FormLabel>
                  <Select
                    value={settings.orientation}
                    onValueChange={(value) => handleSettingChange(['orientation'], value as "portrait" | "landscape")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر اتجاه الصفحة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">عمودي</SelectItem>
                      <SelectItem value="landscape">أفقي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <FormLabel>الهوامش (بالملليمتر)</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  <div>
                    <FormLabel className="text-xs">أعلى</FormLabel>
                    <Input
                      type="number"
                      value={settings.margins.top}
                      onChange={(e) => handleSettingChange(['margins', 'top'], parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <FormLabel className="text-xs">يمين</FormLabel>
                    <Input
                      type="number"
                      value={settings.margins.right}
                      onChange={(e) => handleSettingChange(['margins', 'right'], parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <FormLabel className="text-xs">أسفل</FormLabel>
                    <Input
                      type="number"
                      value={settings.margins.bottom}
                      onChange={(e) => handleSettingChange(['margins', 'bottom'], parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <FormLabel className="text-xs">يسار</FormLabel>
                    <Input
                      type="number"
                      value={settings.margins.left}
                      onChange={(e) => handleSettingChange(['margins', 'left'], parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="showPageNumbers"
                  checked={settings.showPageNumbers}
                  onChange={(e) => handleSettingChange(['showPageNumbers'], e.target.checked)}
                  className="ml-2"
                />
                <FormLabel htmlFor="showPageNumbers">عرض أرقام الصفحات</FormLabel>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>المظهر والتنسيق</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormLabel>ارتفاع الترويسة (بالملليمتر)</FormLabel>
                  <Input
                    type="number"
                    value={settings.headerHeight}
                    onChange={(e) => handleSettingChange(['headerHeight'], parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <FormLabel>ارتفاع التذييل (بالملليمتر)</FormLabel>
                  <Input
                    type="number"
                    value={settings.footerHeight}
                    onChange={(e) => handleSettingChange(['footerHeight'], parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div>
                <FormLabel>الخط الافتراضي</FormLabel>
                <Select
                  value="Arial"
                  onValueChange={(value) => console.log("Font selected:", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الخط الافتراضي" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                    <SelectItem value="Cairo">Cairo</SelectItem>
                    <SelectItem value="Tajawal">Tajawal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات متقدمة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                سيتم إضافة المزيد من الإعدادات المتقدمة قريباً.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

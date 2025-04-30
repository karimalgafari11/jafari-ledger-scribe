
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReportTemplateSettings } from "@/types/reportTemplate";

interface TemplateSettingsTabProps {
  settings: ReportTemplateSettings;
  onSettingChange: (path: string[], value: any) => void;
}

export const TemplateSettingsTab: React.FC<TemplateSettingsTabProps> = ({
  settings,
  onSettingChange
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pageSize">حجم الصفحة</Label>
          <Select 
            value={settings.pageSize} 
            onValueChange={(value: 'A4' | 'A5' | 'Letter') => 
              onSettingChange(['pageSize'], value)
            }
          >
            <SelectTrigger id="pageSize">
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
          <Label htmlFor="orientation">اتجاه الصفحة</Label>
          <Select 
            value={settings.orientation} 
            onValueChange={(value: 'portrait' | 'landscape') => 
              onSettingChange(['orientation'], value)
            }
          >
            <SelectTrigger id="orientation">
              <SelectValue placeholder="اختر اتجاه الصفحة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="portrait">عمودي</SelectItem>
              <SelectItem value="landscape">أفقي</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="marginTop">الهامش العلوي</Label>
          <Input 
            id="marginTop"
            type="number" 
            value={settings.margins.top} 
            onChange={(e) => onSettingChange(
              ['margins', 'top'], 
              parseInt(e.target.value) || 0
            )} 
          />
        </div>
        <div>
          <Label htmlFor="marginRight">الهامش الأيمن</Label>
          <Input 
            id="marginRight"
            type="number" 
            value={settings.margins.right} 
            onChange={(e) => onSettingChange(
              ['margins', 'right'], 
              parseInt(e.target.value) || 0
            )} 
          />
        </div>
        <div>
          <Label htmlFor="marginBottom">الهامش السفلي</Label>
          <Input 
            id="marginBottom"
            type="number" 
            value={settings.margins.bottom} 
            onChange={(e) => onSettingChange(
              ['margins', 'bottom'], 
              parseInt(e.target.value) || 0
            )} 
          />
        </div>
        <div>
          <Label htmlFor="marginLeft">الهامش الأيسر</Label>
          <Input 
            id="marginLeft"
            type="number" 
            value={settings.margins.left} 
            onChange={(e) => onSettingChange(
              ['margins', 'left'], 
              parseInt(e.target.value) || 0
            )} 
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <input
          type="checkbox"
          id="showPageNumbers"
          checked={settings.showPageNumbers}
          onChange={(e) => onSettingChange(
            ['showPageNumbers'], 
            e.target.checked
          )}
          className="h-4 w-4 rounded border-gray-300"
        />
        <Label htmlFor="showPageNumbers">إظهار أرقام الصفحات</Label>
      </div>
    </div>
  );
};

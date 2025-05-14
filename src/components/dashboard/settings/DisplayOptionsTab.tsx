
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DisplayOptions } from "@/types/dashboard";

interface DisplayOptionsTabProps {
  displayOptions: DisplayOptions;
  onDisplayOptionChange: (key: keyof DisplayOptions) => void;
}

export const DisplayOptionsTab: React.FC<DisplayOptionsTabProps> = ({ 
  displayOptions, 
  onDisplayOptionChange 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="show-stats" className="flex flex-col">
          <span>بطاقات الإحصائيات</span>
          <span className="text-sm text-muted-foreground">إظهار بطاقات المبيعات والمصاريف والأرباح</span>
        </Label>
        <Switch
          id="show-stats"
          checked={displayOptions.showStats}
          onCheckedChange={() => onDisplayOptionChange("showStats")}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="show-kpis" className="flex flex-col">
          <span>مؤشرات الأداء</span>
          <span className="text-sm text-muted-foreground">إظهار مؤشرات الأداء الرئيسية</span>
        </Label>
        <Switch
          id="show-kpis"
          checked={displayOptions.showKpis}
          onCheckedChange={() => onDisplayOptionChange("showKpis")}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="show-charts" className="flex flex-col">
          <span>الرسومات البيانية</span>
          <span className="text-sm text-muted-foreground">إظهار الرسومات والمخططات البيانية</span>
        </Label>
        <Switch
          id="show-charts"
          checked={displayOptions.showCharts}
          onCheckedChange={() => onDisplayOptionChange("showCharts")}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="show-ai-widget" className="flex flex-col">
          <span>مساعد الذكاء الاصطناعي</span>
          <span className="text-sm text-muted-foreground">إظهار اقتراحات وتحليلات الذكاء الاصطناعي</span>
        </Label>
        <Switch
          id="show-ai-widget"
          checked={displayOptions.showAiWidget}
          onCheckedChange={() => onDisplayOptionChange("showAiWidget")}
        />
      </div>
      
      <Alert>
        <AlertDescription>
          يمكنك تخصيص لوحة التحكم من خلال إظهار أو إخفاء العناصر حسب احتياجاتك
        </AlertDescription>
      </Alert>
    </div>
  );
};

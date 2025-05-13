
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { DisplayOptions } from "@/types/dashboard";

interface DisplayOptionsTabProps {
  displayOptions: DisplayOptions;
  onDisplayOptionChange: (key: keyof DisplayOptions) => void;
}

export const DisplayOptionsTab: React.FC<DisplayOptionsTabProps> = ({
  displayOptions,
  onDisplayOptionChange,
}) => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="show-stats" className="flex-1">إظهار الإحصائيات</Label>
          <Switch
            id="show-stats"
            checked={displayOptions.showStats}
            onCheckedChange={() => onDisplayOptionChange('showStats')}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-kpis" className="flex-1">إظهار مؤشرات الأداء</Label>
          <Switch
            id="show-kpis"
            checked={displayOptions.showKpis}
            onCheckedChange={() => onDisplayOptionChange('showKpis')}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-charts" className="flex-1">إظهار الرسوم البيانية</Label>
          <Switch
            id="show-charts"
            checked={displayOptions.showCharts}
            onCheckedChange={() => onDisplayOptionChange('showCharts')}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-ai-widget" className="flex-1">إظهار أداة الذكاء الاصطناعي</Label>
          <Switch
            id="show-ai-widget"
            checked={displayOptions.showAiWidget}
            onCheckedChange={() => onDisplayOptionChange('showAiWidget')}
          />
        </div>
      </CardContent>
    </Card>
  );
};

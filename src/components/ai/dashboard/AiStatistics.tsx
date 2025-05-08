
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveStatCard } from "@/components/ai/InteractiveStatCard";

export const AiStatistics: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">الإحصائيات والتحليلات</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InteractiveStatCard
            title="مستخدمين نشطين"
            value="24"
            change={12}
            isUp={true}
          />
          <InteractiveStatCard
            title="معدل تحويل"
            value="3.2%"
            change={0.4}
            isUp={true}
          />
          <InteractiveStatCard
            title="معدل الضغط"
            value="18%"
            change={2.1}
            isUp={false}
          />
          <InteractiveStatCard
            title="وقت الاستجابة"
            value="230ms"
            change={15}
            isUp={true}
          />
        </div>
      </CardContent>
    </Card>
  );
};

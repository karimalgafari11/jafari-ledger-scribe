
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import { FinancialDecisionsWidget } from "@/components/ai/FinancialDecisionsWidget";
import { AiAnalyticsPanel } from "@/components/ai/AiAnalyticsPanel";
import { AiRulesPanel } from "@/components/ai/AiRulesPanel";

const FinancialDecisionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("analysis");
  const { analyzePerformance } = useAiAssistant();
  
  const performance = analyzePerformance();
  
  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="القرارات المالية الذكية" showBack={true} />
      
      <div className="grid gap-6 mt-4">
        <FinancialDecisionsWidget performance={performance} />
        
        <Card className="shadow-sm border-blue-100">
          <CardHeader className="pb-4">
            <CardTitle>تحليلات وقرارات مالية</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="analysis" className="flex-1">التحليل المالي</TabsTrigger>
                <TabsTrigger value="rules" className="flex-1">القواعد والتوصيات</TabsTrigger>
                <TabsTrigger value="settings" className="flex-1">إعدادات التحليل</TabsTrigger>
              </TabsList>
              
              <TabsContent value="analysis">
                <AiAnalyticsPanel />
              </TabsContent>
              
              <TabsContent value="rules">
                <AiRulesPanel />
              </TabsContent>
              
              <TabsContent value="settings">
                <div className="text-center p-10 text-gray-500">
                  <p>سيتم تفعيل إعدادات التحليل المالي قريباً</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialDecisionsPage;

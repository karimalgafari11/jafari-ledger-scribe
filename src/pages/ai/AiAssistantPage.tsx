
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { ChatInterface } from "@/components/ai/ChatInterface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, MessageSquare, Settings, History, Bot, BrainCircuit } from "lucide-react";
import { AiSystemContext } from "@/context/AiSystemContext";
import { AiAssistantFeatures } from "@/components/ai/AiAssistantFeatures";
import { AiAssistantSettings } from "@/components/ai/AiAssistantSettings";
import { AiChatHistory } from "@/components/ai/AiChatHistory";

const AiAssistantPage = () => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <PageContainer title="المساعد الذكي">
      <div className="container max-w-7xl mx-auto p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-3/4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div>
                  <h1 className="text-2xl font-bold flex items-center">
                    <BrainCircuit className="mr-2 h-6 w-6 text-primary" />
                    المساعد الذكي
                  </h1>
                  <p className="text-muted-foreground">استفسر، اطلب، ابحث، أو تفاعل مع المساعد الذكي</p>
                </div>
                <TabsList className="grid grid-cols-3 w-auto">
                  <TabsTrigger value="chat" className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span className="hidden sm:inline">المحادثة</span>
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex items-center gap-1">
                    <History className="h-4 w-4" />
                    <span className="hidden sm:inline">السجل</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-1">
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">الإعدادات</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="chat" className="space-y-4">
                <div className="relative h-[calc(100vh-230px)] md:h-[calc(100vh-200px)] rounded-lg overflow-hidden border bg-background">
                  <AiSystemContext>
                    <ChatInterface />
                  </AiSystemContext>
                </div>
              </TabsContent>

              <TabsContent value="history">
                <AiChatHistory />
              </TabsContent>

              <TabsContent value="settings">
                <AiAssistantSettings />
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:w-1/4">
            <AiAssistantFeatures />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AiAssistantPage;

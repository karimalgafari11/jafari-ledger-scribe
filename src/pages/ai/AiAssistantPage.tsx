
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
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="relative">
                  <div className="absolute inset-0 blur-xl bg-gradient-to-r from-indigo-200/20 via-purple-200/20 to-blue-200/20 rounded-xl -z-10"></div>
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100/50 backdrop-blur-sm rounded-xl px-4 py-3">
                    <h1 className="text-2xl font-bold flex items-center text-indigo-900">
                      <BrainCircuit className="mr-2 h-6 w-6 text-indigo-600" />
                      المساعد الذكي
                    </h1>
                    <p className="text-indigo-700">استفسر، اطلب، ابحث، أو تفاعل مع المساعد الذكي</p>
                  </div>
                </div>
                <TabsList className="grid grid-cols-3 w-auto bg-indigo-50 border border-indigo-100">
                  <TabsTrigger value="chat" className="flex items-center gap-1 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                    <MessageSquare className="h-4 w-4" />
                    <span className="hidden sm:inline">المحادثة</span>
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex items-center gap-1 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                    <History className="h-4 w-4" />
                    <span className="hidden sm:inline">السجل</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-1 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">الإعدادات</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="chat" className="space-y-4">
                <div className="relative h-[calc(100vh-230px)] md:h-[calc(100vh-200px)] rounded-lg overflow-hidden border border-indigo-100 bg-gradient-to-br from-indigo-50/50 via-white/70 to-blue-50/50">
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

          <div className="lg:w-1/4 animate-fade-in">
            <AiAssistantFeatures />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AiAssistantPage;

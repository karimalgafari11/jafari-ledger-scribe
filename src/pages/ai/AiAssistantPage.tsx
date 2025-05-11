
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { ChatInterface } from "@/components/ai/ChatInterface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, MessageSquare, Settings, History, Bot, BrainCircuit, Sparkles } from "lucide-react";
import { AiSystemContext } from "@/context/AiSystemContext";
import { AiAssistantFeatures } from "@/components/ai/AiAssistantFeatures";
import { AiAssistantSettings } from "@/components/ai/AiAssistantSettings";
import { AiChatHistory } from "@/components/ai/AiChatHistory";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const AiAssistantPage = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [progressValue, setProgressValue] = useState(13);

  // Simulating progress increase
  React.useEffect(() => {
    const timer = setTimeout(() => setProgressValue(100), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageContainer title="المساعد الذكي">
      <div className="container max-w-full p-0 lg:p-4 h-full min-h-[calc(100vh-4rem)]">
        <div className="relative h-full bg-gradient-to-b from-indigo-50/30 to-blue-50/30 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-24 left-32 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-24 right-32 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          
          <div className="flex flex-col lg:flex-row h-full gap-4 p-4 lg:p-6 relative z-10">
            <div className="lg:w-3/4 flex flex-col h-full">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 blur-xl bg-gradient-to-r from-indigo-200/20 via-purple-200/20 to-blue-200/20 rounded-xl -z-10"></div>
                    <motion.div 
                      className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100/50 backdrop-blur-sm rounded-xl px-4 py-3"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h1 className="text-2xl font-bold flex items-center text-indigo-900">
                        <Sparkles className="mr-2 h-6 w-6 text-indigo-600" />
                        المساعد الذكي
                      </h1>
                      <p className="text-indigo-700">استفسر، اطلب، ابحث، أو تفاعل مع المساعد الذكي</p>
                      
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-indigo-600 mb-1">
                          <span>تهيئة النظام</span>
                          <span>{progressValue}%</span>
                        </div>
                        <Progress value={progressValue} className="h-1" indicatorClass="bg-indigo-500" />
                      </div>
                    </motion.div>
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

                <TabsContent value="chat" className="space-y-4 flex-grow h-full">
                  <div className="relative h-full flex-grow rounded-lg overflow-hidden border border-indigo-100 bg-gradient-to-br from-indigo-50/50 via-white/70 to-blue-50/50 backdrop-blur-sm">
                    <AiSystemContext>
                      <ChatInterface />
                    </AiSystemContext>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="h-full">
                  <AiChatHistory />
                </TabsContent>

                <TabsContent value="settings" className="h-full">
                  <AiAssistantSettings />
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:w-1/4 animate-fade-in">
              <AiAssistantFeatures />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AiAssistantPage;

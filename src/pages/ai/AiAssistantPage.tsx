
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { ChatInterface } from "@/components/ai/ChatInterface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, MessageSquare } from "lucide-react";

const AiAssistantPage = () => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">المساعد الذكي</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="chat">
              <MessageSquare className="ml-2 h-4 w-4" />
              المحادثة
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="ml-2 h-4 w-4" />
              الإعدادات
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="w-full">
            <Card>
              <CardHeader>
                <CardTitle>المساعد الذكي</CardTitle>
              </CardHeader>
              <CardContent>
                <ChatInterface />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات المساعد الذكي</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  يمكنك تخصيص إعدادات المساعد الذكي هنا. حاليًا يتم استخدام نموذج DeepSeek للذكاء الاصطناعي.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AiAssistantPage;


import React from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { ChatInterface } from "@/components/ai/ChatInterface";

const AiAssistantPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 h-screen flex flex-col rtl">
      <Header title="المساعد الذكي" showBack={true} />
      
      <Card className="flex-1 mt-4 shadow-sm border-blue-100 overflow-hidden">
        <ChatInterface />
      </Card>
    </div>
  );
};

export default AiAssistantPage;

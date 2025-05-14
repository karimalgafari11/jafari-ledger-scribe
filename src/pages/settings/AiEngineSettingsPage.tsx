
import React from "react";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { AiSettingsPanel } from "@/components/ai/AiSettingsPanel";
import { PageContainer } from "@/components/PageContainer";

const AiEngineSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <PageContainer 
      title="إعدادات محرك الذكاء الاصطناعي" 
      showBack={true} 
      className="pb-8"
    >
      <div className="container mx-auto p-6 rtl">
        <AiSettingsPanel />
      </div>
    </PageContainer>
  );
};

export default AiEngineSettingsPage;

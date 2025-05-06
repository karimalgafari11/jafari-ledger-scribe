
import React from "react";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { AiSettingsPanel } from "@/components/ai/AiSettingsPanel";

const AiSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="إعدادات الذكاء الاصطناعي" showBack={true} onBackClick={() => navigate("/ai")} />
      
      <div className="mt-6">
        <AiSettingsPanel />
      </div>
    </div>
  );
};

export default AiSettingsPage;


import React from "react";
import { Header } from "@/components/Header";
import { AiDashboardContent } from "@/components/ai/dashboard/AiDashboardContent";

const AiDashboardPage: React.FC = () => {
  return (
    <div className="page-container h-screen flex flex-col overflow-hidden rtl">
      <Header title="لوحة تحكم الذكاء الاصطناعي" showBack={true} className="w-full" />
      <div className="flex-1 overflow-auto">
        <AiDashboardContent />
      </div>
    </div>
  );
};

export default AiDashboardPage;

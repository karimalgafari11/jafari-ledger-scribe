
import React from "react";
import { Header } from "@/components/Header";
import { AiDashboardContent } from "@/components/ai/dashboard/AiDashboardContent";

const AiDashboardPage: React.FC = () => {
  return (
    <div className="page-container rtl">
      <Header title="لوحة تحكم الذكاء الاصطناعي" showBack={true} className="w-full" />
      <div className="page-content">
        <AiDashboardContent />
      </div>
    </div>
  );
};

export default AiDashboardPage;

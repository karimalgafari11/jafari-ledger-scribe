
import React from "react";
import { Header } from "@/components/Header";
import { AiDashboardContent } from "@/components/ai/dashboard/AiDashboardContent";

const AiDashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="لوحة تحكم الذكاء الاصطناعي" />
      <AiDashboardContent />
    </div>
  );
};

export default AiDashboardPage;


import React from "react";
import { Header } from "@/components/Header";
import { AiDashboardContent } from "@/components/ai/dashboard/AiDashboardContent";
import { Layout } from "@/components/Layout";

const AiDashboardPage: React.FC = () => {
  return (
    <Layout className="p-0">
      <div className="w-full h-full flex flex-col overflow-hidden rtl">
        <Header title="لوحة تحكم الذكاء الاصطناعي" showBack={true} />
        <div className="flex-1 p-4 overflow-auto">
          <AiDashboardContent />
        </div>
      </div>
    </Layout>
  );
};

export default AiDashboardPage;

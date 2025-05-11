
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { AiDashboardContent } from "@/components/ai/dashboard/AiDashboardContent";

const AiDashboardPage: React.FC = () => {
  return (
    <PageContainer title="لوحة تحكم الذكاء الاصطناعي">
      <AiDashboardContent />
    </PageContainer>
  );
};

export default AiDashboardPage;

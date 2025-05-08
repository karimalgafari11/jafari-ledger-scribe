
import React from "react";
import { AiModuleCards } from "./AiModuleCards";
import { AiSystemAlerts } from "./AiSystemAlerts";
import { AiStatistics } from "./AiStatistics";
import { AiModules } from "./AiModules";
import { AiSystemPerformance } from "./AiSystemPerformance";

export const AiDashboardContent: React.FC = () => {
  return (
    <div className="mt-6">
      <AiModuleCards />

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mt-6">
        <div className="lg:col-span-4 space-y-6">
          <AiSystemAlerts />
          <AiStatistics />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <AiModules />
          <AiSystemPerformance />
        </div>
      </div>
    </div>
  );
};

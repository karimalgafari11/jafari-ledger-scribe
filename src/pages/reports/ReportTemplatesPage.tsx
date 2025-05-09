
import React from "react";
import { Layout } from "@/components/Layout";
import ReportTemplatesPage from "@/pages/reports/ReportsTemplatesPage"; 

// This component is a wrapper to maintain backward compatibility
// while fixing the file name discrepancy
const ReportTemplatesPageWrapper = () => {
  return <ReportTemplatesPage />;
};

export default ReportTemplatesPageWrapper;

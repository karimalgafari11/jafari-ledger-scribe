
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import Dashboard from "./Dashboard";
import Reports from "./Reports";
import { cn } from "@/lib/utils";

const Index = () => {
  const [activePage, setActivePage] = useState("reports");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "reports":
        return <Reports />;
      default:
        return (
          <div className="h-screen flex items-center justify-center bg-gray-100 rtl">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-teal mb-2">قريباً</h1>
              <p className="text-gray-600">هذه الصفحة قيد التطوير</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activePage={activePage} onChangePage={setActivePage} />
      <div className={cn("flex-1 overflow-auto")}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;

import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";

const EmployeesPage = () => {
  return (
    <Layout className="h-screen overflow-hidden">
      <div className="flex flex-col h-full w-full">
        <Header title="الموظفون" showBack={true} />
        <div className="flex-1 overflow-auto p-6">
          {/* محتوى الصفحة */}
        </div>
      </div>
    </Layout>
  );
};

export default EmployeesPage;

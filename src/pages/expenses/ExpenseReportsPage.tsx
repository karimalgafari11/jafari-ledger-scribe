import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";

const ExpenseReportsPage = () => {
  return (
    <Layout className="h-screen overflow-hidden">
      <div className="flex flex-col h-full w-full">
        <Header title="تقارير المصروفات" showBack={true} />
        <div className="flex-1 overflow-auto p-6">
          <div className="container p-6 mx-auto">
            <h1 className="text-2xl font-bold mb-6">تقارير المصروفات</h1>
            
            <div className="bg-gray-100 p-6 rounded-md text-center">
              <p className="text-xl text-gray-600">سيتم تطوير هذه الصفحة قريباً</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExpenseReportsPage;

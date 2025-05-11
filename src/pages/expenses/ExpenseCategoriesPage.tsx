import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";

const ExpenseCategoriesPage = () => {
  return (
    <Layout className="h-screen overflow-hidden">
      <div className="flex flex-col h-full w-full">
        <Header title="فئات المصروفات" showBack={true} />
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-gray-100 p-6 rounded-md text-center">
            <p className="text-xl text-gray-600">سيتم تطوير هذه الصفحة قريباً</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExpenseCategoriesPage;

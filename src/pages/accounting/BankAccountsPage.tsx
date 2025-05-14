
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";

const BankAccountsPage = () => {
  return (
    <Layout className="p-0">
      <div className="w-full h-full flex flex-col">
        <Header title="الحسابات البنكية" showBack={true} />
        
        <div className="flex-1 p-6 overflow-auto">
          <Card>
            <CardHeader>
              <CardTitle>إدارة الحسابات البنكية</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-4">عرض وإدارة الحسابات البنكية ومطابقتها</p>
              
              {/* محتوى الصفحة سيتم تطويره لاحقاً */}
              <div className="bg-gray-100 p-6 rounded-md text-center">
                <p className="text-xl text-gray-600">سيتم تطوير هذه الصفحة قريباً</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BankAccountsPage;


import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Users, FileText } from "lucide-react";

const EmployeesPage = () => {
  return (
    <PageContainer title="الموظفون">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إدارة الموظفين</h1>
          <Button>
            <UserPlus className="ml-2 h-4 w-4" /> إضافة موظف
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-6">
          <Button variant="outline">
            <Users className="ml-2 h-4 w-4" /> عرض الكل
          </Button>
          <Button variant="outline">
            <FileText className="ml-2 h-4 w-4" /> تصدير البيانات
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>قائمة الموظفين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-6 rounded-md text-center">
              <p className="text-xl text-gray-600">سيتم تحميل قائمة الموظفين هنا</p>
              <Button variant="outline" className="mt-4">
                <FileText className="ml-2 h-4 w-4" /> عرض السجلات
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default EmployeesPage;

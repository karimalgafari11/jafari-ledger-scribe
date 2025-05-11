
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Users } from "lucide-react";

const UsersPage = () => {
  return (
    <PageContainer title="المستخدمون">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
          <Button>
            <UserPlus className="ml-2 h-4 w-4" /> إضافة مستخدم
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>قائمة المستخدمين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-6 rounded-md text-center">
              <p className="text-xl text-gray-600">سيتم تحميل قائمة المستخدمين هنا</p>
              <Button variant="outline" className="mt-4">
                <Users className="ml-2 h-4 w-4" /> عرض الصلاحيات
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default UsersPage;

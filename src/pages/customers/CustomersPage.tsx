
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomersPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer title="قائمة العملاء">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إدارة العملاء</h1>
          <Button onClick={() => navigate("/customers/new")}>
            <UserPlus className="ml-2 h-4 w-4" /> إضافة عميل
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>قائمة العملاء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-6 rounded-md text-center">
              <p className="text-xl text-gray-600">سيتم تحميل قائمة العملاء هنا</p>
              <Button variant="outline" className="mt-4" onClick={() => navigate("/customers/module")}>
                <FileText className="ml-2 h-4 w-4" /> الذهاب إلى وحدة إدارة العملاء
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default CustomersPage;

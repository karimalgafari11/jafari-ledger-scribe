
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FolderTree } from "lucide-react";

const ExpenseCategoriesPage = () => {
  return (
    <PageContainer title="فئات المصروفات">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إدارة فئات المصروفات</h1>
          <Button>
            <Plus className="ml-2 h-4 w-4" /> فئة جديدة
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>هيكل فئات المصروفات</CardTitle>
            <FolderTree className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-6 rounded-md text-center">
              <p className="text-xl text-gray-600">سيتم تطوير هذه الصفحة قريباً</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default ExpenseCategoriesPage;

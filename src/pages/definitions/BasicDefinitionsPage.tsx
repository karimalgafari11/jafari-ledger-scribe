
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BasicDefinitionsPage = () => {
  return (
    <PageContainer title="التعاريف الأساسية">
      <div className="p-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>التعاريف الأساسية للنظام</CardTitle>
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

export default BasicDefinitionsPage;

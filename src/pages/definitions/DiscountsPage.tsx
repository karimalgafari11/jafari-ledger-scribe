
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { DiscountsModule } from "@/components/definitions/discounts/DiscountsModule";
import { Card, CardContent } from "@/components/ui/card";

const DiscountsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6 rtl">
        <Header title="إدارة الخصومات" showBack={true} />
        <Card className="mt-6">
          <CardContent className="p-6">
            <DiscountsModule />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DiscountsPage;


import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AddProductPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header title="إضافة منتج جديد" />
      
      <div className="p-4 md:p-6">
        <Button 
          variant="outline" 
          onClick={() => navigate("/inventory/products")}
          className="mb-6 gap-2"
        >
          <ArrowRight size={16} />
          العودة إلى المنتجات
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>إضافة منتج جديد</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              صفحة إضافة منتج جديد. يمكنك إضافة نموذج لإدخال بيانات المنتج هنا.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddProductPage;

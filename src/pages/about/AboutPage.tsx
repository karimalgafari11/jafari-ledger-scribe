
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <Header title="عن البرنامج" />
      
      <div className="container mx-auto p-6 rtl">
        <Card className="mx-auto max-w-3xl mb-8">
          <CardHeader className="text-center border-b pb-6">
            <div className="flex justify-center mb-4">
              <Logo size="large" />
            </div>
            <CardTitle className="text-2xl font-bold text-teal-700">الجعفري للمحاسبة</CardTitle>
          </CardHeader>
          
          <CardContent className="pt-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold mb-4">نظام إدارة الحسابات المتكامل</h2>
              <p className="text-muted-foreground">
                نظام محاسبي متكامل لإدارة الحسابات والمبيعات والمشتريات والمخزون وتقارير متقدمة
                مصمم خصيصًا للشركات والمؤسسات العربية
              </p>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-6 mb-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">تطوير ودعم: الجعفري للمحاسبة</h3>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={18} />
                  <span>+967779816860</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={18} />
                  <span>alkarime0@gmail.com</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
              <p>جميع الحقوق محفوظة © {new Date().getFullYear()} الجعفري للمحاسبة</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AboutPage;

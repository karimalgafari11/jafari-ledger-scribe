import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";

const AboutPage = () => {
  return (
    <Layout className="h-screen overflow-hidden">
      <div className="flex flex-col h-full w-full">
        <Header title="حول" showBack={true} />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <img 
                src="/lovable-uploads/b46a496c-1b88-47b3-bb09-5f709425862f.png" 
                alt="الجعفري للمحاسبة" 
                className="w-32 h-32 mx-auto mb-4" 
              />
              <h1 className="text-2xl font-bold">نظام الجعفري للمحاسبة</h1>
              <p className="text-gray-600">الإصدار 2.5.0</p>
            </div>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-2">عن النظام</h2>
                <p className="text-gray-700">
                  نظام الجعفري للمحاسبة هو نظام محاسبي متكامل مصمم خصيصاً للشركات والمؤسسات في المملكة العربية السعودية. 
                  يوفر النظام حلولاً شاملة لإدارة الحسابات، المخزون، المبيعات، المشتريات، والتقارير المالية.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-2">المميزات</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>نظام محاسبي متوافق مع المعايير السعودية والدولية</li>
                  <li>إدارة متكاملة للمخزون والمبيعات والمشتريات</li>
                  <li>تقارير مالية شاملة ومخصصة</li>
                  <li>دعم للضريبة والزكاة</li>
                  <li>واجهة مستخدم سهلة الاستخدام</li>
                  <li>دعم للعمل على الأجهزة المختلفة</li>
                  <li>تكامل مع أنظمة الذكاء الاصطناعي</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-2">معلومات الترخيص</h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700">مرخص لـ: شركة الجعفري للتجارة</p>
                  <p className="text-gray-700">نوع الترخيص: تجاري</p>
                  <p className="text-gray-700">تاريخ انتهاء الترخيص: 31/12/2024</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-2">الدعم الفني</h2>
                <p className="text-gray-700">
                  للحصول على الدعم الفني، يرجى التواصل معنا عبر:
                </p>
                <div className="mt-2">
                  <p className="text-gray-700">البريد الإلكتروني: support@aljaafari-accounting.com</p>
                  <p className="text-gray-700">الهاتف: +966 12 345 6789</p>
                  <p className="text-gray-700">ساعات العمل: الأحد - الخميس، 8:00 ص - 5:00 م</p>
                </div>
              </section>
              
              <section className="text-center text-gray-500 text-sm pt-6 border-t">
                <p>© 2023-2024 الجعفري للمحاسبة. جميع الحقوق محفوظة.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;

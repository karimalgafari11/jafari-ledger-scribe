
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Layout } from '@/components/Layout';

const AboutPage = () => {
  return (
    <Layout>
      <PageContainer title="حول التطبيق">
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">حول نظام المحاسبة</h1>
          <p className="mb-4">
            نظام المحاسبة هو نظام متكامل لإدارة الحسابات والعمليات المالية للشركات والمؤسسات.
          </p>
          <p className="mb-4">
            يوفر النظام مجموعة من الأدوات والتقارير التي تساعد في إدارة العمليات المالية بكفاءة
            وفعالية، بالإضافة إلى دعم اتخاذ القرارات المالية.
          </p>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">المميزات الرئيسية</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>دليل حسابات مرن ومتعدد المستويات</li>
              <li>إدارة القيود المحاسبية وترحيلها</li>
              <li>إدارة المخزون والمشتريات</li>
              <li>إدارة المبيعات والعملاء</li>
              <li>إدارة الموردين والمشتريات</li>
              <li>التقارير المالية والإدارية</li>
              <li>إدارة الميزانيات والتخطيط المالي</li>
              <li>دعم تعدد العملات وأسعار الصرف</li>
              <li>دعم تعدد الفروع والشركات</li>
              <li>إدارة الصلاحيات والمستخدمين</li>
            </ul>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default AboutPage;

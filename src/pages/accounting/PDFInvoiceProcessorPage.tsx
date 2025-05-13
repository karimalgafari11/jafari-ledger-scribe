
import React from 'react';
import { Layout } from "@/components/Layout";
import { PageContainer } from "@/components/PageContainer";

const PDFInvoiceProcessorPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="معالجة فواتير PDF" description="تحليل الفواتير والسندات الورقية وتحويلها إلى قيود محاسبية">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">تحليل الفواتير</h3>
          <p className="text-muted-foreground">قم برفع فواتير أو سندات بصيغة PDF لتحليلها وإنشاء القيود المحاسبية المناسبة لها.</p>
          
          <div className="mt-6 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <p className="text-muted-foreground mb-4">اسحب وأفلت ملف PDF هنا أو انقر للاختيار</p>
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
              اختيار ملف
            </button>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default PDFInvoiceProcessorPage;

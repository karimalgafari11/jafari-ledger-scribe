
import React from 'react';
import { Layout } from '@/components/Layout';
import { PageContainer } from '@/components/PageContainer';
import CostCentersTab from '@/components/definitions/costcenters/CostCentersTab';

const CostCentersPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer title="مراكز التكلفة">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">إدارة مراكز التكلفة</h1>
          <CostCentersTab />
        </div>
      </PageContainer>
    </Layout>
  );
};

export default CostCentersPage;

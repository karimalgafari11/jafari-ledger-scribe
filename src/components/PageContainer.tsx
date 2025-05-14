
import React, { ReactNode } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";

interface PageContainerProps {
  title: string;
  children: ReactNode;
  showBack?: boolean;
  headerContent?: ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  children,
  showBack = true,
  headerContent,
  className = "",
}) => {
  return (
    <Layout className="h-screen overflow-hidden p-0">
      <div className="flex flex-col h-full w-full">
        <Header title={title} showBack={showBack}>
          {headerContent}
        </Header>
        <div className={`flex-1 overflow-auto ${className}`}>
          {children}
        </div>
      </div>
    </Layout>
  );
};

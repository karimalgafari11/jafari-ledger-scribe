
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PDFInvoiceAnalyzer } from './PDFInvoiceAnalyzer';
import { OCRImageUploader } from './OCRImageUploader';
import { FileText, Image } from 'lucide-react';

interface InvoiceAnalyzerTabsProps {
  onDataExtracted: (data: any) => void;
}

export const InvoiceAnalyzerTabs: React.FC<InvoiceAnalyzerTabsProps> = ({
  onDataExtracted
}) => {
  const [activeTab, setActiveTab] = useState<string>('pdf');

  return (
    <Tabs defaultValue="pdf" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="pdf" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>ملف PDF</span>
        </TabsTrigger>
        <TabsTrigger value="image" className="flex items-center gap-2">
          <Image className="h-4 w-4" />
          <span>صورة</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="pdf" className="mt-0">
        <PDFInvoiceAnalyzer onDataExtracted={onDataExtracted} />
      </TabsContent>
      
      <TabsContent value="image" className="mt-0">
        <OCRImageUploader onDataExtracted={onDataExtracted} />
      </TabsContent>
    </Tabs>
  );
};

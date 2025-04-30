
import React from 'react';
import { Button } from "@/components/ui/button";
import { Type, Image, Grid, FileImage } from "lucide-react";
import { ReportElement, ReportSectionContent } from "@/types/reportTemplate";
import { toast } from "sonner";

interface TemplateDesignTabProps {
  activeSection: 'header' | 'body' | 'footer';
  setActiveSection: (section: 'header' | 'body' | 'footer') => void;
  content: {
    header: ReportSectionContent;
    body: ReportSectionContent;
    footer: ReportSectionContent;
  };
  onAddElement: (type: 'text' | 'image' | 'table' | 'chart') => void;
}

export const TemplateDesignTab: React.FC<TemplateDesignTabProps> = ({
  activeSection,
  setActiveSection,
  content,
  onAddElement
}) => {
  return (
    <div className="space-y-4">
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 mr-2 ${activeSection === 'header' ? 'border-b-2 border-primary font-medium' : ''}`}
          onClick={() => setActiveSection('header')}
        >
          رأس التقرير
        </button>
        <button
          className={`px-4 py-2 mr-2 ${activeSection === 'body' ? 'border-b-2 border-primary font-medium' : ''}`}
          onClick={() => setActiveSection('body')}
        >
          محتوى التقرير
        </button>
        <button
          className={`px-4 py-2 ${activeSection === 'footer' ? 'border-b-2 border-primary font-medium' : ''}`}
          onClick={() => setActiveSection('footer')}
        >
          تذييل التقرير
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <Button variant="outline" size="sm" onClick={() => onAddElement('text')}>
          <Type className="ml-2 h-4 w-4" />
          إضافة نص
        </Button>
        <Button variant="outline" size="sm" onClick={() => onAddElement('image')}>
          <Image className="ml-2 h-4 w-4" />
          إضافة صورة
        </Button>
        <Button variant="outline" size="sm" onClick={() => onAddElement('table')}>
          <Grid className="ml-2 h-4 w-4" />
          إضافة جدول
        </Button>
        <Button variant="outline" size="sm" onClick={() => onAddElement('chart')}>
          <FileImage className="ml-2 h-4 w-4" />
          إضافة مخطط
        </Button>
      </div>

      <div className="bg-gray-100 border rounded-md p-4 min-h-[400px] relative">
        <div className="text-center text-gray-400 absolute inset-0 flex items-center justify-center">
          {content[activeSection].elements.length === 0 ? 
            'منطقة السحب والإفلات (قريبًا)' :
            `عدد العناصر في ${activeSection === 'header' ? 'رأس التقرير' : activeSection === 'body' ? 'محتوى التقرير' : 'تذييل التقرير'}: ${content[activeSection].elements.length}`
          }
        </div>
      </div>
    </div>
  );
};

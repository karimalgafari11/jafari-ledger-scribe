
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileImage, Save, Layout, Eye } from "lucide-react";
import { ReportTemplate } from "@/types/reportTemplate";
import { TemplateHeaderForm } from "./TemplateHeaderForm";
import { TemplateDesignTab } from "./TemplateDesignTab";
import { TemplateSettingsTab } from "./TemplateSettingsTab";
import { ReportTemplatePreview } from "../ReportTemplatePreview";

interface ReportTemplateEditorProps {
  initialTemplate?: ReportTemplate;
  onSave: (template: ReportTemplate) => void;
  onCancel: () => void;
}

export const ReportTemplateEditor: React.FC<ReportTemplateEditorProps> = ({ 
  initialTemplate,
  onSave,
  onCancel 
}) => {
  const [template, setTemplate] = useState<ReportTemplate>(initialTemplate || {
    name: '',
    description: '',
    type: 'invoice',
    content: {
      header: { elements: [] },
      body: { elements: [] },
      footer: { elements: [] },
      settings: {
        pageSize: 'A4',
        orientation: 'portrait',
        margins: { top: 20, right: 20, bottom: 20, left: 20 },
        showPageNumbers: true,
        headerHeight: 100,
        footerHeight: 50
      }
    }
  });

  const [activeTab, setActiveTab] = useState<'design' | 'settings'>('design');
  const [activeSection, setActiveSection] = useState<'header' | 'body' | 'footer'>('body');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleSave = () => {
    if (!template.name) {
      toast.error("الرجاء إدخال اسم القالب");
      return;
    }
    
    onSave(template);
  };

  const handleAddElement = (type: 'text' | 'image' | 'table' | 'chart') => {
    const newElement = {
      id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      properties: type === 'text' ? { content: 'نص جديد', fontSize: 12, fontWeight: 'normal' } : {},
      position: { x: 0, y: 0 },
      size: { width: 100, height: type === 'text' ? 30 : 100 }
    };

    setTemplate(prev => {
      const updatedContent = { ...prev.content };
      updatedContent[activeSection].elements = [
        ...updatedContent[activeSection].elements,
        newElement
      ];
      
      return { ...prev, content: updatedContent };
    });

    toast.info(`تمت إضافة عنصر جديد (${type}) إلى القسم ${activeSection}`);
  };

  const updateTemplateSetting = (path: string[], value: any) => {
    setTemplate(prev => {
      const updated = { ...prev };
      let current: any = updated;
      
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      
      current[path[path.length - 1]] = value;
      return updated;
    });
  };

  return (
    <div className="space-y-6" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>محرر القالب</span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsPreviewOpen(true)}
              >
                <Eye className="ml-2 h-4 w-4" />
                معاينة
              </Button>
              <Button 
                variant="outline" 
                onClick={onCancel}
              >
                إلغاء
              </Button>
              <Button 
                onClick={handleSave}
              >
                <Save className="ml-2 h-4 w-4" />
                حفظ القالب
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TemplateHeaderForm 
            name={template.name}
            description={template.description}
            type={template.type}
            onNameChange={(value) => updateTemplateSetting(['name'], value)}
            onDescriptionChange={(value) => updateTemplateSetting(['description'], value)}
            onTypeChange={(value) => updateTemplateSetting(['type'], value)}
          />

          <div className="flex border-b mb-4">
            <button
              className={`px-4 py-2 mr-2 ${activeTab === 'design' ? 'border-b-2 border-primary font-medium' : ''}`}
              onClick={() => setActiveTab('design')}
            >
              <Layout className="h-4 w-4 ml-2 inline" />
              تصميم
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'settings' ? 'border-b-2 border-primary font-medium' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <FileImage className="h-4 w-4 ml-2 inline" />
              إعدادات
            </button>
          </div>

          {activeTab === 'design' && (
            <TemplateDesignTab 
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              content={template.content}
              onAddElement={handleAddElement}
            />
          )}

          {activeTab === 'settings' && (
            <TemplateSettingsTab 
              settings={template.content.settings}
              onSettingChange={(path, value) => 
                updateTemplateSetting(['content', 'settings', ...path], value)
              }
            />
          )}
        </CardContent>
      </Card>

      <ReportTemplatePreview
        template={isPreviewOpen ? template : null}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
};

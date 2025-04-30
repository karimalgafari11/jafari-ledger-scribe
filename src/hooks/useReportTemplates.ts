
import { useState, useEffect } from 'react';
import { ReportTemplate } from '@/components/reports/ReportTemplateEditor';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

// Sample initial templates
const initialTemplates: ReportTemplate[] = [
  {
    id: "template-1",
    name: "فاتورة المبيعات الأساسية",
    description: "قالب الفاتورة الافتراضي",
    type: "invoice",
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
    },
    createdAt: new Date(2023, 10, 15),
    updatedAt: new Date(2023, 11, 5)
  },
  {
    id: "template-2",
    name: "التقرير المالي الشهري",
    description: "تقرير مالي يعرض الأداء الشهري",
    type: "financial",
    content: {
      header: { elements: [] },
      body: { elements: [] },
      footer: { elements: [] },
      settings: {
        pageSize: 'A4',
        orientation: 'landscape',
        margins: { top: 20, right: 20, bottom: 20, left: 20 },
        showPageNumbers: true,
        headerHeight: 80,
        footerHeight: 40
      }
    },
    createdAt: new Date(2023, 9, 20),
    updatedAt: new Date(2023, 10, 12)
  }
];

export const useReportTemplates = () => {
  const [templates, setTemplates] = useState<ReportTemplate[]>(initialTemplates);
  const [activeTemplate, setActiveTemplate] = useState<ReportTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const saveTemplate = (template: ReportTemplate) => {
    if (template.id) {
      // Update existing template
      setTemplates(prev => 
        prev.map(t => 
          t.id === template.id 
            ? { ...template, updatedAt: new Date() } 
            : t
        )
      );
    } else {
      // Add new template
      const newTemplate = {
        ...template,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setTemplates(prev => [...prev, newTemplate]);
    }
    setActiveTemplate(null);
    setIsEditing(false);
  };

  const deleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    toast.success("تم حذف القالب بنجاح");
  };

  const duplicateTemplate = (template: ReportTemplate) => {
    const duplicate = {
      ...template,
      id: uuidv4(),
      name: `${template.name} (نسخة)`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTemplates(prev => [...prev, duplicate]);
    toast.success("تم نسخ القالب بنجاح");
  };

  const exportTemplate = (template: ReportTemplate) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(template));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${template.name}-template.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    toast.success("تم تصدير القالب بنجاح");
  };

  const importTemplate = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const template = JSON.parse(e.target?.result as string) as ReportTemplate;
        const importedTemplate = {
          ...template,
          id: uuidv4(),
          name: `${template.name} (مستورد)`,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        setTemplates(prev => [...prev, importedTemplate]);
        toast.success("تم استيراد القالب بنجاح");
      } catch (error) {
        toast.error("حدث خطأ أثناء استيراد القالب");
        console.error(error);
      }
    };
    reader.readAsText(file);
  };

  const createNewTemplate = () => {
    setActiveTemplate({
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
    setIsEditing(true);
  };

  const editTemplate = (template: ReportTemplate) => {
    setActiveTemplate(template);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setActiveTemplate(null);
    setIsEditing(false);
  };

  return {
    templates,
    activeTemplate,
    isEditing,
    saveTemplate,
    deleteTemplate,
    duplicateTemplate,
    exportTemplate,
    importTemplate,
    createNewTemplate,
    editTemplate,
    cancelEditing
  };
};


import React, { useRef } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ReportTemplatesList } from "@/components/reports/ReportTemplatesList";
import { ReportTemplateEditor } from "@/components/reports/ReportTemplateEditor";
import { useReportTemplates } from "@/hooks/useReportTemplates";
import { Download, FileUp, Plus } from "lucide-react";
import { toast } from "sonner";

const ReportTemplatesPage = () => {
  const {
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
  } = useReportTemplates();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importTemplate(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا القالب؟")) {
      deleteTemplate(templateId);
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Header title="إدارة قوالب التقارير" showBack={true}>
          {!isEditing && (
            <div className="flex gap-2 rtl">
              <Button variant="outline" onClick={handleImport}>
                <FileUp className="ml-2 h-4 w-4" />
                استيراد قالب
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
              />
              <Button onClick={createNewTemplate}>
                <Plus className="ml-2 h-4 w-4" />
                قالب جديد
              </Button>
            </div>
          )}
        </Header>
      </div>

      <main className="container mx-auto p-6">
        {isEditing ? (
          <ReportTemplateEditor
            initialTemplate={activeTemplate || undefined}
            onSave={saveTemplate}
            onCancel={cancelEditing}
          />
        ) : (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 rtl">قوالب التقارير المتاحة</h2>
              <p className="text-gray-600 mb-6 rtl">
                قم بإنشاء وإدارة قوالب التقارير المخصصة لاستخدامها في طباعة التقارير والمستندات في النظام.
              </p>
              <ReportTemplatesList
                templates={templates}
                onEdit={editTemplate}
                onDelete={handleDeleteTemplate}
                onDuplicate={duplicateTemplate}
                onExport={exportTemplate}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ReportTemplatesPage;

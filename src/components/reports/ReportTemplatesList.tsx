
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { formatDate } from "@/utils/formatters";
import { Edit, FileText, Trash, Copy, Download } from "lucide-react";
import { ReportTemplate } from './ReportTemplateEditor';

interface ReportTemplatesListProps {
  templates: ReportTemplate[];
  onEdit: (template: ReportTemplate) => void;
  onDelete: (templateId: string) => void;
  onDuplicate: (template: ReportTemplate) => void;
  onExport: (template: ReportTemplate) => void;
}

export const ReportTemplatesList: React.FC<ReportTemplatesListProps> = ({
  templates,
  onEdit,
  onDelete,
  onDuplicate,
  onExport
}) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <Table dir="rtl">
            <TableHeader>
              <TableRow>
                <TableHead>اسم القالب</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead>تاريخ آخر تحديث</TableHead>
                <TableHead className="w-[150px] text-center">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    لم يتم إنشاء أي قوالب بعد
                  </TableCell>
                </TableRow>
              ) : (
                templates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      {template.name}
                    </TableCell>
                    <TableCell>
                      {template.type === 'invoice' && 'فاتورة'}
                      {template.type === 'financial' && 'تقرير مالي'}
                      {template.type === 'inventory' && 'تقرير مخزون'}
                      {template.type === 'sales' && 'تقرير مبيعات'}
                      {template.type === 'custom' && 'مخصص'}
                    </TableCell>
                    <TableCell>
                      {template.createdAt ? formatDate(template.createdAt.toISOString()) : '-'}
                    </TableCell>
                    <TableCell>
                      {template.updatedAt ? formatDate(template.updatedAt.toISOString()) : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => onEdit(template)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onDuplicate(template)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onExport(template)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => onDelete(template.id as string)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

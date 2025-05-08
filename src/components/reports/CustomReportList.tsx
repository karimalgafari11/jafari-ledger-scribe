
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
import { 
  Calendar, 
  Copy, 
  Download, 
  FileBarChart, 
  FileText, 
  MoreHorizontal, 
  PenLine, 
  Star,
  Trash
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/utils/formatters";

interface Report {
  id: string;
  name: string;
  description?: string;
  type: string;
  category: string;
  lastRun?: Date;
  createdAt: Date;
  favorite: boolean;
  author: string;
}

interface CustomReportListProps {
  reports: Report[];
  onEdit?: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onExport: (id: string) => void;
  onFavorite: (id: string) => void;
}

export const CustomReportList: React.FC<CustomReportListProps> = ({
  reports,
  onEdit,
  onDelete,
  onDuplicate,
  onExport,
  onFavorite
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'financial':
        return <FileBarChart className="h-4 w-4 text-blue-500" />;
      case 'sales':
        return <FileBarChart className="h-4 w-4 text-green-500" />;
      case 'inventory':
        return <FileBarChart className="h-4 w-4 text-amber-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    let variant: "default" | "secondary" | "outline" | "destructive" = "outline";
    
    switch (category) {
      case 'financial':
        variant = "default";
        break;
      case 'sales':
        variant = "secondary";
        break;
      default:
        variant = "outline";
    }
    
    return (
      <Badge variant={variant} className="text-xs">
        {category}
      </Badge>
    );
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]"></TableHead>
              <TableHead className="w-[250px]">اسم التقرير</TableHead>
              <TableHead>النوع</TableHead>
              <TableHead>الفئة</TableHead>
              <TableHead>آخر تشغيل</TableHead>
              <TableHead>تاريخ الإنشاء</TableHead>
              <TableHead>المؤلف</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  لم يتم العثور على تقارير
                </TableCell>
              </TableRow>
            ) : (
              reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={report.favorite ? "text-yellow-400" : "text-muted-foreground"}
                      onClick={() => onFavorite(report.id)}
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium flex items-center gap-2">
                    {getTypeIcon(report.type)}
                    <span>{report.name}</span>
                  </TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{getCategoryBadge(report.category)}</TableCell>
                  <TableCell>
                    {report.lastRun ? (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>{formatDate(report.lastRun.toISOString())}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(report.createdAt.toISOString())}</TableCell>
                  <TableCell>{report.author}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => onExport(report.id)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      {onEdit && (
                        <Button variant="ghost" size="icon" onClick={() => onEdit(report.id)}>
                          <PenLine className="h-4 w-4" />
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onDuplicate(report.id)}>
                            <Copy className="ml-2 h-4 w-4" />
                            نسخ التقرير
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onExport(report.id)}>
                            <Download className="ml-2 h-4 w-4" />
                            تصدير
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => onDelete(report.id)}
                          >
                            <Trash className="ml-2 h-4 w-4" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

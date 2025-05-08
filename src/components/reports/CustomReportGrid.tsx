
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

interface CustomReportGridProps {
  reports: Report[];
  onEdit?: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onExport: (id: string) => void;
  onFavorite: (id: string) => void;
}

export const CustomReportGrid: React.FC<CustomReportGridProps> = ({
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
        return <FileBarChart className="h-10 w-10 text-blue-500" />;
      case 'sales':
        return <FileBarChart className="h-10 w-10 text-green-500" />;
      case 'inventory':
        return <FileBarChart className="h-10 w-10 text-amber-500" />;
      default:
        return <FileText className="h-10 w-10 text-gray-500" />;
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

  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">لا توجد تقارير</h3>
        <p className="text-sm text-muted-foreground mt-1">
          لم يتم العثور على تقارير مطابقة لمعايير البحث.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {reports.map((report) => (
        <Card key={report.id} className="overflow-hidden">
          <CardHeader className="pb-3 relative">
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-2 right-2 ${report.favorite ? "text-yellow-400" : "text-muted-foreground"}`}
              onClick={() => onFavorite(report.id)}
            >
              <Star className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              {getTypeIcon(report.type)}
              <div>
                <CardTitle className="text-lg">{report.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  {getCategoryBadge(report.category)}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-0">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {report.description || "لا يوجد وصف"}
            </p>
            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3" />
              آخر تشغيل: {report.lastRun ? formatDate(report.lastRun.toISOString()) : "لم يتم التشغيل بعد"}
            </div>
          </CardContent>
          <CardFooter className="pt-4 flex justify-between">
            <div className="text-xs text-muted-foreground">
              {report.author}، {formatDate(report.createdAt.toISOString())}
            </div>
            <div className="flex gap-1">
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
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

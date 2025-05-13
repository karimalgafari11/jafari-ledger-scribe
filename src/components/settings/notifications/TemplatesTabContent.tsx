
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotificationTemplate } from "@/types/notifications";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface TemplatesTabContentProps {
  templates: NotificationTemplate[];
  channelIcons: Record<string, React.ReactNode>;
}

const TemplatesTabContent = ({
  templates,
  channelIcons,
}: TemplatesTabContentProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>قوالب الإشعارات</CardTitle>
        <Button size="sm">
          <PlusCircle className="h-4 w-4 ml-2" />
          إضافة قالب جديد
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم القالب</TableHead>
              <TableHead>القنوات</TableHead>
              <TableHead>المتغيرات</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map(template => (
              <TableRow key={template.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{template.name}</p>
                    <p className="text-xs text-muted-foreground">{template.subject}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {template.channels.map(channel => (
                      <div key={channel} className="h-6 w-6 flex items-center justify-center bg-muted rounded-md">
                        {channelIcons[channel]}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {template.variables.map(variable => (
                      <Badge key={variable} variant="outline" className="font-mono text-xs py-0">
                        {variable}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TemplatesTabContent;

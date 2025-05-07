
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NotificationTemplate } from "@/types/notifications";

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
      <CardHeader>
        <CardTitle>قوالب الإشعارات</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 mb-6">تخصيص محتوى الإشعارات لكل نوع من الأحداث</p>
        
        {templates.map(template => (
          <div key={template.id} className="mb-6 p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-2">{template.name}</h3>
            
            <div className="mb-4">
              <Label htmlFor={`subject-${template.id}`} className="mb-1 block">عنوان الإشعار</Label>
              <Input id={`subject-${template.id}`} defaultValue={template.subject} />
            </div>
            
            <div className="mb-4">
              <Label htmlFor={`content-${template.id}`} className="mb-1 block">محتوى الإشعار</Label>
              <textarea
                id={`content-${template.id}`}
                className="w-full min-h-[150px] p-2 border rounded-md"
                defaultValue={template.content}
              />
            </div>
            
            <div className="mb-4">
              <Label className="mb-1 block">المتغيرات المتاحة</Label>
              <div className="flex flex-wrap gap-2">
                {template.variables.map(variable => (
                  <span key={variable} className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                    {`{{${variable}}}`}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <Label className="mb-1 block">قنوات الإرسال</Label>
              <div className="flex flex-wrap gap-2">
                {template.channels.map(channel => (
                  <div key={channel} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md">
                    {channelIcons[channel]}
                    <span className="text-sm">
                      {channel === "email" && "البريد الإلكتروني"}
                      {channel === "sms" && "الرسائل النصية"}
                      {channel === "in-app" && "داخل التطبيق"}
                      {channel === "push" && "إشعارات الجوال"}
                      {channel === "slack" && "سلاك"}
                      {channel === "webhook" && "ويب هوك"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" className="mr-2">إعادة تعيين</Button>
              <Button>حفظ القالب</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TemplatesTabContent;


import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const LayoutSection = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>إعدادات التخطيط</CardTitle>
          <CardDescription>تخصيص تخطيط التطبيق</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="borderRadius" className="mb-2 block">استدارة الحواف</Label>
              <div className="pt-4">
                <Slider
                  id="borderRadius"
                  min={0}
                  max={16}
                  step={1}
                  defaultValue={[8]}
                  className="w-full"
                  aria-label="استدارة الحواف"
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>لا استدارة</span>
                <span>استدارة قصوى</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Label htmlFor="spacing" className="mb-2 block">المسافات بين العناصر</Label>
              <div className="pt-4">
                <Slider
                  id="spacing"
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={[3]}
                  className="w-full"
                  aria-label="المسافات بين العناصر"
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>متقاربة</span>
                <span>متباعدة</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 mt-4">
            <Label>تأثيرات الظل</Label>
            <Select defaultValue="medium">
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع الظلال" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">بدون ظلال</SelectItem>
                <SelectItem value="light">ظلال خفيفة</SelectItem>
                <SelectItem value="medium">ظلال متوسطة</SelectItem>
                <SelectItem value="heavy">ظلال كثيفة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>معاينة الكثافة</CardTitle>
          <CardDescription>معاينة كثافة عناصر واجهة المستخدم</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>كثافة عناصر الواجهة</Label>
            <Select defaultValue="comfortable">
              <SelectTrigger>
                <SelectValue placeholder="اختر كثافة العناصر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">مضغوطة</SelectItem>
                <SelectItem value="comfortable">مريحة</SelectItem>
                <SelectItem value="spacious">متباعدة</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              تحدد المسافة بين عناصر واجهة المستخدم
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

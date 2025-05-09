
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeSettings } from "@/types/theme";

interface ThemePreviewProps {
  theme: ThemeSettings;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({ theme }) => {
  return (
    <Card className="sticky top-4 shadow-md">
      <CardHeader>
        <CardTitle>معاينة مباشرة</CardTitle>
        <CardDescription>معاينة التغييرات قبل الحفظ</CardDescription>
      </CardHeader>
      <CardContent>
        <div 
          className="border rounded-md p-4 mb-4 transition-all duration-200"
          style={{ 
            backgroundColor: theme.colors.background,
            color: theme.colors.textPrimary,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div 
            className="h-10 mb-4 flex items-center px-3 rounded-md transition-colors"
            style={{ backgroundColor: theme.colors.header, color: '#ffffff' }}
          >
            <h3 className="text-sm font-medium">ترويسة التطبيق</h3>
          </div>
          
          <h4 className="text-lg font-bold mb-2">عنوان القسم</h4>
          <p className="text-sm mb-3" style={{ color: theme.colors.textPrimary }}>
            هذا نص تجريبي لمعاينة كيفية ظهور النصوص في التطبيق. يمكنك رؤية تأثير اختياراتك هنا.
          </p>
          <p className="text-xs mb-3" style={{ color: theme.colors.textSecondary }}>
            نص ثانوي أصغر حجمًا لمعاينة لون النص الثانوي.
          </p>
          
          <div className="mb-4">
            <a href="#" style={{ color: theme.colors.link }}>رابط تجريبي</a>
          </div>
          
          <div className="flex space-x-2 space-x-reverse">
            <Button 
              style={{
                backgroundColor: theme.colors.button,
                color: "#ffffff"
              }}
            >
              زر رئيسي
            </Button>
            <Button variant="outline">زر ثانوي</Button>
          </div>
          
          <div className="mt-4 p-3 rounded-md transition-colors" style={{ backgroundColor: theme.colors.secondary }}>
            <p className="text-xs">
              هذا مثال على القسم ذو الخلفية الثانوية
            </p>
          </div>
        </div>
        
        {/* نصائح للمستخدم */}
        <div className="text-xs text-muted-foreground p-3 bg-muted rounded-md">
          <p className="font-semibold mb-1">❓ نصائح للتخصيص:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>تأكد من وجود تباين كافٍ بين ألوان النصوص والخلفيات</li>
            <li>اختر ألوانًا متناسقة تعكس هوية مؤسستك</li>
            <li>يمكنك تبديل الوضع بين الفاتح والداكن لمعاينة كلا المظهرين</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

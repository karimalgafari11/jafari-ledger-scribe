
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const StatementSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>إعدادات كشف الحساب</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ترتيب العمليات</label>
              <select className="w-full border border-gray-300 rounded p-2 text-sm">
                <option value="newest">الأحدث أولاً</option>
                <option value="oldest">الأقدم أولاً</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">عرض تفاصيل إضافية</label>
              <div className="flex items-center">
                <input type="checkbox" id="show-details" className="mr-2" />
                <label htmlFor="show-details" className="text-sm">إظهار تفاصيل إضافية للمعاملات</label>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">تنسيق طباعة كشف الحساب</h3>
            <div className="border rounded p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">حجم الورق</label>
                <select className="w-full border border-gray-300 rounded p-2 text-sm">
                  <option value="A4">A4</option>
                  <option value="letter">Letter</option>
                  <option value="legal">Legal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اتجاه الطباعة</label>
                <select className="w-full border border-gray-300 rounded p-2 text-sm">
                  <option value="portrait">عمودي</option>
                  <option value="landscape">أفقي</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">لون العناوين</label>
                <select className="w-full border border-gray-300 rounded p-2 text-sm">
                  <option value="default">افتراضي</option>
                  <option value="blue">أزرق</option>
                  <option value="green">أخضر</option>
                  <option value="gray">رمادي</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" className="ml-2">إعادة تعيين</Button>
            <Button>حفظ الإعدادات</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

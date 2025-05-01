
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Badge 
} from "@/components/ui/badge";
import {
  Switch
} from "@/components/ui/switch";
import {
  Slider
} from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export const AiSettingsPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
        <CardHeader>
          <CardTitle>إعدادات المساعد الذكي</CardTitle>
          <CardDescription>تخصيص إعدادات الذكاء الاصطناعي وسلوكه</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-blue-800">الإعدادات العامة</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">نموذج الذكاء الاصطناعي</h4>
                  <p className="text-sm text-gray-500">اختر نموذج الذكاء الاصطناعي المستخدم</p>
                </div>
                <Select defaultValue="deepseek">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="اختر نموذج" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deepseek">DeepSeek AI</SelectItem>
                    <SelectItem value="openai">OpenAI GPT-4o</SelectItem>
                    <SelectItem value="gemini">Google Gemini Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">اللغة الافتراضية</h4>
                  <p className="text-sm text-gray-500">اختر اللغة الرئيسية للمساعد الذكي</p>
                </div>
                <Select defaultValue="ar">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="اختر لغة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">التنبيهات التلقائية</h4>
                  <p className="text-sm text-gray-500">إرسال تنبيهات بناءً على أحداث النظام</p>
                </div>
                <Switch defaultChecked aria-label="تفعيل التنبيهات التلقائية" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">مستوى الإبداع</h4>
                  <span className="text-sm text-blue-500 font-medium">متوسط</span>
                </div>
                <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
                <p className="text-sm text-gray-500">
                  تحكم في مدى إبداعية وتنوع إجابات المساعد الذكي
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-blue-800">الوصول للبيانات</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">بيانات المخزون</h4>
                  <p className="text-sm text-gray-500">السماح بالوصول لبيانات المخزون</p>
                </div>
                <Switch defaultChecked aria-label="تفعيل الوصول لبيانات المخزون" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">بيانات العملاء</h4>
                  <p className="text-sm text-gray-500">السماح بالوصول لبيانات العملاء</p>
                </div>
                <Switch defaultChecked aria-label="تفعيل الوصول لبيانات العملاء" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">بيانات المبيعات</h4>
                  <p className="text-sm text-gray-500">السماح بالوصول لبيانات المبيعات</p>
                </div>
                <Switch defaultChecked aria-label="تفعيل الوصول لبيانات المبيعات" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">البيانات المالية</h4>
                  <p className="text-sm text-gray-500">السماح بالوصول للبيانات المالية</p>
                </div>
                <Switch defaultChecked aria-label="تفعيل الوصول للبيانات المالية" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">بيانات الموظفين</h4>
                  <p className="text-sm text-gray-500">السماح بالوصول لبيانات الموظفين</p>
                </div>
                <Switch aria-label="تفعيل الوصول لبيانات الموظفين" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-blue-800 mb-4">الإجراءات المسموحة</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-white to-blue-50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">إنشاء القيود المحاسبية</CardTitle>
                    <Switch defaultChecked aria-label="تفعيل إنشاء القيود المحاسبية" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-600">
                    السماح للمساعد الذكي بإنشاء قيود محاسبية تلقائية بناءً على الأحداث في النظام
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-white to-blue-50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">إرسال تنبيهات للعملاء</CardTitle>
                    <Switch aria-label="تفعيل إرسال تنبيهات للعملاء" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-600">
                    السماح للمساعد الذكي بإرسال رسائل تذكير للعملاء المتأخرين عن السداد
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-white to-blue-50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">إنشاء التقارير التلقائية</CardTitle>
                    <Switch defaultChecked aria-label="تفعيل إنشاء التقارير التلقائية" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-600">
                    السماح للمساعد الذكي بإنشاء تقارير دورية بناءً على جدول زمني
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-white to-blue-50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">اقتراح إجراءات تصحيحية</CardTitle>
                    <Switch defaultChecked aria-label="تفعيل اقتراح إجراءات تصحيحية" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-600">
                    السماح للمساعد الذكي باقتراح إجراءات تصحيحية عند اكتشاف مشاكل
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100">
            <CardHeader>
              <CardTitle className="text-sm">الخصوصية والأمان</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">تشفير البيانات</h4>
                    <p className="text-xs text-gray-600">تشفير جميع البيانات المرسلة للمساعد الذكي</p>
                  </div>
                  <Switch defaultChecked aria-label="تفعيل تشفير البيانات" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">حفظ سجل المحادثات</h4>
                    <p className="text-xs text-gray-600">الاحتفاظ بسجل المحادثات لتحسين الخدمة</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="اختر مدة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">لا تحفظ</SelectItem>
                      <SelectItem value="7">7 أيام</SelectItem>
                      <SelectItem value="30">30 يوم</SelectItem>
                      <SelectItem value="90">90 يوم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">التحقق من الصلاحيات</h4>
                    <p className="text-xs text-gray-600">التحقق من صلاحيات المستخدم قبل تنفيذ أي إجراء</p>
                  </div>
                  <Switch defaultChecked aria-label="تفعيل التحقق من الصلاحيات" />
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

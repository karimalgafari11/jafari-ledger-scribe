
import { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SecuritySettings } from "@/types/permissions";
import * as z from "zod";

// تعريف مخطط التحقق من صحة النموذج
const securitySettingsSchema = z.object({
  passwordPolicy: z.object({
    minimumLength: z.number().min(6).max(24),
    requireUppercase: z.boolean(),
    requireLowercase: z.boolean(),
    requireNumbers: z.boolean(),
    requireSpecialChars: z.boolean(),
    passwordExpiryDays: z.number().min(0).max(365),
    preventPasswordReuse: z.number().min(0).max(20),
    lockoutThreshold: z.number().min(0).max(10),
    lockoutDurationMinutes: z.number().min(1).max(1440),
  }),
  loginSettings: z.object({
    maxFailedAttempts: z.number().min(1).max(10),
    lockoutDurationMinutes: z.number().min(1).max(1440),
    requireTwoFactor: z.boolean(),
    sessionTimeoutMinutes: z.number().min(1).max(1440),
    allowMultipleSessions: z.boolean(),
    allowRememberMe: z.boolean(),
  }),
  dataAccessControls: z.object({
    restrictBranchAccess: z.boolean(),
    restrictDataByDate: z.boolean(),
    restrictedDateRangeDays: z.number().min(0).max(3650),
    hideFinancialFigures: z.boolean(),
    restrictExports: z.boolean(),
    auditAllChanges: z.boolean(),
  }),
  encryptionSettings: z.object({
    encryptionEnabled: z.boolean(),
    encryptionType: z.enum(['standard', 'advanced']),
    keyRotationDays: z.number().min(0).max(365),
  }),
});

type SecuritySettingsFormValues = z.infer<typeof securitySettingsSchema>;

interface SecuritySettingsProps {
  settings: SecuritySettings;
  onUpdateSettings: (settings: SecuritySettingsFormValues) => Promise<boolean>;
  isLoading: boolean;
}

const SecuritySettingsComponent = ({
  settings,
  onUpdateSettings,
  isLoading
}: SecuritySettingsProps) => {
  const [activeTab, setActiveTab] = useState("password");
  
  // إعداد نموذج react-hook-form
  const form = useForm<SecuritySettingsFormValues>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      passwordPolicy: settings.passwordPolicy,
      loginSettings: settings.loginSettings,
      dataAccessControls: settings.dataAccessControls,
      encryptionSettings: settings.encryptionSettings,
    },
  });

  const onSubmit = async (data: SecuritySettingsFormValues) => {
    await onUpdateSettings(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>إعدادات الأمان والخصوصية</CardTitle>
                <CardDescription>
                  ضبط إعدادات الأمان وسياسات كلمات المرور والوصول
                </CardDescription>
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="ml-2 h-4 w-4" />
                )}
                حفظ الإعدادات
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="password" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="password">سياسة كلمات المرور</TabsTrigger>
                <TabsTrigger value="login">إعدادات تسجيل الدخول</TabsTrigger>
                <TabsTrigger value="access">التحكم في الوصول</TabsTrigger>
                <TabsTrigger value="encryption">التشفير</TabsTrigger>
              </TabsList>
              
              <TabsContent value="password">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="passwordPolicy.minimumLength"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الحد الأدنى لطول كلمة المرور</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormDescription>
                          عدد الأحرف الأدنى المطلوب في كلمة المرور
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="passwordPolicy.requireUppercase"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                          <div>
                            <FormLabel>تتطلب حروف كبيرة</FormLabel>
                            <FormDescription>
                              يجب أن تحتوي كلمة المرور على حروف كبيرة
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="passwordPolicy.requireLowercase"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                          <div>
                            <FormLabel>تتطلب حروف صغيرة</FormLabel>
                            <FormDescription>
                              يجب أن تحتوي كلمة المرور على حروف صغيرة
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="passwordPolicy.requireNumbers"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                          <div>
                            <FormLabel>تتطلب أرقام</FormLabel>
                            <FormDescription>
                              يجب أن تحتوي كلمة المرور على أرقام
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="passwordPolicy.requireSpecialChars"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                          <div>
                            <FormLabel>تتطلب رموز خاصة</FormLabel>
                            <FormDescription>
                              يجب أن تحتوي كلمة المرور على رموز خاصة مثل @ # $
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="passwordPolicy.passwordExpiryDays"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>مدة صلاحية كلمة المرور (بالأيام)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormDescription>
                            عدد الأيام قبل مطالبة المستخدم بتغيير كلمة المرور (0 لتعطيل هذه الخاصية)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="passwordPolicy.preventPasswordReuse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>منع إعادة استخدام كلمات المرور السابقة</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormDescription>
                            عدد كلمات المرور السابقة التي لا يمكن إعادة استخدامها (0 لتعطيل هذه الخاصية)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="login">
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="loginSettings.maxFailedAttempts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الحد الأقصى لمحاولات تسجيل الدخول الفاشلة</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value) || 1)}
                            />
                          </FormControl>
                          <FormDescription>
                            عدد محاولات تسجيل الدخول الفاشلة قبل قفل الحساب
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="loginSettings.lockoutDurationMinutes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>مدة قفل الحساب (بالدقائق)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value) || 1)}
                            />
                          </FormControl>
                          <FormDescription>
                            المدة التي يبقى فيها الحساب مقفلاً بعد تجاوز الحد الأقصى للمحاولات الفاشلة
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="loginSettings.requireTwoFactor"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                          <div>
                            <FormLabel>تفعيل المصادقة الثنائية</FormLabel>
                            <FormDescription>
                              طلب رمز تحقق إضافي عند تسجيل الدخول
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="loginSettings.sessionTimeoutMinutes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>مدة انتهاء الجلسة (بالدقائق)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value) || 1)}
                            />
                          </FormControl>
                          <FormDescription>
                            المدة التي تنتهي بعدها جلسة المستخدم في حالة عدم النشاط
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="loginSettings.allowMultipleSessions"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                          <div>
                            <FormLabel>السماح بجلسات متعددة</FormLabel>
                            <FormDescription>
                              السماح للمستخدم بتسجيل الدخول من أكثر من جهاز في نفس الوقت
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="loginSettings.allowRememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                          <div>
                            <FormLabel>السماح بخيار "تذكرني"</FormLabel>
                            <FormDescription>
                              السماح للمستخدم بحفظ بيانات تسجيل الدخول
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="access">
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="dataAccessControls.restrictBranchAccess"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                          <div>
                            <FormLabel>تقييد الوصول حسب الفرع</FormLabel>
                            <FormDescription>
                              يستطيع المستخدم فقط الوصول للبيانات الخاصة بفرعه
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dataAccessControls.restrictDataByDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                          <div>
                            <FormLabel>تقييد الوصول حسب التاريخ</FormLabel>
                            <FormDescription>
                              تقييد الوصول للبيانات التي مر على إنشائها فترة محددة
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {form.watch("dataAccessControls.restrictDataByDate") && (
                    <FormField
                      control={form.control}
                      name="dataAccessControls.restrictedDateRangeDays"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>فترة تقييد البيانات (بالأيام)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormDescription>
                            الحد الأقصى للفترة الزمنية التي يمكن الوصول إليها (بالأيام)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="dataAccessControls.hideFinancialFigures"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                          <div>
                            <FormLabel>إخفاء الأرقام المالية</FormLabel>
                            <FormDescription>
                              إخفاء المبالغ المالية عن المستخدمين غير المصرح لهم
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dataAccessControls.restrictExports"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                          <div>
                            <FormLabel>تقييد تصدير البيانات</FormLabel>
                            <FormDescription>
                              طلب صلاحيات خاصة لتصدير البيانات والتقارير
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="dataAccessControls.auditAllChanges"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                        <div>
                          <FormLabel>تسجيل جميع التغييرات</FormLabel>
                          <FormDescription>
                            تسجيل جميع التغييرات التي تتم على البيانات في سجل الأحداث
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="encryption">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="encryptionSettings.encryptionEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                        <div>
                          <FormLabel>تفعيل التشفير</FormLabel>
                          <FormDescription>
                            تشفير البيانات الحساسة في قاعدة البيانات
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("encryptionSettings.encryptionEnabled") && (
                    <>
                      <FormField
                        control={form.control}
                        name="encryptionSettings.encryptionType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>نوع التشفير</FormLabel>
                            <div className="flex gap-4">
                              <FormItem className="flex items-center space-x-2 space-x-reverse">
                                <FormControl>
                                  <input
                                    type="radio"
                                    checked={field.value === "standard"}
                                    onChange={() => field.onChange("standard")}
                                    id="standard"
                                    className="h-4 w-4"
                                  />
                                </FormControl>
                                <FormLabel htmlFor="standard" className="mr-2">
                                  قياسي
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-x-reverse">
                                <FormControl>
                                  <input
                                    type="radio"
                                    checked={field.value === "advanced"}
                                    onChange={() => field.onChange("advanced")}
                                    id="advanced"
                                    className="h-4 w-4"
                                  />
                                </FormControl>
                                <FormLabel htmlFor="advanced" className="mr-2">
                                  متقدم
                                </FormLabel>
                              </FormItem>
                            </div>
                            <FormDescription>
                              مستوى التشفير المستخدم للبيانات الحساسة
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="encryptionSettings.keyRotationDays"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>مدة تدوير مفاتيح التشفير (بالأيام)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormDescription>
                              عدد الأيام قبل تغيير مفاتيح التشفير تلقائياً (0 لتعطيل هذه الخاصية)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default SecuritySettingsComponent;


import React from 'react';
import { Layout } from '@/components/Layout';
import { useAccountingSettings } from '@/hooks/useAccountingSettings';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { 
  CalendarIcon, 
  ChevronsUpDown, 
  Circle, 
  Plus, 
  Save, 
  Settings, 
  Shield, 
  Trash, 
  FileText, 
  Calendar,
  DollarSign,
  Clock 
} from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Form schema for general settings
const generalFormSchema = z.object({
  fiscalYearStart: z.date(),
  fiscalYearEnd: z.date(),
  defaultCurrency: z.string(),
  journalNamingFormat: z.string(),
  allowBackdatedEntries: z.boolean(),
  requireApproval: z.boolean(),
  defaultApprover: z.string(),
  retainDataYears: z.number().min(1).max(10)
});

// Form schema for tax settings
const taxFormSchema = z.object({
  enableTax: z.boolean(),
  defaultTaxRate: z.number().min(0).max(100),
  taxNumber: z.string(),
  taxAuthority: z.string()
});

// Form schema for new closing method
const closingMethodSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  isActive: z.boolean()
});

const AccountingSettingsPage: React.FC = () => {
  const {
    settings,
    activeTab,
    setActiveTab,
    isLoading,
    updateGeneralSettings,
    updateTaxSettings,
    toggleClosingMethod,
    addClosingMethod,
    resetToDefaults
  } = useAccountingSettings();
  
  const [isAddMethodDialogOpen, setIsAddMethodDialogOpen] = React.useState(false);
  
  // General settings form
  const generalForm = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      fiscalYearStart: settings.fiscalYearStart,
      fiscalYearEnd: settings.fiscalYearEnd,
      defaultCurrency: settings.defaultCurrency,
      journalNamingFormat: settings.journalNamingFormat,
      allowBackdatedEntries: settings.allowBackdatedEntries,
      requireApproval: settings.requireApproval,
      defaultApprover: settings.defaultApprover,
      retainDataYears: settings.retainDataYears
    }
  });
  
  // Tax settings form
  const taxForm = useForm<z.infer<typeof taxFormSchema>>({
    resolver: zodResolver(taxFormSchema),
    defaultValues: {
      enableTax: settings.taxSettings.enableTax,
      defaultTaxRate: settings.taxSettings.defaultTaxRate,
      taxNumber: settings.taxSettings.taxNumber,
      taxAuthority: settings.taxSettings.taxAuthority
    }
  });
  
  // New closing method form
  const closingMethodForm = useForm<z.infer<typeof closingMethodSchema>>({
    resolver: zodResolver(closingMethodSchema),
    defaultValues: {
      name: '',
      description: '',
      isActive: false
    }
  });

  // Handle general settings submission
  const onGeneralSubmit = (data: z.infer<typeof generalFormSchema>) => {
    updateGeneralSettings(data);
  };
  
  // Handle tax settings submission
  const onTaxSubmit = (data: z.infer<typeof taxFormSchema>) => {
    updateTaxSettings(data);
  };
  
  // Handle new closing method submission
  const onClosingMethodSubmit = (data: z.infer<typeof closingMethodSchema>) => {
    addClosingMethod(data);
    closingMethodForm.reset();
    setIsAddMethodDialogOpen(false);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 rtl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">الإعدادات المحاسبية</h1>
            <p className="text-muted-foreground">إدارة الإعدادات المتعلقة بالنظام المحاسبي</p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                إعادة التعيين
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>إعادة تعيين الإعدادات؟</AlertDialogTitle>
                <AlertDialogDescription>
                  هذا سيعيد جميع الإعدادات المحاسبية إلى القيم الافتراضية. هذا الإجراء لا يمكن التراجع عنه.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction onClick={resetToDefaults}>
                  نعم، إعادة التعيين
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="general" className="flex gap-2 items-center">
              <FileText className="h-4 w-4" />
              عام
            </TabsTrigger>
            <TabsTrigger value="tax" className="flex gap-2 items-center">
              <DollarSign className="h-4 w-4" />
              الضرائب
            </TabsTrigger>
            <TabsTrigger value="closing" className="flex gap-2 items-center">
              <Calendar className="h-4 w-4" />
              إقفال الحسابات
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex gap-2 items-center">
              <Clock className="h-4 w-4" />
              الأتمتة
            </TabsTrigger>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>الإعدادات العامة</CardTitle>
                <CardDescription>
                  تحديد إعدادات السنة المالية والعملة وترقيم القيود
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...generalForm}>
                  <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Fiscal Year Start */}
                      <FormField
                        control={generalForm.control}
                        name="fiscalYearStart"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>بداية السنة المالية</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={`w-full pl-3 text-right font-normal ${
                                      !field.value && "text-muted-foreground"
                                    }`}
                                  >
                                    {field.value ? (
                                      format(field.value, "dd/MM/yyyy", { locale: ar })
                                    ) : (
                                      <span>اختر تاريخ</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              تاريخ بدء السنة المالية للشركة
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Fiscal Year End */}
                      <FormField
                        control={generalForm.control}
                        name="fiscalYearEnd"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>نهاية السنة المالية</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={`w-full pl-3 text-right font-normal ${
                                      !field.value && "text-muted-foreground"
                                    }`}
                                  >
                                    {field.value ? (
                                      format(field.value, "dd/MM/yyyy", { locale: ar })
                                    ) : (
                                      <span>اختر تاريخ</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date("2099-12-31") || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              تاريخ انتهاء السنة المالية للشركة
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Default Currency */}
                      <FormField
                        control={generalForm.control}
                        name="defaultCurrency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>العملة الافتراضية</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر العملة" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="SAR">ريال سعودي (SAR)</SelectItem>
                                <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                                <SelectItem value="EUR">يورو (EUR)</SelectItem>
                                <SelectItem value="AED">درهم إماراتي (AED)</SelectItem>
                                <SelectItem value="KWD">دينار كويتي (KWD)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              العملة المستخدمة افتراضياً في النظام المحاسبي
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Journal Naming Format */}
                      <FormField
                        control={generalForm.control}
                        name="journalNamingFormat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>تنسيق ترقيم القيود</FormLabel>
                            <FormControl>
                              <Input {...field} dir="ltr" />
                            </FormControl>
                            <FormDescription>
                              استخدم {'{YEAR}'} للسنة، {'{MONTH}'} للشهر، {'{DAY}'} لليوم، {'{NUMBER}'} للرقم التسلسلي
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Data Retention */}
                      <FormField
                        control={generalForm.control}
                        name="retainDataYears"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>فترة الاحتفاظ بالبيانات (بالسنوات)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min={1} 
                                max={10} 
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))} 
                              />
                            </FormControl>
                            <FormDescription>
                              المدة التي يتم الاحتفاظ بالبيانات المحاسبية خلالها
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">خيارات متقدمة</h3>
                      <Separator />

                      {/* Allow Backdated Entries */}
                      <FormField
                        control={generalForm.control}
                        name="allowBackdatedEntries"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                السماح بالقيود بتاريخ سابق
                              </FormLabel>
                              <FormDescription>
                                السماح للمستخدمين بإنشاء قيود محاسبية بتاريخ سابق لتاريخ الإنشاء
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {/* Require Approval */}
                      <FormField
                        control={generalForm.control}
                        name="requireApproval"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                تتطلب القيود موافقة
                              </FormLabel>
                              <FormDescription>
                                يجب الموافقة على القيود المحاسبية قبل ترحيلها
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {/* Default Approver */}
                      {generalForm.watch('requireApproval') && (
                        <FormField
                          control={generalForm.control}
                          name="defaultApprover"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>المسؤول الافتراضي عن الموافقة</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                الشخص المسؤول افتراضياً عن الموافقة على القيود
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="gap-2"
                      disabled={isLoading}
                    >
                      <Save className="h-4 w-4" />
                      حفظ الإعدادات
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tax Settings Tab */}
          <TabsContent value="tax">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الضرائب</CardTitle>
                <CardDescription>
                  تكوين معلومات الضرائب ومعدلات الضريبة الافتراضية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...taxForm}>
                  <form onSubmit={taxForm.handleSubmit(onTaxSubmit)} className="space-y-6">
                    {/* Enable Tax */}
                    <FormField
                      control={taxForm.control}
                      name="enableTax"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              تفعيل احتساب الضرائب
                            </FormLabel>
                            <FormDescription>
                              تفعيل احتساب الضرائب على الفواتير والمبيعات
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {taxForm.watch('enableTax') && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Default Tax Rate */}
                        <FormField
                          control={taxForm.control}
                          name="defaultTaxRate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>معدل الضريبة الافتراضي (%)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min={0} 
                                  max={100} 
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                                />
                              </FormControl>
                              <FormDescription>
                                معدل الضريبة المطبق افتراضياً على المبيعات
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Tax Number */}
                        <FormField
                          control={taxForm.control}
                          name="taxNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>الرقم الضريبي</FormLabel>
                              <FormControl>
                                <Input {...field} dir="ltr" />
                              </FormControl>
                              <FormDescription>
                                رقم التسجيل الضريبي للشركة
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Tax Authority */}
                        <FormField
                          control={taxForm.control}
                          name="taxAuthority"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>الجهة الضريبية</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                اسم الهيئة المسؤولة عن الضرائب
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="gap-2"
                      disabled={isLoading}
                    >
                      <Save className="h-4 w-4" />
                      حفظ إعدادات الضرائب
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Closing Tab */}
          <TabsContent value="closing">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>إعدادات إقفال الحسابات</CardTitle>
                  <CardDescription>
                    تحديد طرق وخيارات إقفال الحسابات في نهاية الفترة المحاسبية
                  </CardDescription>
                </div>
                <Dialog open={isAddMethodDialogOpen} onOpenChange={setIsAddMethodDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      إضافة طريقة إقفال
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>إضافة طريقة إقفال جديدة</DialogTitle>
                      <DialogDescription>
                        أدخل تفاصيل طريقة الإقفال الجديدة
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...closingMethodForm}>
                      <form onSubmit={closingMethodForm.handleSubmit(onClosingMethodSubmit)}>
                        <div className="grid gap-4 py-4">
                          {/* Name */}
                          <FormField
                            control={closingMethodForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>اسم الطريقة</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Description */}
                          <FormField
                            control={closingMethodForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>الوصف</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Active Status */}
                          <FormField
                            control={closingMethodForm.control}
                            name="isActive"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between space-x-2">
                                <FormLabel>تفعيل</FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <DialogFooter>
                          <Button type="submit">إضافة</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 text-sm font-medium">
                      <div className="col-span-5">اسم الطريقة</div>
                      <div className="col-span-5">الوصف</div>
                      <div className="col-span-1 text-center">الحالة</div>
                      <div className="col-span-1 text-center">الإجراءات</div>
                    </div>
                    
                    <div className="divide-y">
                      {settings.closingMethods.map((method) => (
                        <div key={method.id} className="grid grid-cols-12 items-center p-4">
                          <div className="col-span-5 font-medium">{method.name}</div>
                          <div className="col-span-5 text-muted-foreground">{method.description}</div>
                          <div className="col-span-1 text-center">
                            <Badge variant={method.isActive ? "default" : "outline"}>
                              {method.isActive ? "مفعل" : "غير مفعل"}
                            </Badge>
                          </div>
                          <div className="col-span-1 flex justify-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleClosingMethod(method.id)}
                              title={method.isActive ? "إلغاء التفعيل" : "تفعيل"}
                            >
                              <Circle className={`h-4 w-4 ${method.isActive ? "text-green-500 fill-green-500" : "text-gray-300"}`} />
                            </Button>
                          </div>
                        </div>
                      ))}

                      {settings.closingMethods.length === 0 && (
                        <div className="p-4 text-center text-muted-foreground">
                          لم يتم إضافة طرق إقفال بعد
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Automation Tab */}
          <TabsContent value="automation">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الأتمتة</CardTitle>
                <CardDescription>
                  تكوين الإجراءات التلقائية والقيود المحاسبية الآلية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="text-base font-medium">إنشاء قيود تلقائية</h4>
                        <p className="text-sm text-muted-foreground">
                          إنشاء قيود محاسبية تلقائية عند إجراء العمليات المالية المختلفة
                        </p>
                      </div>
                      <Switch
                        checked={settings.autoGenerateEntries}
                        onCheckedChange={(checked) => updateGeneralSettings({ autoGenerateEntries: checked })}
                      />
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="text-base font-medium">إقفال الحسابات تلقائياً</h4>
                        <p className="text-sm text-muted-foreground">
                          إقفال الحسابات تلقائياً عند نهاية السنة المالية
                        </p>
                      </div>
                      <Switch
                        checked={settings.autoCloseAccounts}
                        onCheckedChange={(checked) => updateGeneralSettings({ autoCloseAccounts: checked })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 rounded-lg border p-4">
                    <h4 className="text-base font-medium">القيود التلقائية</h4>
                    <p className="text-sm text-muted-foreground">
                      حدد العمليات التي تريد إنشاء قيود محاسبية لها تلقائياً
                    </p>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-2 space-x-reverse">
                        <Checkbox id="sales-invoice" defaultChecked />
                        <div>
                          <label
                            htmlFor="sales-invoice"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            فواتير المبيعات
                          </label>
                          <p className="text-sm text-muted-foreground">
                            إنشاء قيود محاسبية عند إصدار فواتير المبيعات
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2 space-x-reverse">
                        <Checkbox id="purchase-invoice" defaultChecked />
                        <div>
                          <label
                            htmlFor="purchase-invoice"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            فواتير المشتريات
                          </label>
                          <p className="text-sm text-muted-foreground">
                            إنشاء قيود محاسبية عند تسجيل فواتير المشتريات
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2 space-x-reverse">
                        <Checkbox id="payments" defaultChecked />
                        <div>
                          <label
                            htmlFor="payments"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            المدفوعات
                          </label>
                          <p className="text-sm text-muted-foreground">
                            إنشاء قيود محاسبية عند تسجيل عمليات الدفع
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2 space-x-reverse">
                        <Checkbox id="receipts" defaultChecked />
                        <div>
                          <label
                            htmlFor="receipts"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            المقبوضات
                          </label>
                          <p className="text-sm text-muted-foreground">
                            إنشاء قيود محاسبية عند تسجيل المقبوضات
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2 space-x-reverse">
                        <Checkbox id="inventory" />
                        <div>
                          <label
                            htmlFor="inventory"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            حركات المخزون
                          </label>
                          <p className="text-sm text-muted-foreground">
                            إنشاء قيود محاسبية لحركات المخزون
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2 space-x-reverse">
                        <Checkbox id="expenses" defaultChecked />
                        <div>
                          <label
                            htmlFor="expenses"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            المصروفات
                          </label>
                          <p className="text-sm text-muted-foreground">
                            إنشاء قيود محاسبية عند تسجيل المصروفات
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="mt-6 gap-2" 
                  onClick={() => updateGeneralSettings(settings)}
                  disabled={isLoading}
                >
                  <Save className="h-4 w-4" />
                  حفظ إعدادات الأتمتة
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AccountingSettingsPage;

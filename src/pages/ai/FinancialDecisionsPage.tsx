
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Calculator, 
  CreditCard, 
  Landmark, 
  TrendingUp, 
  DollarSign,
  BadgePercent,
  Download,
  SendHorizonal,
  BarChart4,
  Lightbulb,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const FinancialDecisionsPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("investment");

  const handleAnalyze = () => {
    if (!query.trim()) {
      toast.error("الرجاء إدخال سؤال أو موضوع للتحليل");
      return;
    }
    
    setIsAnalyzing(true);
    toast.info("جاري تحليل البيانات المالية والسوقية");
    
    // محاكاة تأخير في المعالجة
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.success("تم إنشاء التحليل والتوصيات بنجاح");
    }, 3000);
  };

  return (
    <PageContainer title="القرارات المالية المدعومة بالذكاء الاصطناعي">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">القرارات المالية</h1>
            <p className="text-muted-foreground">اتخاذ قرارات مالية مدعومة بالذكاء الاصطناعي وتحليل البيانات</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="ml-2 h-4 w-4" /> تصدير البيانات
            </Button>
            <Button>
              <Brain className="ml-2 h-4 w-4" /> تحليل جديد
            </Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-primary" />
              مساعد القرارات المالية
            </CardTitle>
            <CardDescription>
              استخدم الذكاء الاصطناعي للحصول على توصيات بشأن القرارات المالية المختلفة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Textarea
                placeholder="اكتب سؤالاً أو موضوعاً تريد تحليله مالياً... على سبيل المثال: هل يجب أن نستثمر في تطوير منتج جديد بتكلفة 500,000 ر.س؟"
                className="min-h-[100px]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Button variant="outline" onClick={() => setQuery("هل يجب توسيع خط الإنتاج بتكلفة إضافية قدرها 1 مليون ر.س؟")}>
                توسيع خط الإنتاج
              </Button>
              <Button variant="outline" onClick={() => setQuery("هل الوقت مناسب للاستثمار في عقارات تجارية جديدة؟")}>
                استثمار عقاري
              </Button>
              <Button variant="outline" onClick={() => setQuery("ما هي أفضل طريقة لإعادة هيكلة ديون الشركة؟")}>
                إعادة هيكلة الديون
              </Button>
              <Button variant="outline" onClick={() => setQuery("هل يجب أن نقوم بالاستحواذ على الشركة المنافسة X؟")}>
                استحواذ
              </Button>
            </div>
            
            <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full">
              {isAnalyzing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white"></div>
                  جاري التحليل...
                </>
              ) : (
                <>
                  <Calculator className="ml-2 h-4 w-4" /> تحليل وإعطاء توصيات
                </>
              )}
            </Button>
          </CardContent>
        </Card>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="investment" className="flex items-center">
              <TrendingUp className="ml-2 h-4 w-4" /> قرارات الاستثمار
            </TabsTrigger>
            <TabsTrigger value="financing" className="flex items-center">
              <CreditCard className="ml-2 h-4 w-4" /> قرارات التمويل
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center">
              <Landmark className="ml-2 h-4 w-4" /> توزيع الموارد
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="investment">
            <Card>
              <CardHeader>
                <CardTitle>قرارات الاستثمار المدعومة بالذكاء الاصطناعي</CardTitle>
                <CardDescription>
                  تحليل وتوصيات لقرارات الاستثمار المختلفة بناءً على البيانات المالية والتاريخية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          مؤشر نجاح الاستثمار
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-baseline">
                          <p className="text-2xl font-bold text-green-600">74%</p>
                          <div className="text-muted-foreground text-xs">
                            على مدى 5 سنوات
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          متوسط العائد على الاستثمار
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-baseline">
                          <p className="text-2xl font-bold">18.5%</p>
                          <div className="text-muted-foreground text-xs">
                            السنوي
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          مخاطر الاستثمار
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-baseline">
                          <p className="text-2xl font-bold text-yellow-600">متوسطة</p>
                          <div className="text-muted-foreground text-xs">
                            استقرار مالي
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">توصيات الاستثمار</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="bg-green-50 border-r-4 border-green-500 p-4 rounded-md">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="h-6 w-6 text-green-500" />
                            <h3 className="font-medium">توسيع خط الإنتاج</h3>
                          </div>
                          <p className="text-sm mt-1">
                            الاستثمار في توسيع خط الإنتاج مربح بنسبة ثقة 85%. التحليل يظهر عائد متوقع بنسبة 22% خلال 3 سنوات.
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              <BarChart4 className="ml-1 h-4 w-4" /> عرض التفاصيل
                            </Button>
                            <Button size="sm">
                              <SendHorizonal className="ml-1 h-4 w-4" /> إعداد خطة
                            </Button>
                          </div>
                        </li>
                        
                        <li className="bg-yellow-50 border-r-4 border-yellow-500 p-4 rounded-md">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="h-6 w-6 text-yellow-500" />
                            <h3 className="font-medium">شراء معدات جديدة</h3>
                          </div>
                          <p className="text-sm mt-1">
                            الاستثمار في معدات جديدة يحمل مخاطر متوسطة، مع عائد متوقع بنسبة 15%. ينصح بالمزيد من الدراسة.
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              <BarChart4 className="ml-1 h-4 w-4" /> عرض التفاصيل
                            </Button>
                            <Button size="sm">
                              <SendHorizonal className="ml-1 h-4 w-4" /> إعداد خطة
                            </Button>
                          </div>
                        </li>
                        
                        <li className="bg-red-50 border-r-4 border-red-500 p-4 rounded-md">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="h-6 w-6 text-red-500" />
                            <h3 className="font-medium">شراء شركة منافسة</h3>
                          </div>
                          <p className="text-sm mt-1">
                            الاستحواذ على الشركة المنافسة يحمل مخاطر عالية حالياً. التحليل يظهر احتمالية عائد سلبي بنسبة 65%.
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              <BarChart4 className="ml-1 h-4 w-4" /> عرض التفاصيل
                            </Button>
                            <Button variant="destructive" size="sm">
                              <SendHorizonal className="ml-1 h-4 w-4" /> تأجيل القرار
                            </Button>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="financing">
            <Card>
              <CardHeader>
                <CardTitle>قرارات التمويل المدعومة بالذكاء الاصطناعي</CardTitle>
                <CardDescription>
                  تحليل وتوصيات لقرارات التمويل المختلفة بناءً على الوضع المالي الحالي
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        نسبة المديونية
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-baseline">
                        <p className="text-2xl font-bold">35%</p>
                        <div className="text-green-500 text-xs">
                          منخفضة المخاطر
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        تكلفة التمويل
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-baseline">
                        <p className="text-2xl font-bold">7.5%</p>
                        <div className="text-red-500 text-xs">
                          مرتفعة نسبياً
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        قدرة خدمة الدين
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-baseline">
                        <p className="text-2xl font-bold">3.2x</p>
                        <div className="text-green-500 text-xs">
                          قوية
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">توصيات التمويل</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="bg-green-50 border-r-4 border-green-500 p-4 rounded-md">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-6 w-6 text-green-500" />
                          <h3 className="font-medium">إعادة تمويل القروض الحالية</h3>
                        </div>
                        <p className="text-sm mt-1">
                          توصية عالية الأولوية: إعادة تمويل القروض الحالية للاستفادة من انخفاض أسعار الفائدة. توفير متوقع: 120,000 ر.س سنوياً.
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            <BarChart4 className="ml-1 h-4 w-4" /> عرض التفاصيل
                          </Button>
                          <Button size="sm">
                            <SendHorizonal className="ml-1 h-4 w-4" /> بدء الإجراءات
                          </Button>
                        </div>
                      </li>
                      
                      <li className="bg-yellow-50 border-r-4 border-yellow-500 p-4 rounded-md">
                        <div className="flex items-center gap-2">
                          <BadgePercent className="h-6 w-6 text-yellow-500" />
                          <h3 className="font-medium">تمويل بالأسهم</h3>
                        </div>
                        <p className="text-sm mt-1">
                          فرصة متوسطة الأولوية: الحصول على تمويل عبر إصدار أسهم جديدة بنسبة 10% لتمويل التوسعات. تخفيف الضغط على التدفق النقدي.
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            <BarChart4 className="ml-1 h-4 w-4" /> عرض التفاصيل
                          </Button>
                          <Button size="sm">
                            <SendHorizonal className="ml-1 h-4 w-4" /> دراسة معمقة
                          </Button>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>توزيع الموارد المالية</CardTitle>
                <CardDescription>
                  تحليل وتوصيات لتوزيع الموارد المالية بالشكل الأمثل
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-muted/20 flex items-center justify-center rounded-md mb-6">
                  <p className="text-muted-foreground">سيتم عرض مخطط توزيع الموارد المالية هنا</p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">توصيات توزيع الموارد</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-md">
                        <div className="flex items-center gap-2">
                          <Landmark className="h-6 w-6 text-blue-500" />
                          <h3 className="font-medium">زيادة استثمار البحث والتطوير</h3>
                        </div>
                        <p className="text-sm mt-1">
                          زيادة ميزانية البحث والتطوير بنسبة 15% لتسريع تطوير منتجات جديدة. العائد المتوقع على المدى المتوسط: 22%.
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            <BarChart4 className="ml-1 h-4 w-4" /> عرض التفاصيل
                          </Button>
                          <Button size="sm">
                            <SendHorizonal className="ml-1 h-4 w-4" /> تنفيذ
                          </Button>
                        </div>
                      </li>
                      
                      <li className="bg-indigo-50 border-r-4 border-indigo-500 p-4 rounded-md">
                        <div className="flex items-center gap-2">
                          <Landmark className="h-6 w-6 text-indigo-500" />
                          <h3 className="font-medium">تخفيض تكاليف الإدارة</h3>
                        </div>
                        <p className="text-sm mt-1">
                          تخفيض تكاليف الإدارة بنسبة 8% من خلال أتمتة العمليات. توفير متوقع: 350,000 ر.س سنوياً.
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            <BarChart4 className="ml-1 h-4 w-4" /> عرض التفاصيل
                          </Button>
                          <Button size="sm">
                            <SendHorizonal className="ml-1 h-4 w-4" /> خطة التنفيذ
                          </Button>
                        </div>
                      </li>
                      
                      <li className="bg-purple-50 border-r-4 border-purple-500 p-4 rounded-md">
                        <div className="flex items-center gap-2">
                          <Landmark className="h-6 w-6 text-purple-500" />
                          <h3 className="font-medium">إعادة توزيع بنود الميزانية</h3>
                        </div>
                        <p className="text-sm mt-1">
                          إعادة توزيع الميزانية التشغيلية مع زيادة التركيز على التسويق الرقمي (15%) وتدريب الموظفين (10%).
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            <BarChart4 className="ml-1 h-4 w-4" /> عرض التفاصيل
                          </Button>
                          <Button size="sm">
                            <SendHorizonal className="ml-1 h-4 w-4" /> خطة التنفيذ
                          </Button>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default FinancialDecisionsPage;

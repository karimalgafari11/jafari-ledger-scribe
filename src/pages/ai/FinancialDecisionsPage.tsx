import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, LineChart } from "@/components/ui/charts";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types/inventory";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils";
import { getPieChartColors } from "@/utils/chartUtils";

// Mock data for demonstration purposes
const mockProducts: Product[] = [
  {
    id: "1",
    code: "LP001",
    name: "لاب توب ديل XPS",
    description: "لاب توب ديل XPS 13 بوصة",
    price: 5499.99,
    costPrice: 4500,
    quantity: 5,
    reorderLevel: 10,
    category: "إلكترونيات",
    unit: "قطعة",
    barcode: "123456789012",
    isActive: true
  },
  {
    id: "2",
    code: "PH002",
    name: "آيفون 15 برو",
    description: "هاتف آيفون 15 برو ماكس",
    price: 4999.99,
    costPrice: 4000,
    quantity: 2,
    reorderLevel: 5,
    category: "جوالات",
    unit: "قطعة",
    barcode: "987654321098",
    isActive: true
  },
  {
    id: "3",
    code: "AU003",
    name: "سماعات سوني",
    description: "سماعات سوني لاسلكية",
    price: 799.99,
    costPrice: 450,
    quantity: 50,
    reorderLevel: 20,
    category: "إلكترونيات",
    unit: "قطعة",
    barcode: "345678901234",
    isActive: true
  },
  {
    id: "4",
    code: "DS004",
    name: "شاشة سامسونج",
    description: "شاشة سامسونج 4K 55 بوصة",
    price: 2999.99,
    costPrice: 2400,
    quantity: 3,
    reorderLevel: 8,
    category: "إلكترونيات",
    unit: "قطعة",
    barcode: "567890123456",
    isActive: true
  },
  {
    id: "5",
    code: "MS005",
    name: "ماوس لاسلكي",
    description: "ماوس لاسلكي لوجيتيك",
    price: 149.99,
    costPrice: 80,
    quantity: 100,
    reorderLevel: 30,
    category: "إكسسوارات",
    unit: "قطعة",
    barcode: "678901234567",
    isActive: true
  }
];

// Zod validation schema for the form
const formSchema = z.object({
  decisionType: z.string().min(2, {
    message: "نوع القرار يجب أن يكون على الأقل حرفين.",
  }),
  factors: z.string().min(10, {
    message: "يجب أن تصف العوامل المؤثرة بتفصيل أكبر.",
  }),
  recommendation: z.string().min(10, {
    message: "يجب أن تكون التوصية مفصلة.",
  }),
  expectedOutcome: z.string().min(10, {
    message: "يجب أن تصف النتائج المتوقعة بتفصيل أكبر.",
  }),
  riskAssessment: z.string().min(10, {
    message: "يجب أن يكون تقييم المخاطر مفصلاً.",
  }),
});

const FinancialDecisionsPage: React.FC = () => {
  const { toast: showToast } = useToast();
  const [decisionDialogOpen, setDecisionDialogOpen] = React.useState(false);

  // Filter products with quantity below reorder level
  const lowStockItems = mockProducts.filter(product => product.quantity !== undefined && product.reorderLevel !== undefined && product.quantity < product.reorderLevel);

  // Calculate total value of low stock items
  const totalLowStockValue = lowStockItems.reduce((sum, item) => sum + (item.costPrice || 0) * (item.quantity || 0), 0);

  // Prepare data for stock level analysis pie chart
  const stockLevelData = {
    labels: ['مخزون كافي', 'مخزون منخفض'],
    datasets: [{
      label: 'تحليل مستويات المخزون',
      data: [mockProducts.length - lowStockItems.length, lowStockItems.length],
      backgroundColor: ['#36A2EB', '#FF6384'],
      hoverBackgroundColor: ['#36A2EB', '#FF6384']
    }]
  };

  // Prepare data for top selling categories bar chart
  const categorySalesData = () => {
    const categorySales: { [key: string]: number } = {};
    mockProducts.forEach(product => {
      if (product.category) {
        categorySales[product.category] = (categorySales[product.category] || 0) + product.price;
      }
    });

    const labels = Object.keys(categorySales);
    const data = Object.values(categorySales);

    return {
      labels: labels,
      datasets: [{
        label: 'المبيعات حسب الفئة',
        data: data,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      }]
    };
  };

  // Prepare data for price distribution line chart
  const priceDistributionData = () => {
    const prices = mockProducts.map(product => product.price).sort((a, b) => a - b);
    const labels = prices.map((price, index) => `المنتج ${index + 1}`);

    return {
      labels: labels,
      datasets: [{
        label: 'توزيع الأسعار',
        data: prices,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      }]
    };
  };

  // Function to handle form submission
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      decisionType: "",
      factors: "",
      recommendation: "",
      expectedOutcome: "",
      riskAssessment: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here, you would typically handle the form submission,
    // such as sending the data to an API or updating state.
    console.log("Form values:", values);
    showToast({
      title: "تم تسجيل القرار المالي!",
      description: "تم تسجيل قرارك المالي بنجاح.",
    })
    setDecisionDialogOpen(false);
  }

  const { pieColors } = getPieChartColors();

  // Define the lowStockItemsData variable that's missing
  const lowStockItemsData = lowStockItems.map(item => ({
    ...item,
    // Ensure required properties match the Product type
    id: item.id,
    name: item.name,
    code: item.code,
    price: item.price,
    quantity: item.quantity,
    reorderLevel: item.reorderLevel,
    category: item.category,
    isActive: item.isActive
  })) as Product[];

  return (
    <div className="container mx-auto p-6 rtl">
      <h1 className="text-2xl font-bold mb-4">اتخاذ القرارات المالية</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>تحليل المخزون</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">نظرة عامة على مستويات المخزون الحالية.</p>
            <div className="h-[250px]">
              <PieChart
                data={{
                  labels: stockLevelData.labels,
                  datasets: [{
                    ...stockLevelData.datasets[0],
                    backgroundColor: pieColors[0],
                    borderColor: 'rgba(255, 255, 255, 0.5)'
                  }]
                }}
              />
            </div>
            <p className="mt-4">
              <span className="font-bold">إجمالي قيمة المخزون المنخفض:</span> {totalLowStockValue.toFixed(2)} ر.س
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>تحليل الفئات الأكثر مبيعاً</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">تحليل الفئات التي تحقق أعلى المبيعات.</p>
            <div className="h-[250px]">
              <BarChart data={categorySalesData()} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>توزيع الأسعار</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">تحليل توزيع الأسعار للمنتجات.</p>
          <div className="h-[300px]">
            <LineChart data={priceDistributionData()} />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>المنتجات ذات المخزون المنخفض</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">قائمة بالمنتجات التي تحتاج إلى إعادة طلب.</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المنتج</TableHead>
                <TableHead>الكمية المتاحة</TableHead>
                <TableHead>نقطة إعادة الطلب</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStockItemsData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.reorderLevel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={decisionDialogOpen} onOpenChange={setDecisionDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="default">تسجيل قرار مالي</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px] rtl">
          <DialogHeader>
            <DialogTitle>تسجيل قرار مالي</DialogTitle>
            <DialogDescription>
              سجل قرارك المالي مع وصف للعوامل المؤثرة والنتائج المتوقعة.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="decisionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع القرار</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: تخفيض المخزون، زيادة التسويق" {...field} />
                    </FormControl>
                    <FormDescription>
                      وضح نوع القرار المالي الذي اتخذته.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="factors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>العوامل المؤثرة</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="صف العوامل التي أدت إلى اتخاذ هذا القرار."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      صف بالتفصيل العوامل التي أثرت في قرارك.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recommendation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>التوصية</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="قدم توصية بناءً على هذا القرار."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      ما هي توصيتك بناءً على هذا القرار؟
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expectedOutcome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>النتائج المتوقعة</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="صف النتائج المتوقعة لهذا القرار."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      ما هي النتائج التي تتوقعها من هذا القرار؟
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="riskAssessment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تقييم المخاطر</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="قيم المخاطر المحتملة لهذا القرار."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      ما هي المخاطر المحتملة لهذا القرار وكيف يمكن التعامل معها؟
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">تسجيل القرار</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinancialDecisionsPage;

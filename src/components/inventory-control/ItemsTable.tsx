
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { mockAutoParts } from "@/data/mockAutoparts";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface ItemsTableProps {
  currency?: string;
}

interface Item {
  id: string;
  name: string;
  code: string;
  manufacturer: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  reorderLevel: number;
  notes: string;
}

// استخدام قطع غيار السيارات بشكل مؤقت، في التطبيق الحقيقي ستأتي من API
const tempItems: Item[] = mockAutoParts.map((part) => ({
  id: part.id,
  name: part.name,
  code: part.code,
  manufacturer: part.brand,
  purchasePrice: Math.round(part.price * 0.75), // سعر شراء تقديري للعرض
  sellingPrice: part.price,
  quantity: part.quantity,
  reorderLevel: part.reorderLevel,
  notes: part.quantity < 10 ? "المخزون منخفض" : ""
}));

// إضافة المزيد من العناصر لتجاوز 50 عنصر للعرض
const generateMoreItems = (): Item[] => {
  const items = [...tempItems];
  
  // قائمة الماركات
  const brands = ["تويوتا", "فورد", "نيسان", "هوندا", "مرسيدس", "بي ام دبليو", "هيونداي", "كيا"];
  
  // قائمة التصنيفات
  const categories = ["محرك", "فرامل", "تعليق", "كهرباء", "فلاتر", "زيوت", "إضاءة", "تكييف"];
  
  // قائمة قطع الغيار
  const partNames = [
    "فلتر هواء", "فلتر وقود", "طقم دفرنس", "صدام أمامي", "مرايا جانبية", "مضخة بنزين", 
    "عمود كرنك", "كمبريسور تكييف", "ثلاجة رادياتير", "جلد فرامل", "عفريتة عجل",
    "هوبات أمامية", "رمان بلي", "سير مروحة", "ترموستات", "طرمبة ماء", "غطاء علبة فتيس"
  ];
  
  // إضافة عناصر إضافية للوصول إلى 55 عنصر على الأقل
  for (let i = tempItems.length; i < 55; i++) {
    const quantity = Math.floor(Math.random() * 30);
    const reorderLevel = 5;
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const partName = partNames[Math.floor(Math.random() * partNames.length)];
    
    items.push({
      id: `gen-${i}`,
      name: `${partName} ${brand}`,
      code: `${category.substring(0, 3).toUpperCase()}-${i.toString().padStart(4, '0')}`,
      manufacturer: brand,
      purchasePrice: Math.round(100 + i * 5.25),
      sellingPrice: Math.round(150 + i * 7.5),
      quantity: quantity,
      reorderLevel: reorderLevel,
      notes: quantity <= reorderLevel ? "المخزون منخفض" : ""
    });
  }
  
  return items;
};

export function ItemsTable({ currency = "ر.س" }: ItemsTableProps) {
  const items = generateMoreItems();

  // احتساب المجاميع
  const totals = useMemo(() => {
    return items.reduce((acc, item) => {
      return {
        totalQuantity: acc.totalQuantity + item.quantity,
        totalPurchaseValue: acc.totalPurchaseValue + (item.purchasePrice * item.quantity),
        totalSellingValue: acc.totalSellingValue + (item.sellingPrice * item.quantity)
      };
    }, {
      totalQuantity: 0,
      totalPurchaseValue: 0,
      totalSellingValue: 0
    });
  }, [items]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-medium">قائمة قطع الغيار المتاحة للنقل</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <div className="max-h-[500px] overflow-y-auto">
            <Table className="border-collapse">
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead className="border text-center font-bold w-16">#</TableHead>
                  <TableHead className="border text-center font-bold">اسم القطعة</TableHead>
                  <TableHead className="border text-center font-bold">رقم القطعة</TableHead>
                  <TableHead className="border text-center font-bold">الشركة المصنعة</TableHead>
                  <TableHead className="border text-center font-bold">الكمية</TableHead>
                  <TableHead className="border text-center font-bold">سعر الشراء</TableHead>
                  <TableHead className="border text-center font-bold">سعر البيع</TableHead>
                  <TableHead className="border text-center font-bold">ملاحظات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow 
                    key={item.id} 
                    className="hover:bg-muted/50 cursor-pointer"
                  >
                    <TableCell className="border text-center font-medium">{index + 1}</TableCell>
                    <TableCell className="border">
                      {item.name}
                      {item.quantity <= item.reorderLevel && (
                        <span className="inline-flex mr-2 items-center">
                          <AlertTriangle size={14} className="text-amber-500" />
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="border text-center">{item.code}</TableCell>
                    <TableCell className="border">{item.manufacturer}</TableCell>
                    <TableCell className="border text-center">{item.quantity}</TableCell>
                    <TableCell className="border text-left">{item.purchasePrice} {currency}</TableCell>
                    <TableCell className="border text-left">{item.sellingPrice} {currency}</TableCell>
                    <TableCell className="border">
                      {item.notes ? (
                        <Badge variant="outline" className="font-normal text-amber-600 border-amber-200 bg-amber-50">
                          {item.notes}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow className="bg-muted/50 font-medium">
                  <TableCell colSpan={4} className="border text-left">الإجماليات</TableCell>
                  <TableCell className="border text-center">{totals.totalQuantity}</TableCell>
                  <TableCell className="border text-left">{totals.totalPurchaseValue.toLocaleString()} {currency}</TableCell>
                  <TableCell className="border text-left">{totals.totalSellingValue.toLocaleString()} {currency}</TableCell>
                  <TableCell className="border"></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div>إجمالي عدد قطع الغيار: {items.length}</div>
        <div>إجمالي المخزون: {totals.totalQuantity} قطعة</div>
      </CardFooter>
    </Card>
  );
}

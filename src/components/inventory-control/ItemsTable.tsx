
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockProducts } from "@/data/mockProducts";

interface Item {
  id: string;
  name: string;
  code: string;
  manufacturer: string;
  purchasePrice: number;
  sellingPrice: number;
  notes: string;
}

// استخدام منتجات وهمية بشكل مؤقت، في التطبيق الحقيقي ستأتي من API
const tempItems: Item[] = mockProducts.map(product => ({
  id: product.id,
  name: product.name,
  code: product.code,
  manufacturer: "شركة " + product.category,
  purchasePrice: Math.round(product.price * 0.75), // سعر شراء تقديري للعرض
  sellingPrice: product.price,
  notes: product.quantity < 10 ? "المخزون منخفض" : ""
}));

// إضافة المزيد من العناصر لتجاوز 50 عنصر للعرض
const generateMoreItems = (): Item[] => {
  const items = [...tempItems];
  
  // إضافة عناصر إضافية للوصول إلى 55 عنصر على الأقل
  for (let i = tempItems.length; i < 55; i++) {
    items.push({
      id: `gen-${i}`,
      name: `منتج افتراضي ${i}`,
      code: `SKU-${i.toString().padStart(4, '0')}`,
      manufacturer: `شركة ${i % 5 + 1}`,
      purchasePrice: Math.round(100 + i * 5.25),
      sellingPrice: Math.round(150 + i * 7.5),
      notes: i % 3 === 0 ? "متوفر بكميات محدودة" : ""
    });
  }
  
  return items;
};

export function ItemsTable() {
  const items = generateMoreItems();

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-medium">قائمة المواد المتاحة للنقل</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <div className="max-h-[500px] overflow-y-auto">
            <Table className="border-collapse">
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead className="border text-center font-bold">اسم المادة</TableHead>
                  <TableHead className="border text-center font-bold">رقم المادة</TableHead>
                  <TableHead className="border text-center font-bold">الشركة المصنعة</TableHead>
                  <TableHead className="border text-center font-bold">سعر الشراء</TableHead>
                  <TableHead className="border text-center font-bold">سعر البيع</TableHead>
                  <TableHead className="border text-center font-bold">ملاحظات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50 cursor-pointer">
                    <TableCell className="border">{item.name}</TableCell>
                    <TableCell className="border text-center">{item.code}</TableCell>
                    <TableCell className="border">{item.manufacturer}</TableCell>
                    <TableCell className="border text-left">{item.purchasePrice} ر.س</TableCell>
                    <TableCell className="border text-left">{item.sellingPrice} ر.س</TableCell>
                    <TableCell className="border">
                      {item.notes || (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

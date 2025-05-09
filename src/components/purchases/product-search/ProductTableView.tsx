
import React from "react";
import { Product } from "@/types/inventory";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";

interface ProductTableViewProps {
  products: Product[];
  selectedProductId: string | null;
  setSelectedProductId: (id: string) => void;
  handleSelect: (product: Product) => void;
  getStockLevelClass: (quantity?: number) => string;
}

export const ProductTableView: React.FC<ProductTableViewProps> = ({
  products,
  selectedProductId,
  setSelectedProductId,
  handleSelect,
  getStockLevelClass
}) => {
  return (
    <ScrollArea className="h-[60vh]">
      <Table className="min-w-full border-collapse">
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="border text-center font-bold w-16">رقم</TableHead>
            <TableHead className="border text-center font-bold">رقم الصنف</TableHead>
            <TableHead className="border text-center font-bold">اسم المنتج</TableHead>
            <TableHead className="border text-center font-bold">الكمية المتاحة</TableHead>
            <TableHead className="border text-center font-bold">سعر البيع</TableHead>
            <TableHead className="border text-center font-bold">المقاس</TableHead>
            <TableHead className="border text-center font-bold">الوحدة</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                لا توجد منتجات مطابقة للبحث
              </TableCell>
            </TableRow>
          ) : (
            products.map((product, index) => (
              <TableRow 
                key={product.id}
                className={`hover:bg-muted/50 cursor-pointer ${selectedProductId === product.id ? 'bg-blue-50' : ''}`}
                onClick={() => setSelectedProductId(product.id)}
                onDoubleClick={() => handleSelect(product)}
              >
                <TableCell className="border text-center font-medium">{index + 1}</TableCell>
                <TableCell className="border text-center">{product.code}</TableCell>
                <TableCell className="border">
                  <div>
                    <div className="font-medium">{product.name}</div>
                    {product.barcode && (
                      <div className="text-xs text-gray-500">باركود: {product.barcode}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell className={`border text-center ${getStockLevelClass(product.quantity)}`}>
                  {product.quantity !== undefined ? product.quantity : "-"}
                </TableCell>
                <TableCell className="border text-center font-medium">
                  {product.price?.toFixed(2)} ر.س
                </TableCell>
                <TableCell className="border text-center">
                  {product.sku || "-"}
                </TableCell>
                <TableCell className="border text-center">
                  {product.unit || "قطعة"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

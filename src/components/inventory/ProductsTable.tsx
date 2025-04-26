
import { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Eye, 
  Pencil, 
  Trash2 
} from "lucide-react";
import { Product } from "@/types/inventory";

interface ProductsTableProps {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onViewDetails: (id: string) => void;
  selectedProducts: string[];
  onToggleSelection: (id: string) => void;
}

export function ProductsTable({ 
  products, 
  onDelete, 
  onEdit, 
  onViewDetails,
  selectedProducts,
  onToggleSelection
}: ProductsTableProps) {
  // Stock level indicators
  const getStockLevelClass = (quantity: number, threshold: number) => {
    if (quantity <= 0) return "text-red-700 font-bold";
    if (quantity < threshold) return "text-orange-500 font-bold";
    return "";
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden rtl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox />
            </TableHead>
            <TableHead>كود الصنف</TableHead>
            <TableHead>اسم الصنف</TableHead>
            <TableHead>السعر</TableHead>
            <TableHead>الفئة</TableHead>
            <TableHead>الكمية المتاحة</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead className="text-left">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                لا توجد منتجات متاحة
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => onToggleSelection(product.id)}
                  />
                </TableCell>
                <TableCell>{product.code}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price.toFixed(2)}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className={getStockLevelClass(product.quantity, product.reorderLevel)}>
                  {product.quantity}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.isActive ? 'نشط' : 'غير نشط'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewDetails(product.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(product.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

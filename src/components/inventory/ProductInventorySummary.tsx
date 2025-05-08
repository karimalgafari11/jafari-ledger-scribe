
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/inventory";
import { ArrowUpRight, ArrowDownRight, History, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProductInventorySummaryProps {
  product: Product;
  relatedSales?: number;
  relatedPurchases?: number;
}

export const ProductInventorySummary: React.FC<ProductInventorySummaryProps> = ({
  product,
  relatedSales = 0,
  relatedPurchases = 0,
}) => {
  const navigate = useNavigate();
  
  // Check if stock is low
  const isStockLow = product.quantity <= (product.reorderLevel || 5);
  const isOutOfStock = product.quantity <= 0;
  
  // Calculate profit margin (if cost price is available)
  const profitMargin = product.costPrice 
    ? Math.round(((product.price - product.costPrice) / product.price) * 100) 
    : null;

  return (
    <Card className="bg-white shadow rounded-lg overflow-hidden">
      <CardHeader className="bg-slate-50 pb-2">
        <CardTitle className="text-lg font-medium flex justify-between items-center">
          <span>ملخص المخزون</span>
          {isStockLow && (
            <Badge variant={isOutOfStock ? "destructive" : "warning"} className="mr-2">
              {isOutOfStock ? "نفذت الكمية" : "كمية منخفضة"}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-3 border rounded-lg bg-blue-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">الكمية المتوفرة</span>
              <span className={`text-xl font-semibold ${isStockLow ? 'text-red-600' : 'text-blue-600'}`}>
                {product.quantity}
              </span>
            </div>
            {product.reorderLevel && (
              <div className="text-xs text-gray-500 mt-2">
                الحد الأدنى للطلب: {product.reorderLevel}
              </div>
            )}
          </div>
            
          <div className="p-3 border rounded-lg bg-green-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">آخر مشتريات</span>
              <div className="flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="text-xl font-semibold">{relatedPurchases}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              إجمالي المشتريات في آخر 30 يوم
            </div>
          </div>
            
          <div className="p-3 border rounded-lg bg-purple-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">آخر مبيعات</span>
              <div className="flex items-center text-purple-600">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                <span className="text-xl font-semibold">{relatedSales}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              إجمالي المبيعات في آخر 30 يوم
            </div>
          </div>
        </div>
        
        {profitMargin !== null && (
          <div className="mt-4 p-3 border rounded-lg bg-amber-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">هامش الربح</span>
              <span className="text-xl font-semibold text-amber-700">
                {profitMargin}%
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              سعر التكلفة: {product.costPrice?.toFixed(2)} ر.س | سعر البيع: {product.price.toFixed(2)} ر.س
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <Button 
            variant="outline"
            size="sm" 
            className="text-xs" 
            onClick={() => navigate(`/inventory/movements?product=${product.id}`)}
          >
            <History className="h-3.5 w-3.5 ml-1" />
            سجل الحركات
          </Button>
          
          {isStockLow && (
            <Button 
              size="sm" 
              className="text-xs"
              onClick={() => navigate(`/purchases/new?product=${product.id}`)} 
            >
              <AlertTriangle className="h-3.5 w-3.5 ml-1" />
              طلب كمية جديدة
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

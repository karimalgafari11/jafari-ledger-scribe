
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/types/inventory";

interface ProductGridViewProps {
  products: Product[];
  selectedProductId: string | null;
  handleSelect: (product: Product) => void;
}

export const ProductGridView: React.FC<ProductGridViewProps> = ({
  products,
  selectedProductId,
  handleSelect,
}) => {
  return (
    <ScrollArea className="h-[60vh]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
        {products.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-gray-500">
            لا توجد منتجات مطابقة للبحث
          </div>
        ) : (
          products.map((product) => (
            <Button
              key={product.id}
              variant={selectedProductId === product.id ? "default" : "outline"}
              className={`h-auto py-3 px-4 flex flex-col items-stretch text-right justify-between ${
                selectedProductId === product.id ? "bg-primary text-primary-foreground" : ""
              }`}
              onClick={() => handleSelect(product)}
            >
              <div className="flex justify-between w-full mb-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                  {product.code}
                </span>
                {product.quantity !== undefined && (
                  <span className={`text-xs px-2 py-0.5 rounded-md ${
                    product.quantity > 0 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {product.quantity > 0 ? `متوفر: ${product.quantity}` : "غير متوفر"}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-start w-full">
                <span className="font-medium text-right w-full">{product.name}</span>
                <div className="flex justify-between w-full mt-1">
                  <span className="text-sm">{product.unit || ""}</span>
                  <span className="text-sm font-bold">{product.price?.toFixed(2)} ر.س</span>
                </div>
                {product.size && (
                  <div className="w-full text-right mt-1">
                    <span className="text-xs text-gray-500">المقاس: {product.size}</span>
                  </div>
                )}
              </div>
            </Button>
          ))
        )}
      </div>
    </ScrollArea>
  );
};

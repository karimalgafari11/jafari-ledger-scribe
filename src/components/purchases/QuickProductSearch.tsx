
import React, { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/types/inventory";

// Mock products for testing
const mockProducts = [
  { id: "p1", code: "PR001", name: "شاشة كمبيوتر 24 بوصة", price: 850, quantity: 30, unit: "قطعة" },
  { id: "p2", code: "PR002", name: "لوحة مفاتيح لاسلكية", price: 120, quantity: 45, unit: "قطعة" },
  { id: "p3", code: "PR003", name: "ماوس لاسلكي", price: 80, quantity: 50, unit: "قطعة" },
  { id: "p4", code: "PR004", name: "سماعات رأس مع ميكروفون", price: 200, quantity: 25, unit: "قطعة" },
  { id: "p5", code: "PR005", name: "كامرة ويب HD", price: 150, quantity: 20, unit: "قطعة" },
  { id: "p6", code: "PR006", name: "كيبل HDMI 2م", price: 25, quantity: 100, unit: "قطعة" },
  { id: "p7", code: "PR007", name: "وحدة تخزين خارجية 1TB", price: 300, quantity: 15, unit: "قطعة" },
  { id: "p8", code: "PR008", name: "حامل شاشة كمبيوتر", price: 120, quantity: 10, unit: "قطعة" },
  { id: "p9", code: "PR009", name: "حقيبة لابتوب", price: 90, quantity: 30, unit: "قطعة" },
  { id: "p10", code: "PR010", name: "فلاش درايف 64GB", price: 60, quantity: 40, unit: "قطعة" }
];

interface QuickProductSearchProps {
  onClose: () => void;
  onSelect: (product: Product) => void;
}

export const QuickProductSearch: React.FC<QuickProductSearchProps> = ({
  onClose,
  onSelect
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>(mockProducts);
  
  // Filter products based on search query
  useEffect(() => {
    if (query.trim()) {
      const filtered = mockProducts.filter(
        product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.code.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults(mockProducts);
    }
  }, [query]);
  
  // Handle product selection
  const handleSelect = (product: Product) => {
    onSelect(product);
    onClose();
  };
  
  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">البحث عن منتجات</DialogTitle>
        </DialogHeader>
        
        <div className="relative mb-4">
          <Input
            placeholder="ابحث بالاسم أو الكود..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        
        <div className="max-h-80 overflow-y-auto border rounded-md">
          {results.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الكود</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المنتج</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">السعر</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المتاح</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراء</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{product.code}</td>
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2">{product.price}</td>
                    <td className="px-4 py-2">{product.quantity}</td>
                    <td className="px-4 py-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleSelect(product)}
                      >
                        إضافة
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center h-32">
              <p className="text-gray-500">لا توجد نتائج للبحث</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

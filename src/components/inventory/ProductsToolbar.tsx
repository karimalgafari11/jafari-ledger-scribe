
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterOptions } from "@/types/inventory";
import { Search, Plus, Trash2, FileText, Share2 } from "lucide-react";

interface ProductsToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
  selectedCount: number;
  onBulkDelete: () => void;
  onExport: () => void;
  onShare: () => void;
  onAddProduct: () => void;
}

export const ProductsToolbar = ({
  searchQuery,
  setSearchQuery,
  filterOptions,
  setFilterOptions,
  selectedCount,
  onBulkDelete,
  onExport,
  onShare,
  onAddProduct,
}: ProductsToolbarProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="بحث عن منتج..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-3 pr-10 w-full"
          />
        </div>
        
        {/* زر إضافة منتج جديد - معدل ليكون أكثر بروزاً */}
        <Button 
          onClick={onAddProduct}
          className="gap-2 bg-primary hover:bg-primary/80 transition-colors text-white px-4 py-2 min-w-[140px]"
        >
          <Plus size={18} />
          <span className="inline">إضافة منتج</span>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {/* أزرار الإجراءات الجماعية */}
        {selectedCount > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onBulkDelete}
            className="gap-1"
          >
            <Trash2 size={16} />
            <span>حذف ({selectedCount})</span>
          </Button>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          className="gap-1"
        >
          <FileText size={16} />
          <span className="hidden md:inline">تصدير</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onShare}
          className="gap-1"
        >
          <Share2 size={16} />
          <span className="hidden md:inline">مشاركة</span>
        </Button>
      </div>
    </div>
  );
};

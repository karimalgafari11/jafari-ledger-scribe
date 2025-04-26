
import { ReportCategory } from "@/components/ReportCategory"
import { Bookmark, Star, ShoppingCart, Package, Wallet, Wrench } from "lucide-react"

interface ReportCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function ReportCategories({ activeCategory, onCategoryChange }: ReportCategoriesProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 rtl">فئات التقارير</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 rtl">
        <ReportCategory 
          icon={<Bookmark className="text-yellow-500" />} 
          label="المفضلة"
          isActive={activeCategory === 'favorites'}
          onClick={() => onCategoryChange('favorites')}
        />
        <ReportCategory 
          icon={<ShoppingCart className="text-blue-500" />} 
          label="المبيعات"
          isActive={activeCategory === 'sales'}
          onClick={() => onCategoryChange('sales')}
        />
        <ReportCategory 
          icon={<Package className="text-green-500" />} 
          label="المخزون"
          isActive={activeCategory === 'inventory'}
          onClick={() => onCategoryChange('inventory')}
        />
        <ReportCategory 
          icon={<Wallet className="text-purple-500" />} 
          label="المالية"
          isActive={activeCategory === 'financial'}
          onClick={() => onCategoryChange('financial')}
        />
        <ReportCategory 
          icon={<Wrench className="text-orange-500" />} 
          label="التحكم بالمخزون"
          isActive={activeCategory === 'inventory-control'}
          onClick={() => onCategoryChange('inventory-control')}
        />
        <ReportCategory 
          icon={<Star className="text-gray-500" />} 
          label="جميع التقارير"
          isActive={activeCategory === 'all'}
          onClick={() => onCategoryChange('all')}
        />
      </div>
    </div>
  )
}

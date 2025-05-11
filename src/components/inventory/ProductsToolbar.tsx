
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Plus, 
  FileText, 
  FileSpreadsheet, 
  Share2, 
  Trash2, 
  Filter, 
  Download, 
  ArrowUpDown 
} from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FilterOptions } from "@/types/inventory";

interface ProductsToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
  selectedCount: number;
  onBulkDelete: () => void;
  onExport: () => void;
  onShare: () => void;
}

export function ProductsToolbar({
  searchQuery,
  setSearchQuery,
  filterOptions,
  setFilterOptions,
  selectedCount,
  onBulkDelete,
  onExport,
  onShare
}: ProductsToolbarProps) {
  const form = useForm<FilterOptions>({
    defaultValues: filterOptions
  });
  
  const handleFilterSubmit = (data: FilterOptions) => {
    setFilterOptions(data);
  };
  
  return (
    <div className="space-y-4 rtl w-full">
      {/* Search and Actions Row */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="البحث عن منتج..." 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
            className="w-full pl-8" 
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button className="gap-2 bg-teal-600 hover:bg-teal-700">
            <Plus size={18} />
            منتج جديد
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter size={18} />
                تصفية
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFilterSubmit)} className="space-y-4">
                  <FormField 
                    control={form.control} 
                    name="category" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>التصنيف</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="اختر التصنيف" />
                        </FormControl>
                      </FormItem>
                    )} 
                  />
                  
                  <FormField 
                    control={form.control} 
                    name="brand" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الشركة الصانعة</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="اختر الشركة" />
                        </FormControl>
                      </FormItem>
                    )} 
                  />
                  
                  <div className="flex gap-2">
                    <FormField 
                      control={form.control} 
                      name="minPrice" 
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>السعر من</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" placeholder="0" />
                          </FormControl>
                        </FormItem>
                      )} 
                    />
                    
                    <FormField 
                      control={form.control} 
                      name="maxPrice" 
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>إلى</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" placeholder="10000" />
                          </FormControl>
                        </FormItem>
                      )} 
                    />
                  </div>
                  
                  <div className="flex justify-end pt-2">
                    <Button type="submit">تطبيق</Button>
                  </div>
                </form>
              </Form>
            </PopoverContent>
          </Popover>
          
          <Button variant="outline" onClick={onExport} className="gap-2">
            <Download size={18} />
            تصدير
          </Button>
          
          <Button variant="outline" onClick={onShare} className="gap-2">
            <Share2 size={18} />
            مشاركة
          </Button>
          
          <Button 
            variant="destructive" 
            onClick={onBulkDelete} 
            disabled={selectedCount === 0} 
            className="gap-2"
          >
            <Trash2 size={18} />
            حذف ({selectedCount})
          </Button>
        </div>
      </div>
    </div>
  );
}


import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Plus, 
  File, 
  FileSpreadsheet, 
  Share2, 
  Trash2,
  Filter,
  Calendar
} from "lucide-react";
import { 
  Popover,
  PopoverTrigger,
  PopoverContent, 
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface MovementsToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onFilterChange: (filters: any) => void;
  selectedCount: number;
  onBulkDelete: () => void;
  onExport: (type: 'pdf' | 'excel') => void;
  onShare: () => void;
  onAddMovement: () => void;
}

export function MovementsToolbar({
  searchQuery,
  setSearchQuery,
  onFilterChange,
  selectedCount,
  onBulkDelete,
  onExport,
  onShare,
  onAddMovement
}: MovementsToolbarProps) {
  const form = useForm({
    defaultValues: {
      type: "",
      warehouse: "",
      startDate: "",
      endDate: ""
    }
  });

  const handleFilterSubmit = (data: any) => {
    onFilterChange(data);
  };

  return (
    <div className="mb-6 space-y-4 rtl">
      {/* Search and Actions Row */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="البحث عن حركة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button className="bg-teal hover:bg-teal-dark text-white gap-2" onClick={onAddMovement}>
            <Plus size={18} />
            حركة جديدة
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
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نوع الحركة</FormLabel>
                        <FormControl>
                          <select 
                            {...field} 
                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                          >
                            <option value="">جميع الأنواع</option>
                            <option value="inbound">وارد</option>
                            <option value="outbound">صادر</option>
                            <option value="transfer">نقل</option>
                          </select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="warehouse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المستودع</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="اسم المستودع" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>من تاريخ</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                              <Input {...field} type="date" className="pl-8" />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>إلى تاريخ</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                              <Input {...field} type="date" className="pl-8" />
                            </div>
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
          
          <Button variant="outline" onClick={() => onExport('pdf')} className="gap-2">
            <File size={18} />
            PDF
          </Button>
          
          <Button variant="outline" onClick={() => onExport('excel')} className="gap-2">
            <FileSpreadsheet size={18} />
            Excel
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

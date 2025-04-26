
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, FileSpreadsheet, Share2 } from "lucide-react";
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

interface ReorderToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onFilterChange: (filters: any) => void;
  onExport: (type: 'excel') => void;
  onShare: () => void;
}

export function ReorderToolbar({
  searchQuery,
  setSearchQuery,
  onFilterChange,
  onExport,
  onShare
}: ReorderToolbarProps) {
  const form = useForm({
    defaultValues: {
      warehouse: ""
    }
  });

  const handleFilterSubmit = (data: any) => {
    onFilterChange(data);
  };

  return (
    <div className="mb-6 space-y-4 rtl">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="البحث عن صنف..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter size={18} />
                تصفية حسب المستودع
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFilterSubmit)} className="space-y-4">
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
                  
                  <div className="flex justify-end pt-2">
                    <Button type="submit">تطبيق</Button>
                  </div>
                </form>
              </Form>
            </PopoverContent>
          </Popover>
          
          <Button variant="outline" onClick={() => onExport('excel')} className="gap-2">
            <FileSpreadsheet size={18} />
            تصدير إلى Excel
          </Button>
          
          <Button variant="outline" onClick={onShare} className="gap-2">
            <Share2 size={18} />
            مشاركة
          </Button>
        </div>
      </div>
    </div>
  );
}


import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const DropdownFixTest: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold">تجربة القوائم المنسدلة</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg mb-2">اختبار Select</h3>
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="اختر اللغة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ar">العربية</SelectItem>
              <SelectItem value="en">الإنجليزية</SelectItem>
              <SelectItem value="fr">الفرنسية</SelectItem>
              <SelectItem value="es">الإسبانية</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <h3 className="text-lg mb-2">اختبار DropdownMenu</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">فتح القائمة</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>العنصر الأول</DropdownMenuItem>
              <DropdownMenuItem>العنصر الثاني</DropdownMenuItem>
              <DropdownMenuItem>العنصر الثالث</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

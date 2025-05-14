
import React from "react";
import { Search, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormHeaderProps {
  onToggleSearchPanel: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  title?: string; // Added title prop
}

export const FormHeader: React.FC<FormHeaderProps> = ({ 
  onToggleSearchPanel, 
  searchTerm,
  onSearchChange,
  title = "إضافة أصناف" // Default title
}) => {
  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              className="pr-10"
              placeholder="البحث باسم الصنف أو الرمز..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <Button 
            onClick={onToggleSearchPanel}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-1 h-4 w-4" />
            اختيار من المخزون
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

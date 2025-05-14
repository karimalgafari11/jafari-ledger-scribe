
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

interface ColorPickerProps {
  id: string;
  label: string;
  color: string;
  description?: string;
  onChange: (value: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  id,
  label,
  color,
  description,
  onChange
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Common colors palette for quick selection
  const commonColors = [
    "#0a6e78", // تركواز
    "#2563eb", // أزرق
    "#8b5cf6", // بنفسجي
    "#ec4899", // وردي
    "#ef4444", // أحمر
    "#f97316", // برتقالي
    "#10b981", // أخضر
    "#800020", // بوردو
    "#1a1f2c", // أسود
    "#f8fafc", // أبيض
    "#64748b", // رمادي
    "#fdaa3f", // أصفر
  ];

  // Brightness calculation for determining text color
  const getBrightness = (hex: string) => {
    // Remove the # if present
    const sanitizedHex = hex.replace("#", "");
    
    // Convert to RGB
    const r = parseInt(sanitizedHex.substring(0, 2), 16) || 0;
    const g = parseInt(sanitizedHex.substring(2, 4), 16) || 0;
    const b = parseInt(sanitizedHex.substring(4, 6), 16) || 0;
    
    // Calculate brightness
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  // Determine if text should be white or black based on background color
  const textColor = getBrightness(color) > 128 ? "#000000" : "#ffffff";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {description && (
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6"
              >
                <Info className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              {description}
            </PopoverContent>
          </Popover>
        )}
      </div>
      
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 px-3 h-9"
            style={{ backgroundColor: color, color: textColor }}
          >
            <span style={{ backgroundColor: color }} className="w-4 h-4 rounded-full border border-gray-300"></span>
            <span>{color}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="grid gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor={`${id}-picker`}>اختر لون</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 text-xs"
                  onClick={() => setIsPopoverOpen(false)}
                >
                  تم
                </Button>
              </div>
              <Input
                id={`${id}-picker`}
                type="color"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label>قيمة اللون</Label>
              <Input
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="font-mono"
              />
            </div>
            
            <div className="space-y-2">
              <Label>ألوان شائعة</Label>
              <div className="grid grid-cols-6 gap-2">
                {commonColors.map((clr, index) => (
                  <Button
                    key={index}
                    className="w-full p-0 h-8"
                    style={{ backgroundColor: clr }}
                    variant="outline"
                    onClick={() => {
                      onChange(clr);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      {description && (
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
};

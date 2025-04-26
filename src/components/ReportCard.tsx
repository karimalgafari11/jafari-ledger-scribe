
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ReportCardProps {
  title: string;
  description: string;
  date: string;
  favorite: boolean;
  onFavoriteClick: () => void;
  onClick: () => void;
}

export function ReportCard({ 
  title, 
  description, 
  date,
  favorite,
  onFavoriteClick,
  onClick 
}: ReportCardProps) {
  return (
    <Card 
      className="overflow-hidden transition-all duration-200"
    >
      <div className="flex items-start p-4 rtl">
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-teal">{title}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteClick();
              }}
              className={cn(
                "hover:bg-transparent",
                favorite ? "text-yellow-500" : "text-gray-300"
              )}
            >
              <Star className="h-5 w-5" fill={favorite ? "currentColor" : "none"} />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              <span>آخر تحديث:</span>
              <span className="mr-1">{date}</span>
            </div>
            <Button 
              size="sm"
              variant="outline"
              onClick={onClick}
              className="text-sm border-teal text-teal hover:bg-teal hover:text-white"
            >
              عرض التقرير
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

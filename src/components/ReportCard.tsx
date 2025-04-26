
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface ReportCardProps {
  title: string;
  description: string;
  date: string;
  favorite?: boolean;
  onClick?: () => void;
}

export function ReportCard({ 
  title, 
  description, 
  date,
  favorite = false,
  onClick 
}: ReportCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200"
      onClick={onClick}
    >
      <div className="flex items-start p-4 rtl">
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-teal">{title}</h3>
            <div className={cn(
              "text-2xl",
              favorite ? "text-yellow-500" : "text-gray-300"
            )}>
              ★
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <div className="flex items-center text-xs text-gray-500">
            <span>آخر تحديث:</span>
            <span className="mr-1">{date}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

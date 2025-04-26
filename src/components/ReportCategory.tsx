
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReportCategoryProps {
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function ReportCategory({ icon, label, isActive, onClick }: ReportCategoryProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn(
        "h-24 w-32 flex flex-col items-center justify-center gap-2 p-3 transition-all",
        isActive 
          ? "border-teal bg-teal/10 text-teal shadow-sm" 
          : "hover:border-teal/50 hover:bg-teal/5"
      )}
    >
      <div className="text-2xl">{icon}</div>
      <span className="text-sm font-medium text-center">{label}</span>
    </Button>
  );
}

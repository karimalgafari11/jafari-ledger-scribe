
import { LucideIcon } from "lucide-react";
import { SystemAlert } from "@/types/ai";

export interface ShortcutItem {
  id: string;
  name: string;
  icon: LucideIcon;
  route: string;
  enabled: boolean;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "outline" | "destructive" | "success";
  };
  description?: string;
}

export interface DisplayOptions {
  showStats: boolean;
  showKpis: boolean;
  showCharts: boolean;
  showAiWidget: boolean;
}

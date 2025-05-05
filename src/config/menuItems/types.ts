
import { LucideIcon } from "lucide-react";

export interface MenuItem {
  section: string;
  icon: LucideIcon;
  path?: string;
  children?: {
    label: string;
    path: string;
    icon: LucideIcon;
  }[];
}

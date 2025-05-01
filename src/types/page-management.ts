
import { LucideIcon } from "lucide-react";

export interface PageManagementItem {
  id: string;
  section: string;
  path?: string;
  icon: LucideIcon;
  children?: PageManagementItem[];
  parentId?: string;
  isEnabled: boolean;
  isMinimized: boolean;
  permissions?: string[];
  color?: string;
}

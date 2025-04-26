
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

export interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path?: string;
  isActive?: boolean;
  onClick?: () => void;
  hasChildren?: boolean;
  isExpanded?: boolean;
  depth?: number;
}


import React from "react";

interface SidebarSectionHeaderProps {
  title: string;
}

const SidebarSectionHeader: React.FC<SidebarSectionHeaderProps> = ({ title }) => (
  <p className="px-4 py-1 text-xs text-sidebar-foreground/70">{title}</p>
);

export default SidebarSectionHeader;

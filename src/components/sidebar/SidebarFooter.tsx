
import React from "react";

interface SidebarFooterProps {
  collapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ collapsed }) => {
  return (
    <div className="mt-auto p-4 border-t border-sidebar-border">
      {!collapsed && (
        <div className="text-sidebar-foreground text-sm">
          <p>مرحباً بك، أحمد</p>
          <p className="text-xs opacity-70">مدير النظام</p>
        </div>
      )}
    </div>
  );
};

export default SidebarFooter;

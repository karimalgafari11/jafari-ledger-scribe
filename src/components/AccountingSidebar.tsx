import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { menuItems } from "@/config/menuItems";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import SidebarItem from "./sidebar/SidebarItem";
interface SidebarMenuProps {
  autoClose?: boolean;
}
const AccountingSidebar: React.FC<SidebarMenuProps> = ({
  autoClose = true
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const isSectionActive = (section: any): boolean => {
    if (section.path && currentPath === section.path) return true;
    if (section.children && section.children.length > 0) {
      return section.children.some((child: any) => child.path === currentPath);
    }
    return false;
  };
  React.useEffect(() => {
    const newExpandedSections: Record<string, boolean> = {};
    menuItems.forEach(section => {
      if (isSectionActive(section)) {
        newExpandedSections[section.section] = true;
      }
    });
    setExpandedSections(newExpandedSections);
  }, []);
  const toggleSection = (section: string) => {
    if (autoClose) {
      const newExpandedSections: Record<string, boolean> = {};
      if (!expandedSections[section]) {
        newExpandedSections[section] = true;
      }
      setExpandedSections(newExpandedSections);
    } else {
      setExpandedSections(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    }
  };
  const handleItemClick = (path: string) => {
    navigate(path);
  };
  return <div className="h-screen bg-sidebar overflow-y-auto flex-shrink-0 w-64">
      <div className="p-4 flex justify-between items-center border-b border-sidebar-border bg-orange-600 py-[22px] my-px rounded-full px-[44px]">
        <div className="text-sidebar-foreground font-bold text-xl px-[6px] py-px my-0 mx-0 rounded-lg bg-pink-950">الجعفري</div>
      </div>

      <div className="p-2 space-y-1 rtl">
        {menuItems.map(item => <div key={item.section} className="mb-1">
            {item.children && item.children.length > 0 ? <Collapsible open={expandedSections[item.section]} onOpenChange={() => toggleSection(item.section)} className="transition-all duration-200">
                <CollapsibleTrigger className="w-full text-right">
                  <SidebarItem icon={<item.icon size={20} />} label={item.section} isActive={isSectionActive(item)} hasChildren={true} isExpanded={expandedSections[item.section]} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-3 animate-accordion-down">
                  <div className="mt-1 mr-2 border-r-2 border-sidebar-border pr-2 space-y-1">
                    {item.children.map(child => <SidebarItem key={child.path} icon={<child.icon size={18} />} label={child.label} path={child.path} isActive={currentPath === child.path} onClick={() => handleItemClick(child.path)} depth={1} />)}
                  </div>
                </CollapsibleContent>
              </Collapsible> : <SidebarItem icon={<item.icon size={20} />} label={item.section} path={item.path} isActive={currentPath === item.path} onClick={() => item.path && handleItemClick(item.path)} />}
          </div>)}
      </div>

      <div className="mt-auto p-4 border-t border-sidebar-border rtl">
        <div className="text-sidebar-foreground text-sm">
          <p>مرحباً بك، أحمد</p>
          <p className="text-xs opacity-70">مدير النظام</p>
        </div>
      </div>
    </div>;
};
export default AccountingSidebar;
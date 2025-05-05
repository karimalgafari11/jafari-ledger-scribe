
import React from "react";
import { 
  Home, 
  Settings, 
  Database, 
  ShoppingCart, 
  Calendar, 
  PieChart, 
  FileText, 
  Users 
} from "lucide-react";
import SidebarNavItem from "./SidebarNavItem";
import SidebarSectionHeader from "./SidebarSectionHeader";
import CollapsibleSection from "./CollapsibleSection";

interface ExpandedViewProps {
  activePage: string;
  expandedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
  onChangePage: (page: string) => void;
}

const ExpandedView: React.FC<ExpandedViewProps> = ({ 
  activePage, 
  expandedSections, 
  toggleSection, 
  onChangePage 
}) => (
  <>
    <div className="mb-2">
      <SidebarSectionHeader title="لوحة التحكم" />
      <SidebarNavItem 
        icon={<Home size={20} />} 
        label="لوحة التحكم"
        active={activePage === "dashboard"}
        onClick={() => onChangePage("dashboard")}
      />
    </div>
    
    <div className="mb-2">
      <SidebarSectionHeader title="المالية" />
      <CollapsibleSection
        section="التقارير"
        icon={<FileText size={20} />}
        isExpanded={expandedSections["reports"]}
        onToggle={() => toggleSection("reports")}
        active={activePage === "reports"}
      >
        <SidebarNavItem 
          icon={<PieChart size={16} />} 
          label="تقارير المبيعات" 
          active={false}
          onClick={() => onChangePage("reports")}
        />
        <SidebarNavItem 
          icon={<PieChart size={16} />} 
          label="الأرباح والخسائر" 
          active={false}
          onClick={() => onChangePage("reports")}
        />
      </CollapsibleSection>
      
      <SidebarNavItem 
        icon={<Database size={20} />} 
        label="المخزون" 
        active={activePage === "inventory"}
        onClick={() => onChangePage("inventory")}
      />
    </div>
    
    <div className="mb-2">
      <SidebarSectionHeader title="العمليات" />
      <CollapsibleSection
        section="نقاط البيع"
        icon={<ShoppingCart size={20} />}
        isExpanded={expandedSections["pos"]}
        onToggle={() => toggleSection("pos")}
        active={activePage === "pos"}
      >
        <SidebarNavItem 
          icon={<ShoppingCart size={16} />} 
          label="شاشة البيع" 
          active={false}
          onClick={() => onChangePage("pos")}
        />
      </CollapsibleSection>
      
      <SidebarNavItem 
        icon={<Calendar size={20} />} 
        label="المصروفات" 
        active={activePage === "expenses"}
        onClick={() => onChangePage("expenses")}
      />
      <SidebarNavItem 
        icon={<PieChart size={20} />} 
        label="عروض ترويجية" 
        active={activePage === "promotions"}
        onClick={() => onChangePage("promotions")}
      />
    </div>
    
    <div className="mb-2">
      <SidebarSectionHeader title="الإدارة" />
      <SidebarNavItem 
        icon={<Users size={20} />} 
        label="المستخدمين" 
        active={activePage === "users"}
        onClick={() => onChangePage("users")}
      />
      <SidebarNavItem 
        icon={<Settings size={20} />} 
        label="الإعدادات" 
        active={activePage === "settings"}
        onClick={() => onChangePage("settings")}
      />
    </div>
  </>
);

export default ExpandedView;

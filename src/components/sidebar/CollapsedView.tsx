
import React from "react";
import CollapsedNavButton from "./CollapsedNavButton";
import { Home, FileText, Database, ShoppingCart, Users, Settings } from "lucide-react";

interface CollapsedViewProps {
  activePage: string;
  onChangePage: (page: string) => void;
}

const CollapsedView: React.FC<CollapsedViewProps> = ({ activePage, onChangePage }) => (
  <div className="flex flex-col items-center gap-4 py-4">
    <CollapsedNavButton 
      icon={<Home size={20} />}
      isActive={activePage === "dashboard"}
      onClick={() => onChangePage("dashboard")}
    />
    <CollapsedNavButton 
      icon={<FileText size={20} />}
      isActive={activePage === "reports"}
      onClick={() => onChangePage("reports")}
    />
    <CollapsedNavButton 
      icon={<Database size={20} />}
      isActive={activePage === "inventory"}
      onClick={() => onChangePage("inventory")}
    />
    <CollapsedNavButton 
      icon={<ShoppingCart size={20} />}
      isActive={activePage === "pos"}
      onClick={() => onChangePage("pos")}
    />
    <CollapsedNavButton 
      icon={<Users size={20} />}
      isActive={activePage === "users"}
      onClick={() => onChangePage("users")}
    />
    <CollapsedNavButton 
      icon={<Settings size={20} />}
      isActive={activePage === "settings"}
      onClick={() => onChangePage("settings")}
    />
  </div>
);

export default CollapsedView;

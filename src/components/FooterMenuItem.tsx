
import React from "react";
import { Link } from "react-router-dom";

interface FooterMenuItemProps {
  to: string;
  icon: JSX.Element;
  label: string;
}

const FooterMenuItem: React.FC<FooterMenuItemProps> = ({ to, icon, label }) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
    >
      <span className="text-gray-500">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default FooterMenuItem;

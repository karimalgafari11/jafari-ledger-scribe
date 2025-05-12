
import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export interface QuickActionCardProps {
  title: string;
  description: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  onClick,
  icon
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card 
        className="p-3 border border-indigo-100 rounded-lg bg-gradient-to-br from-white to-indigo-50/30 hover:bg-indigo-50/80 cursor-pointer transition-all duration-200 hover:shadow-md relative overflow-hidden group"
        onClick={onClick}
      >
        <div className="flex items-start gap-3 relative z-10">
          {icon && (
            <div className="bg-indigo-100 p-2 rounded-md flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
              {icon}
            </div>
          )}
          <div>
            <div className="font-medium text-blue-900 group-hover:text-indigo-700 transition-colors">{title}</div>
            <p className="text-xs text-muted-foreground mt-1 group-hover:text-indigo-600/70 transition-colors">{description}</p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-indigo-100 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
        <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-purple-100 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-300 delay-100"></div>
      </Card>
    </motion.div>
  );
};

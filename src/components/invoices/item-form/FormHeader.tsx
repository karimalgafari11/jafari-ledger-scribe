
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormHeaderProps {
  title: string;
  onClose: () => void;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ title, onClose }) => {
  return (
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-sm font-semibold">{title}</h3>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onClose} 
        className="h-6 w-6"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};


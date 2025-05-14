
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FormHeaderProps {
  title: string;
  onClose: () => void;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ title, onClose }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

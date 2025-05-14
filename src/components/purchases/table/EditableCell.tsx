
import React, { useEffect, useRef } from "react";

interface EditableCellProps {
  value: string;
  active: boolean;
  onActivate: () => void;
  onChange: (value: string) => void;
  type?: "text" | "number";
  placeholder?: string;
  className?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  value,
  active,
  onActivate,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
  inputRef
}) => {
  const localInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (active) {
      const inputElement = inputRef?.current || localInputRef.current;
      if (inputElement) {
        inputElement.focus();
        inputElement.select();
      }
    }
  }, [active, inputRef]);
  
  const handleBlur = () => {
    onChange(localInputRef.current?.value || "");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onChange(localInputRef.current?.value || "");
    }
  };
  
  if (active) {
    return (
      <input
        ref={inputRef || localInputRef}
        type={type}
        defaultValue={value}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full border-0 p-0 focus:ring-0 focus:outline-none ${className}`}
        placeholder={placeholder}
      />
    );
  }
  
  return (
    <div
      onClick={onActivate}
      className={`cursor-pointer ${value ? "" : "text-gray-400"} ${className}`}
    >
      {value || placeholder}
    </div>
  );
};

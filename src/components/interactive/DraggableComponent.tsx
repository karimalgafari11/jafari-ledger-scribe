
import React, { useState, ReactNode } from 'react';
import Draggable from 'react-draggable';
import { cn } from '@/lib/utils';

interface DraggableComponentProps {
  children: ReactNode;
  className?: string;
  defaultPosition?: { x: number; y: number };
  handle?: string;
  bounds?: string | object;
  disabled?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  children,
  className,
  defaultPosition = { x: 0, y: 0 },
  handle = '.drag-handle',
  bounds = 'parent',
  disabled = false,
  onDragStart,
  onDragEnd
}) => {
  const [position, setPosition] = useState(defaultPosition);
  
  const handleDrag = (_: any, data: { x: number; y: number }) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <Draggable
      position={position}
      defaultPosition={defaultPosition}
      onDrag={handleDrag}
      handle={handle}
      bounds={bounds}
      disabled={disabled}
      onStart={onDragStart}
      onStop={onDragEnd}
    >
      <div className={cn('relative', className)}>
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableComponent;

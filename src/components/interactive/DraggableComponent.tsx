
import React, { useState, ReactNode, useEffect } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
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
  const [isMounted, setIsMounted] = useState(false);
  
  // Ensure component is mounted before accessing DOM
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Updated handleDrag function with proper typing
  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  // If not mounted yet, render children without Draggable to avoid DOM issues
  if (!isMounted) {
    return <div className={cn('relative', className)}>{children}</div>;
  }

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

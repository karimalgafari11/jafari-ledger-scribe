
import React, { useState, ReactNode, useEffect, useRef } from 'react';
import Draggable, { DraggableData, DraggableEvent, DraggableEventHandler } from 'react-draggable';
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
  const nodeRef = useRef<HTMLDivElement>(null);
  
  // Use useEffect to ensure code only runs after mounting on client side
  useEffect(() => {
    // Set mounted state only after component is fully mounted
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100); // Increased timeout to ensure DOM is fully ready
    
    return () => {
      clearTimeout(timer);
      setIsMounted(false);
    };
  }, []);
  
  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleDragStart: DraggableEventHandler = (e) => {
    // Prevent dragging when clicking on interactive elements
    const target = e.target as HTMLElement;
    if (
      target.closest('button') || 
      target.closest('input') || 
      target.closest('select') || 
      target.closest('a')
    ) {
      return false;
    }
    
    if (onDragStart) {
      onDragStart();
    }
    return;
  };

  // Render regular div during SSR or before mounting
  if (!isMounted || typeof window === 'undefined') {
    return (
      <div ref={nodeRef} className={cn('relative', className)}>
        {children}
      </div>
    );
  }

  // Only render Draggable after fully mounted on client side
  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      defaultPosition={defaultPosition}
      onDrag={handleDrag}
      handle={handle}
      bounds={bounds}
      disabled={disabled}
      onStart={handleDragStart}
      onStop={onDragEnd}
    >
      <div ref={nodeRef} className={cn('relative', className)}>
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableComponent;

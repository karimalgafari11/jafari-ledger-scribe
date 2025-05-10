
import React, { useState, ReactNode, useEffect, useRef } from 'react';
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
  const nodeRef = useRef<HTMLDivElement>(null);
  
  // Use useEffect to safely handle client-side only code
  useEffect(() => {
    // Set isMounted to true when component mounts on client
    setIsMounted(true);
    
    // Clean up function to set isMounted to false when unmounting
    return () => {
      setIsMounted(false);
    };
  }, []);
  
  // Updated handleDrag function with proper typing
  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  // Prevent trying to use Draggable during SSR or before mounting
  if (!isMounted || typeof window === 'undefined') {
    return (
      <div className={cn('relative', className)} ref={nodeRef}>
        {children}
      </div>
    );
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      defaultPosition={defaultPosition}
      onDrag={handleDrag}
      handle={handle}
      bounds={bounds}
      disabled={disabled}
      onStart={onDragStart}
      onStop={onDragEnd}
    >
      <div ref={nodeRef} className={cn('relative', className)}>
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableComponent;

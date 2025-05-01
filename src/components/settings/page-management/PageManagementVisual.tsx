
import React, { useState } from 'react';
import { type PageItem, usePageManagement } from '@/hooks/usePageManagement';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  Edit, 
  Trash2, 
  Copy, 
  Minimize, 
  Maximize, 
  Eye, 
  EyeOff, 
  ChevronDown, 
  ChevronRight 
} from 'lucide-react';

interface PageItemProps {
  page: PageItem;
  index: number;
  depth?: number;
}

const PageItemComponent = ({ page, index, depth = 0 }: PageItemProps) => {
  const { handlePageAction } = usePageManagement();
  const [expanded, setExpanded] = useState(false);
  const hasChildren = page.children && page.children.length > 0;
  
  const Icon = page.icon;
  
  return (
    <Draggable draggableId={page.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="mb-2"
        >
          <Card className={`overflow-hidden ${!page.isEnabled ? 'opacity-60' : ''}`}>
            <div className="flex items-center p-3 border-b bg-muted/20">
              <div 
                {...provided.dragHandleProps}
                className="grid place-content-center w-8 h-8 mr-2 rounded-md hover:bg-muted"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 6H10M8 12H10M8 18H10M14 6H16M14 12H16M14 18H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex items-center" style={{ marginRight: `${depth * 16}px` }}>
                {hasChildren && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-0 mr-1"
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                )}
                {Icon && <Icon className="h-5 w-5 mr-2" />}
                <div className="flex-1 font-medium text-right">{page.section}</div>
              </div>
              <div className="flex items-center gap-1 mr-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handlePageAction('edit', page)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handlePageAction('duplicate', page)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handlePageAction('minimize', page)}
                >
                  {page.isMinimized ? (
                    <Maximize className="h-4 w-4" />
                  ) : (
                    <Minimize className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handlePageAction('enable', page)}
                >
                  {page.isEnabled ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500"
                  onClick={() => handlePageAction('delete', page)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {expanded && hasChildren && (
              <div className="p-2 bg-background">
                <ChildrenList pages={page.children} parentId={page.id} depth={depth + 1} />
              </div>
            )}
          </Card>
        </div>
      )}
    </Draggable>
  );
};

interface ChildrenListProps {
  pages?: PageItem[];
  parentId: string;
  depth: number;
}

const ChildrenList = ({ pages, parentId, depth }: ChildrenListProps) => {
  const { reorderPages } = usePageManagement();
  
  if (!pages || pages.length === 0) return null;
  
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    reorderPages(
      result.source.index,
      result.destination.index,
      parentId
    );
  };
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={parentId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {pages.map((page, index) => (
              <PageItemComponent
                key={page.id}
                page={page}
                index={index}
                depth={depth}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const PageManagementVisual = () => {
  const { pages, reorderPages } = usePageManagement();
  
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    reorderPages(
      result.source.index,
      result.destination.index
    );
  };
  
  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">إدارة الصفحات بطريقة مرئية</h3>
        <p className="text-muted-foreground text-sm">
          اسحب وأفلت لإعادة ترتيب الصفحات. انقر على الأيقونات لإدارة الصفحات.
        </p>
      </div>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="root">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {pages.map((page, index) => (
                <PageItemComponent
                  key={page.id}
                  page={page}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PageManagementVisual;

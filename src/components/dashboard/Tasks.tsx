
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

interface TasksProps {
  tasks: Task[];
}

export const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  return (
    <div className="space-y-3">
      {tasks && tasks.map((task) => (
        <div key={task.id} className="flex items-start gap-3 p-2 border-b last:border-b-0">
          <Checkbox checked={task.completed} />
          <div className="flex-1">
            <div className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              موعد التسليم: {task.dueDate}
            </div>
          </div>
        </div>
      ))}

      {(!tasks || tasks.length === 0) && (
        <div className="text-center py-4 text-gray-500">
          لا توجد مهام حالية
        </div>
      )}
    </div>
  );
};

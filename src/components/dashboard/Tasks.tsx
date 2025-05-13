
import React from 'react';
import { Check, Clock } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

interface TasksProps {
  tasks?: Task[];
}

export const Tasks: React.FC<TasksProps> = ({ tasks = [] }) => {
  if (tasks.length === 0) {
    return <div className="text-center py-4 text-gray-500">لا توجد مهام حالية</div>;
  }
  
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <div className={`p-1 rounded-full ${task.completed ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`}>
            {task.completed ? (
              <Check className="h-4 w-4 text-white" />
            ) : (
              <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{task.dueDate}</p>
          </div>
          <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md">
            {task.completed ? 'تراجع' : 'إكمال'}
          </button>
        </div>
      ))}
    </div>
  );
};

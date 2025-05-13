
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

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
    <div className="space-y-2">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Card key={task.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-2">
                <Checkbox id={`task-${task.id}`} checked={task.completed} />
                <div>
                  <label
                    htmlFor={`task-${task.id}`}
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                      task.completed ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {task.title}
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    {task.dueDate}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className="text-center p-4 text-gray-500">لا توجد مهام</div>
      )}
    </div>
  );
};

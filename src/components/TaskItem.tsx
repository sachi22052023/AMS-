import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  progress: "not_started" | "in_progress" | "completed";
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onProgressUpdate: (id: string, progress: "not_started" | "in_progress" | "completed") => void;
}

export const TaskItem = ({
  id,
  title,
  completed,
  priority,
  dueDate,
  progress,
  onComplete,
  onDelete,
  onProgressUpdate,
}: TaskItemProps) => {
  const { isAdmin } = useAuth();
  
  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const progressColors = {
    not_started: "bg-gray-100 text-gray-800",
    in_progress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <div className="animate-task-appear flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
      {!isAdmin && (
        <select
          value={progress}
          onChange={(e) => onProgressUpdate(id, e.target.value as "not_started" | "in_progress" | "completed")}
          className="rounded-lg border border-gray-300 px-2 py-1 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      )}
      <div className="flex-1">
        <p className="text-sm font-medium">
          {title}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className={cn(
            "inline-block rounded-full px-2 py-0.5 text-xs font-medium",
            priorityColors[priority]
          )}>
            {priority}
          </span>
          <span className={cn(
            "inline-block rounded-full px-2 py-0.5 text-xs font-medium",
            progressColors[progress]
          )}>
            {progress.replace('_', ' ')}
          </span>
          {dueDate && (
            <span className="text-xs text-gray-500">
              Due {dueDate.toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      {isAdmin && (
        <button
          onClick={() => onDelete(id)}
          className="text-gray-400 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
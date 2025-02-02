import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({
  id,
  title,
  completed,
  priority,
  dueDate,
  onComplete,
  onDelete,
}: TaskItemProps) => {
  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <div className="animate-task-appear flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
      <button
        onClick={() => onComplete(id)}
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors",
          completed
            ? "border-primary bg-primary text-white"
            : "border-gray-300 hover:border-primary"
        )}
      >
        {completed && <Check className="h-4 w-4" />}
      </button>
      <div className="flex-1">
        <p
          className={cn(
            "text-sm font-medium",
            completed && "text-gray-400 line-through"
          )}
        >
          {title}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span
            className={cn(
              "inline-block rounded-full px-2 py-0.5 text-xs font-medium",
              priorityColors[priority]
            )}
          >
            {priority}
          </span>
          {dueDate && (
            <span className="text-xs text-gray-500">
              Due {dueDate.toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={() => onDelete(id)}
        className="text-gray-400 hover:text-red-500"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};
import { Check, Trash2, FileUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  progress: "not_started" | "in_progress" | "completed";
  actionPlanUrl?: string;
  teamInvolvement?: string;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onProgressUpdate: (id: string, progress: "not_started" | "in_progress" | "completed") => void;
  onFileUpload?: (id: string, file: File) => void;
}

export const TaskItem = ({
  id,
  title,
  completed,
  priority,
  dueDate,
  progress,
  actionPlanUrl,
  teamInvolvement,
  onComplete,
  onDelete,
  onProgressUpdate,
  onFileUpload,
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(id, file);
    }
  };

  return (
    <div className="animate-task-appear flex flex-col gap-4 rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium">{title}</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div>
              <span className="text-xs text-gray-500">Priority:</span>
              <span className={cn(
                "ml-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                priorityColors[priority]
              )}>
                {priority}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-500">Status:</span>
              <span className={cn(
                "ml-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                progressColors[progress]
              )}>
                {progress.replace('_', ' ')}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-500">Due Date:</span>
              <span className="ml-2 text-xs">
                {dueDate ? dueDate.toLocaleDateString() : 'Not set'}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-500">Team:</span>
              <span className="ml-2 text-xs">{teamInvolvement || 'Not assigned'}</span>
            </div>
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
      {isAdmin && (
        <div className="flex items-center gap-2">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">
            <FileUp className="h-4 w-4" />
            Upload Action Plan
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
          {actionPlanUrl && (
            <a
              href={actionPlanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              View Plan
            </a>
          )}
        </div>
      )}
      {!isAdmin && actionPlanUrl && (
        <a
          href={actionPlanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          View Action Plan
        </a>
      )}
    </div>
  );
};
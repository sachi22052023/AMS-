import { Check, Trash2, FileUp, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  scheduledStartDate?: Date;
  scheduledEndDate?: Date;
  startTime?: string;
  endTime?: string;
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
  scheduledStartDate,
  scheduledEndDate,
  startTime,
  endTime,
  progress,
  actionPlanUrl,
  teamInvolvement,
  onComplete,
  onDelete,
  onProgressUpdate,
  onFileUpload,
}: TaskItemProps) => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [currentProgress, setCurrentProgress] = useState(progress);
  
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

  const handleSaveProgress = () => {
    onProgressUpdate(id, currentProgress);
    toast({
      title: "Progress updated",
      description: "Task progress has been saved successfully.",
    });
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
              <select
                value={currentProgress}
                onChange={(e) => setCurrentProgress(e.target.value as "not_started" | "in_progress" | "completed")}
                className="ml-2 rounded border border-gray-300 px-2 py-0.5 text-xs"
              >
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button
                onClick={handleSaveProgress}
                className="ml-2 inline-flex items-center rounded border border-gray-300 px-2 py-0.5 text-xs hover:bg-gray-50"
              >
                <Save className="mr-1 h-3 w-3" />
                Save
              </button>
            </div>
            <div>
              <span className="text-xs text-gray-500">Start:</span>
              <span className="ml-2 text-xs">
                {scheduledStartDate ? scheduledStartDate.toLocaleDateString() : 'Not set'}
                {startTime ? ` ${startTime}` : ''}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-500">End:</span>
              <span className="ml-2 text-xs">
                {scheduledEndDate ? scheduledEndDate.toLocaleDateString() : 'Not set'}
                {endTime ? ` ${endTime}` : ''}
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
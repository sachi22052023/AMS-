import { useState } from "react";
import { Plus } from "lucide-react";

interface AddTaskFormProps {
  onAdd: (task: {
    title: string;
    priority: "low" | "medium" | "high";
    scheduledStartDate?: Date;
    scheduledEndDate?: Date;
    startTime?: string;
    endTime?: string;
    teamInvolvement?: string;
  }) => void;
}

export const AddTaskForm = ({ onAdd }: AddTaskFormProps) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [scheduledStartDate, setScheduledStartDate] = useState("");
  const [scheduledEndDate, setScheduledEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [teamInvolvement, setTeamInvolvement] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      priority,
      scheduledStartDate: scheduledStartDate ? new Date(scheduledStartDate) : undefined,
      scheduledEndDate: scheduledEndDate ? new Date(scheduledEndDate) : undefined,
      startTime,
      endTime,
      teamInvolvement: teamInvolvement.trim(),
    });

    setTitle("");
    setPriority("medium");
    setScheduledStartDate("");
    setScheduledEndDate("");
    setStartTime("");
    setEndTime("");
    setTeamInvolvement("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-hover"
        >
          <Plus className="h-5 w-5" />
          Add Task
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="date"
              value={scheduledStartDate}
              onChange={(e) => setScheduledStartDate(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Scheduled Start Date"
            />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              value={scheduledEndDate}
              onChange={(e) => setScheduledEndDate(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Scheduled End Date"
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <input
          type="text"
          value={teamInvolvement}
          onChange={(e) => setTeamInvolvement(e.target.value)}
          placeholder="Team members involved..."
          className="rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
    </form>
  );
};
import { useState } from "react";
import { TaskItem } from "./TaskItem";
import { AddTaskForm } from "./AddTaskForm";
import { TaskFilter } from "./TaskFilter";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  progress: "not_started" | "in_progress" | "completed";
  actionPlanUrl?: string;
  teamInvolvement?: string;
}

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  const addTask = (newTask: {
    title: string;
    priority: "low" | "medium" | "high";
    dueDate?: Date;
    teamInvolvement?: string;
  }) => {
    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      completed: false,
      progress: "not_started",
      ...newTask,
    };
    setTasks((prev) => [task, ...prev]);
    toast({
      title: "Task added",
      description: "Your new task has been added successfully.",
    });
  };

  const handleFileUpload = async (id: string, file: File) => {
    const url = URL.createObjectURL(file);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, actionPlanUrl: url } : task
      )
    );
    toast({
      title: "File uploaded",
      description: "Action plan has been uploaded successfully.",
    });
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    if (!isAdmin) return;
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been deleted successfully.",
    });
  };

  const updateProgress = (id: string, progress: "not_started" | "in_progress" | "completed") => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, progress } : task
      )
    );
    toast({
      title: "Progress updated",
      description: "Task progress has been updated successfully.",
    });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return task.progress !== "completed";
    if (filter === "completed") return task.progress === "completed";
    return true;
  });

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
        Task Scheduler
      </h2>
      {isAdmin && <AddTaskForm onAdd={addTask} />}
      {isAdmin && <TaskFilter filter={filter} onFilterChange={setFilter} />}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            {...task}
            onComplete={toggleComplete}
            onDelete={deleteTask}
            onProgressUpdate={updateProgress}
            onFileUpload={isAdmin ? handleFileUpload : undefined}
          />
        ))}
        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-500">No tasks found.</p>
        )}
      </div>
    </div>
  );
};
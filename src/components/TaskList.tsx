import { useState, useEffect } from "react";
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
  scheduledStartDate?: Date;
  scheduledEndDate?: Date;
  progress: "not_started" | "in_progress" | "completed";
  actionPlanUrl?: string;
  teamInvolvement?: string;
}

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        const tasksWithDates = parsedTasks.map((task: any) => ({
          ...task,
          scheduledStartDate: task.scheduledStartDate ? new Date(task.scheduledStartDate) : undefined,
          scheduledEndDate: task.scheduledEndDate ? new Date(task.scheduledEndDate) : undefined
        }));
        setTasks(tasksWithDates);
      } catch (error) {
        console.error('Error loading tasks:', error);
        setTasks([]);
      }
    }
  }, []);

  const addTask = (newTask: {
    title: string;
    priority: "low" | "medium" | "high";
    scheduledStartDate?: Date;
    scheduledEndDate?: Date;
    teamInvolvement?: string;
  }) => {
    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      completed: false,
      progress: "not_started",
      ...newTask,
    };
    
    const updatedTasks = [task, ...tasks];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
    toast({
      title: "Task added",
      description: "Your new task has been added successfully.",
    });
  };

  const handleFileUpload = async (id: string, file: File) => {
    const url = URL.createObjectURL(file);
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, actionPlanUrl: url } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
    toast({
      title: "File uploaded",
      description: "Action plan has been uploaded successfully.",
    });
  };

  const toggleComplete = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (id: string) => {
    if (!isAdmin) return;
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
    toast({
      title: "Task deleted",
      description: "The task has been deleted successfully.",
    });
  };

  const updateProgress = (id: string, progress: "not_started" | "in_progress" | "completed") => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, progress } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
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
    <div className="p-6">
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
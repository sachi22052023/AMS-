import { useState } from "react";
import { TaskItem } from "./TaskItem";
import { AddTaskForm } from "./AddTaskForm";
import { TaskFilter } from "./TaskFilter";
import { useToast } from "@/components/ui/use-toast";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: Date;
}

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const { toast } = useToast();

  const addTask = (newTask: {
    title: string;
    priority: "low" | "medium" | "high";
    dueDate?: Date;
  }) => {
    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      completed: false,
      ...newTask,
    };
    setTasks((prev) => [task, ...prev]);
    toast({
      title: "Task added",
      description: "Your new task has been added successfully.",
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
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been deleted successfully.",
    });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
        Task Scheduler
      </h1>
      <AddTaskForm onAdd={addTask} />
      <TaskFilter filter={filter} onFilterChange={setFilter} />
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            {...task}
            onComplete={toggleComplete}
            onDelete={deleteTask}
          />
        ))}
        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-500">No tasks found.</p>
        )}
      </div>
    </div>
  );
};
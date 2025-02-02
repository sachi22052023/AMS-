import { useState } from "react";
import { TaskItem } from "./TaskItem";
import { AddTaskForm } from "./AddTaskForm";
import { TaskFilter } from "./TaskFilter";
import { useAuth } from "@/contexts/AuthContext";

export const TaskList = () => {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const { isAdmin } = useAuth();

  const tasks = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
  ];

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto">
      {isAdmin && <AddTaskForm />}
      {isAdmin && (
        <TaskFilter filter={filter} onFilterChange={setFilter} />
      )}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
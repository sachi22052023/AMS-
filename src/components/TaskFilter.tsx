import { cn } from "@/lib/utils";

interface TaskFilterProps {
  filter: "all" | "active" | "completed";
  onFilterChange: (filter: "all" | "active" | "completed") => void;
}

export const TaskFilter = ({ filter, onFilterChange }: TaskFilterProps) => {
  const filters = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
  ] as const;

  return (
    <div className="mb-6 flex gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
            filter === f.value
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};
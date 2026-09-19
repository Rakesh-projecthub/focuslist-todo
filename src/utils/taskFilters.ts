import type { Priority, Task } from "../types/task";

export type StatusFilter = "all" | "active" | "completed";

export interface TaskFilterOptions {
  search: string;
  status: StatusFilter;
  priority: Priority | "all";
}

export function filterTasks(tasks: Task[], options: TaskFilterOptions): Task[] {
  const query = options.search.trim().toLocaleLowerCase();

  return tasks.filter((task) => {
    const matchesSearch = !query || task.title.toLocaleLowerCase().includes(query);
    const matchesStatus =
      options.status === "all" ||
      (options.status === "active" && !task.completed) ||
      (options.status === "completed" && task.completed);
    const matchesPriority = options.priority === "all" || task.priority === options.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });
}

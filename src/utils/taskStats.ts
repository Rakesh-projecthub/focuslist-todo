import type { Task } from "../types/task";

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
}

export function getTaskStats(tasks: Task[]): TaskStats {
  const completed = tasks.reduce((count, task) => count + Number(task.completed), 0);

  return {
    total: tasks.length,
    completed,
    pending: tasks.length - completed,
  };
}

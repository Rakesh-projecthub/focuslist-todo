import type { Priority, Task } from "../types/task";

export const MAX_TITLE_LENGTH = 160;

export function sanitizeTitle(value: string): string {
  return value
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_TITLE_LENGTH);
}

export function createTask(title: string, priority: Priority): Task | null {
  const cleanTitle = sanitizeTitle(title);
  if (!cleanTitle) return null;

  const now = Date.now();

  return {
    id: crypto.randomUUID(),
    title: cleanTitle,
    priority,
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
}

export function updateTask(
  task: Task,
  title: string,
  priority: Priority
): Task {
  const cleanTitle = sanitizeTitle(title);

  return {
    ...task,
    title: cleanTitle || task.title,
    priority,
    updatedAt: Date.now(),
  };
}
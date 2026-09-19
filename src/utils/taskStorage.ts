import type { Priority, Task } from "../types/task";
import { MAX_TITLE_LENGTH } from "./taskHelpers";

export const STORAGE_KEY = "focuslist.tasks.v1";

const priorities: readonly Priority[] = ["high", "medium", "low"];

function isPriority(value: unknown): value is Priority {
  return typeof value === "string" && priorities.includes(value as Priority);
}

function isFiniteTimestamp(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

export function isStoredTask(value: unknown): value is Task {
  if (!value || typeof value !== "object") return false;

  const task = value as Record<string, unknown>;

  return (
    typeof task.id === "string" &&
    task.id.trim().length > 0 &&
    typeof task.title === "string" &&
    task.title.trim().length > 0 &&
    task.title.length <= MAX_TITLE_LENGTH &&
    isPriority(task.priority) &&
    typeof task.completed === "boolean" &&
    isFiniteTimestamp(task.createdAt) &&
    isFiniteTimestamp(task.updatedAt)
  );
}

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function loadTasks(): Task[] {
  const storage = getStorage();
  if (!storage) return [];

  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isStoredTask);
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]): boolean {
  const storage = getStorage();
  if (!storage) return false;

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch {
    return false;
  }
}

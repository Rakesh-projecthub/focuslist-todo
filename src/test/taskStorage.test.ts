import { beforeEach, describe, expect, it } from "vitest";
import type { Task } from "../types/task";
import { isStoredTask, loadTasks, saveTasks, STORAGE_KEY } from "../utils/taskStorage";

const validTask: Task = {
  id: "task-1",
  title: "Valid task",
  priority: "high",
  completed: false,
  createdAt: 100,
  updatedAt: 100,
};

beforeEach(() => {
  localStorage.clear();
});

describe("task storage", () => {
  it("persists and loads valid tasks", () => {
    expect(saveTasks([validTask])).toBe(true);
    expect(loadTasks()).toEqual([validTask]);
  });

  it("rejects malformed stored records", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        validTask,
        { ...validTask, id: "", priority: "urgent" },
        { ...validTask, title: "" },
        { ...validTask, updatedAt: Number.POSITIVE_INFINITY },
      ]),
    );

    expect(loadTasks()).toEqual([validTask]);
  });

  it("handles invalid JSON safely", () => {
    localStorage.setItem(STORAGE_KEY, "not-json");
    expect(loadTasks()).toEqual([]);
  });

  it("validates a stored task shape", () => {
    expect(isStoredTask(validTask)).toBe(true);
    expect(isStoredTask({ ...validTask, completed: "false" })).toBe(false);
  });
});

import { describe, expect, it } from "vitest";
import type { Task } from "../types/task";
import { filterTasks } from "../utils/taskFilters";

const tasks: Task[] = [
  { id: "1", title: "Buy milk", priority: "high", completed: false, createdAt: 1, updatedAt: 1 },
  { id: "2", title: "Read book", priority: "medium", completed: true, createdAt: 2, updatedAt: 2 },
  { id: "3", title: "Buy vegetables", priority: "low", completed: false, createdAt: 3, updatedAt: 3 },
];

describe("filterTasks", () => {
  it("returns all tasks when no filters are applied", () => {
    expect(filterTasks(tasks, { search: "", status: "all", priority: "all" })).toHaveLength(3);
  });

  it("searches titles case-insensitively", () => {
    expect(filterTasks(tasks, { search: "BUY", status: "all", priority: "all" }).map((task) => task.id)).toEqual(["1", "3"]);
  });

  it("filters active and completed tasks", () => {
    expect(filterTasks(tasks, { search: "", status: "active", priority: "all" }).map((task) => task.id)).toEqual(["1", "3"]);
    expect(filterTasks(tasks, { search: "", status: "completed", priority: "all" }).map((task) => task.id)).toEqual(["2"]);
  });

  it("filters by priority", () => {
    expect(filterTasks(tasks, { search: "", status: "all", priority: "high" }).map((task) => task.id)).toEqual(["1"]);
  });

  it("combines search, status and priority filters", () => {
    expect(filterTasks(tasks, { search: "buy", status: "active", priority: "low" }).map((task) => task.id)).toEqual(["3"]);
  });
});

import { describe, expect, it } from "vitest";
import type { Task } from "../types/task";
import { getTaskStats } from "../utils/taskStats";

const tasks: Task[] = [
  { id: "1", title: "One", priority: "high", completed: true, createdAt: 1, updatedAt: 1 },
  { id: "2", title: "Two", priority: "medium", completed: false, createdAt: 2, updatedAt: 2 },
  { id: "3", title: "Three", priority: "low", completed: false, createdAt: 3, updatedAt: 3 },
];

describe("getTaskStats", () => {
  it("calculates total, completed and pending counts", () => {
    expect(getTaskStats(tasks)).toEqual({ total: 3, completed: 1, pending: 2 });
  });

  it("returns zero counts for an empty list", () => {
    expect(getTaskStats([])).toEqual({ total: 0, completed: 0, pending: 0 });
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTask, sanitizeTitle, updateTask } from "../utils/taskHelpers";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("task helpers", () => {
  it("sanitizes whitespace and control characters", () => {
    expect(sanitizeTitle("  Buy\u0000 milk   today  ")).toBe("Buy milk today");
  });

  it("limits titles to 160 characters", () => {
    expect(sanitizeTitle("x".repeat(200))).toHaveLength(160);
  });

  it("creates a valid task with the selected priority", () => {
    vi.spyOn(crypto, "randomUUID").mockReturnValue("task-1" as `${string}-${string}-${string}-${string}-${string}`);
    const task = createTask("Finish assignment", "high");

    expect(task).toMatchObject({
      id: "task-1",
      title: "Finish assignment",
      priority: "high",
      completed: false,
    });
  });

  it("rejects an empty task", () => {
    expect(createTask("   ", "low")).toBeNull();
  });

  it("updates title, priority and updatedAt without changing the id", () => {
    const original = {
      id: "task-1",
      title: "Old title",
      priority: "low" as const,
      completed: true,
      createdAt: 10,
      updatedAt: 20,
    };

    vi.spyOn(Date, "now").mockReturnValue(30);
    expect(updateTask(original, " New title ", "high")).toEqual({
      ...original,
      title: "New title",
      priority: "high",
      updatedAt: 30,
    });
  });
});

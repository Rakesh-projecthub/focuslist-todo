import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import type { Task } from "../types/task";
import { TaskItem } from "../components/TaskItem";

const task: Task = {
  id: "task-1",
  title: "Prepare demo",
  priority: "medium",
  completed: false,
  createdAt: 1,
  updatedAt: 1,
};

describe("TaskItem", () => {
  it("toggles completion", () => {
    const onToggle = vi.fn();
    render(<TaskItem task={task} onToggle={onToggle} onEdit={vi.fn()} onDelete={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /mark prepare demo as completed/i }));
    expect(onToggle).toHaveBeenCalledWith("task-1");
  });

  it("edits the title and priority", () => {
    const onEdit = vi.fn();
    render(<TaskItem task={task} onToggle={vi.fn()} onEdit={onEdit} onDelete={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /edit prepare demo/i }));
    fireEvent.change(screen.getByLabelText("Edit task title"), { target: { value: "Updated demo" } });
    fireEvent.change(screen.getByLabelText("Edit task priority"), { target: { value: "high" } });
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    expect(onEdit).toHaveBeenCalledWith("task-1", "Updated demo", "high");
  });

  it("deletes the task", () => {
    const onDelete = vi.fn();
    render(<TaskItem task={task} onToggle={vi.fn()} onEdit={vi.fn()} onDelete={onDelete} />);

    fireEvent.click(screen.getByRole("button", { name: /delete prepare demo/i }));
    expect(onDelete).toHaveBeenCalledWith("task-1");
  });
});

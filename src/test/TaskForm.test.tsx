import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TaskForm } from "../components/TaskForm";

describe("TaskForm", () => {
  it("submits a title with the selected priority and clears the form", () => {
    const onAdd = vi.fn(() => true);
    render(<TaskForm onAdd={onAdd} />);

    fireEvent.change(screen.getByLabelText("Task title"), { target: { value: "Prepare demo" } });
    fireEvent.change(screen.getByLabelText("Task priority"), { target: { value: "high" } });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    expect(onAdd).toHaveBeenCalledWith("Prepare demo", "high");
    expect(screen.getByLabelText("Task title")).toHaveValue("");
  });

  it("shows validation feedback when the task cannot be created", () => {
    const onAdd = vi.fn(() => false);
    render(<TaskForm onAdd={onAdd} />);

    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a task title");
  });
});

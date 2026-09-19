import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";
import { STORAGE_KEY } from "../utils/taskStorage";

beforeEach(() => {
  localStorage.clear();
});

describe("FocusList application", () => {
  it("creates, completes, searches, edits and deletes a task", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText("Task title"), {
      target: { value: "Study React" },
    });

    fireEvent.change(screen.getByLabelText("Task priority"), {
      target: { value: "high" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /add task/i,
      }),
    );

    expect(screen.getByText("Study React")).toBeInTheDocument();
    expect(screen.getByText("high")).toBeInTheDocument();

    const totalTasksCard = screen
      .getByText("Total Tasks")
      .closest("article");

    expect(totalTasksCard).not.toBeNull();

    expect(
      within(totalTasksCard!).getByText("1", {
        selector: "strong",
      }),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: /mark study react as completed/i,
      }),
    );

    const completedStatsCard = screen
      .getByText("Completed", {
        selector: ".stat-label",
      })
      .closest("article");

    expect(completedStatsCard).not.toBeNull();

    expect(
      within(completedStatsCard!).getByText("1", {
        selector: "strong",
      }),
    ).toBeInTheDocument();

    fireEvent.change(
      screen.getByLabelText(/search tasks by title/i),
      {
        target: { value: "react" },
      },
    );

    expect(screen.getByText("Study React")).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: /edit study react/i,
      }),
    );

    fireEvent.change(
      screen.getByLabelText("Edit task title"),
      {
        target: { value: "Study TypeScript" },
      },
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /save changes/i,
      }),
    );

    fireEvent.change(
      screen.getByLabelText(/search tasks by title/i),
      {
        target: { value: "" },
      },
    );

    expect(
      screen.getByText("Study TypeScript"),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: /delete study typescript/i,
      }),
    );

    expect(
      screen.queryByText("Study TypeScript"),
    ).not.toBeInTheDocument();
  });

  it("persists task data through LocalStorage", () => {
    const { unmount } = render(<App />);

    fireEvent.change(screen.getByLabelText("Task title"), {
      target: { value: "Persist me" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /add task/i,
      }),
    );

    unmount();

    expect(
      JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? "[]",
      ),
    ).toHaveLength(1);

    render(<App />);

    expect(
      screen.getByText("Persist me"),
    ).toBeInTheDocument();
  });
});
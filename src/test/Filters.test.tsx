import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Filters } from "../components/Filters";

describe("Filters", () => {
  it("reports search changes", () => {
    const onSearch = vi.fn();
    render(<Filters search="" status="all" priority="all" onSearch={onSearch} onStatus={vi.fn()} onPriority={vi.fn()} />);

    fireEvent.change(screen.getByLabelText(/search tasks by title/i), { target: { value: "report" } });
    expect(onSearch).toHaveBeenCalledWith("report");
  });

  it("reports status filter changes", () => {
    const onStatus = vi.fn();
    render(<Filters search="" status="all" priority="all" onSearch={vi.fn()} onStatus={onStatus} onPriority={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Completed" }));
    expect(onStatus).toHaveBeenCalledWith("completed");
  });

  it("reports priority filter changes", () => {
    const onPriority = vi.fn();
    render(<Filters search="" status="all" priority="all" onSearch={vi.fn()} onStatus={vi.fn()} onPriority={onPriority} />);

    fireEvent.change(screen.getByLabelText("Priority"), { target: { value: "high" } });
    expect(onPriority).toHaveBeenCalledWith("high");
  });
});

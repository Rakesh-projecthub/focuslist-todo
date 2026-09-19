import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Stats } from "../components/Stats";

describe("Stats", () => {
  it("renders total, completed and pending values", () => {
    render(<Stats total={8} completed={3} pending={5} />);
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});

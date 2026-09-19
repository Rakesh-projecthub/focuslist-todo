import type { Priority } from "../types/task";
import type { StatusFilter } from "../utils/taskFilters";

interface FiltersProps {
  search: string;
  status: StatusFilter;
  priority: Priority | "all";
  onSearch: (value: string) => void;
  onStatus: (value: StatusFilter) => void;
  onPriority: (value: Priority | "all") => void;
}

export function Filters({
  search,
  status,
  priority,
  onSearch,
  onStatus,
  onPriority,
}: FiltersProps) {
  return (
    <section className="filter-panel" aria-label="Task search and filters">
      <div className="search-wrap">
        <label className="sr-only" htmlFor="task-search">Search tasks by title</label>
        <span className="search-symbol" aria-hidden="true">⌕</span>
        <input
          id="task-search"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search tasks..."
          maxLength={160}
          type="search"
          autoComplete="off"
        />
        {search && (
          <button
            className="clear-search"
            type="button"
            onClick={() => onSearch("")}
            aria-label="Clear task search"
          >
            ×
          </button>
        )}
      </div>

      <div className="filter-row">
        <fieldset className="segmented">
          <legend className="sr-only">Task status filter</legend>
          {(["all", "active", "completed"] as const).map((item) => (
            <button
              key={item}
              type="button"
              className={status === item ? "filter-button selected" : "filter-button"}
              aria-pressed={status === item}
              onClick={() => onStatus(item)}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </fieldset>

        <label className="priority-filter" htmlFor="priority-filter">
          <span>Priority</span>
          <select
            id="priority-filter"
            value={priority}
            onChange={(event) => onPriority(event.target.value as Priority | "all")}
          >
            <option value="all">All priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
      </div>
    </section>
  );
}

export type { StatusFilter } from "../utils/taskFilters";

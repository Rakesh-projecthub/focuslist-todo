import { useMemo, useState } from "react";
import type { Priority } from "./types/task";
import { useTasks } from "./hooks/useTasks";
import { Filters, type StatusFilter } from "./components/Filters";
import { Stats } from "./components/Stats";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { filterTasks } from "./utils/taskFilters";

function App() {
  const { tasks, stats, addTask, toggleTask, editTask, deleteTask, clearCompleted } = useTasks();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [priority, setPriority] = useState<Priority | "all">("all");

  const filteredTasks = useMemo(
    () => filterTasks(tasks, { search, status, priority }),
    [tasks, search, status, priority],
  );

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-inner">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">F</div>
            <div>
              <p className="eyebrow">PERSONAL PRODUCTIVITY</p>
              <h1>FocusList</h1>
            </div>
          </div>
          <p className="hero-copy">A calm, simple place to focus on what matters.</p>
        </div>
      </header>

      <main className="container">
        <Stats {...stats} />

        <section className="workspace" aria-labelledby="workspace-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">TODAY</p>
              <h2 id="workspace-title">Your tasks</h2>
            </div>
            <span className="result-count" aria-live="polite">
              {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>

          <TaskForm onAdd={addTask} />
          <Filters
            search={search}
            status={status}
            priority={priority}
            onSearch={setSearch}
            onStatus={setStatus}
            onPriority={setPriority}
          />

          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onEdit={editTask}
            onDelete={deleteTask}
          />

          {stats.completed > 0 && (
            <div className="list-footer">
              <button type="button" className="text-button" onClick={clearCompleted}>
                Clear completed
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <span>FocusList</span>
        <span aria-hidden="true">•</span>
        <span>Your tasks stay on this device.</span>
      </footer>
    </div>
  );
}

export default App;

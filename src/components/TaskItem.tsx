import { useEffect, useRef, useState } from "react";
import type { Priority, Task } from "../types/task";
import { sanitizeTitle } from "../utils/taskHelpers";
import { Icon } from "./Icon";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string, priority: Priority) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState<Priority>(task.priority);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  function save() {
    const cleanTitle = sanitizeTitle(title);
    if (!cleanTitle) {
      setError("Task title cannot be empty.");
      return;
    }

    onEdit(task.id, cleanTitle, priority);
    setError("");
    setEditing(false);
  }

  function startEditing() {
    setTitle(task.title);
    setPriority(task.priority);
    setError("");
    setEditing(true);
  }

  function cancel() {
    setTitle(task.title);
    setPriority(task.priority);
    setError("");
    setEditing(false);
  }

  if (editing) {
    return (
      <li className="task-item editing">
        <div className="edit-fields">
          <label className="sr-only" htmlFor={`edit-title-${task.id}`}>Edit task title</label>
          <input
            id={`edit-title-${task.id}`}
            ref={inputRef}
            value={title}
            maxLength={160}
            onChange={(event) => {
              setTitle(event.target.value);
              if (error) setError("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") save();
              if (event.key === "Escape") cancel();
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `edit-error-${task.id}` : undefined}
          />
          <label className="sr-only" htmlFor={`edit-priority-${task.id}`}>Edit task priority</label>
          <select
            id={`edit-priority-${task.id}`}
            value={priority}
            onChange={(event) => setPriority(event.target.value as Priority)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {error && <span id={`edit-error-${task.id}`} className="form-error" role="alert">{error}</span>}
        </div>
        <div className="task-actions">
          <button type="button" className="icon-button success" onClick={save} aria-label={`Save changes to ${task.title}`}>
            <Icon label="Save">✓</Icon>
          </button>
          <button type="button" className="icon-button" onClick={cancel} aria-label={`Cancel editing ${task.title}`}>
            <Icon label="Cancel">×</Icon>
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className={task.completed ? "task-item completed" : "task-item"}>
      <button
        type="button"
        className={task.completed ? "check-button checked" : "check-button"}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? `Mark ${task.title} as active` : `Mark ${task.title} as completed`}
        aria-pressed={task.completed}
      >
        {task.completed ? "✓" : ""}
      </button>

      <div className="task-content">
        <span className="task-title">{task.title}</span>
        <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
      </div>

      <div className="task-actions">
        <button type="button" className="icon-button" onClick={startEditing} aria-label={`Edit ${task.title}`}>
          <Icon label="Edit">✎</Icon>
        </button>
        <button type="button" className="icon-button danger" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`}>
          <Icon label="Delete">⌫</Icon>
        </button>
      </div>
    </li>
  );
}

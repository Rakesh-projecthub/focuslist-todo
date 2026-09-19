import { useState, type FormEvent } from "react";
import type { Priority } from "../types/task";
import { Icon } from "./Icon";

interface TaskFormProps {
  onAdd: (title: string, priority: Priority) => boolean;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!onAdd(title, priority)) {
      setError("Enter a task title before adding it.");
      return;
    }

    setTitle("");
    setPriority("medium");
    setError("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit} aria-label="Add a new task" noValidate>
      <div className="form-field">
        <label className="sr-only" htmlFor="new-task">Task title</label>
        <input
          id="new-task"
          name="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            if (error) setError("");
          }}
          maxLength={160}
          autoComplete="off"
          placeholder="What needs to be done?"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "task-title-error" : undefined}
          required
        />
        {error && <span id="task-title-error" className="form-error" role="alert">{error}</span>}
      </div>

      <label className="sr-only" htmlFor="new-priority">Task priority</label>
      <select
        id="new-priority"
        value={priority}
        onChange={(event) => setPriority(event.target.value as Priority)}
        aria-label="Task priority"
      >
        <option value="high">High priority</option>
        <option value="medium">Medium priority</option>
        <option value="low">Low priority</option>
      </select>
      <button className="primary-button" type="submit">
        <Icon label="Add">+</Icon>
        <span>Add Task</span>
      </button>
    </form>
  );
}

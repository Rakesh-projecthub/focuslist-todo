import { useEffect, useMemo, useState } from "react";
import type { Priority, Task } from "../types/task";
import { createTask, updateTask } from "../utils/taskHelpers";
import { loadTasks, saveTasks } from "../utils/taskStorage";
import { getTaskStats } from "../utils/taskStats";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (title: string, priority: Priority): boolean => {
    const task = createTask(title, priority);
    if (!task) return false;

    setTasks((current) => [task, ...current]);
    return true;
  };

  const toggleTask = (id: string): void => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: Date.now() }
          : task,
      ),
    );
  };

  const editTask = (id: string, title: string, priority: Priority): void => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? updateTask(task, title, priority) : task)),
    );
  };

  const deleteTask = (id: string): void => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const clearCompleted = (): void => {
    setTasks((current) => current.filter((task) => !task.completed));
  };

  const stats = useMemo(() => getTaskStats(tasks), [tasks]);

  return { tasks, stats, addTask, toggleTask, editTask, deleteTask, clearCompleted };
}

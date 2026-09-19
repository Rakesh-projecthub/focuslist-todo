# FocusList — Feature Verification Matrix

FocusList is a frontend-only To-Do application. Every required feature is implemented in source code and covered by focused automated tests where practical.

| Requirement | Implementation | Verification |
|---|---|---|
| Task creation | `TaskForm.tsx` → `useTasks.addTask()` → `createTask()` | `TaskForm.test.tsx`, `App.test.tsx` |
| Complete / active | `TaskItem.tsx` → `useTasks.toggleTask()` | `TaskItem.test.tsx`, `App.test.tsx` |
| Edit task | `TaskItem.tsx` → `useTasks.editTask()` → `updateTask()` | `TaskItem.test.tsx`, `App.test.tsx` |
| Delete task | `TaskItem.tsx` → `useTasks.deleteTask()` | `TaskItem.test.tsx`, `App.test.tsx` |
| Priority | `Priority` type + task form + task item | `TaskForm.test.tsx`, `Filters.test.tsx` |
| Search by title | `filterTasks()` | `taskFilters.test.ts` |
| All / Active / Completed | `filterTasks()` | `taskFilters.test.ts`, `Filters.test.tsx` |
| Priority filter | `filterTasks()` | `taskFilters.test.ts`, `Filters.test.tsx` |
| Total / Completed / Pending | `getTaskStats()` + `Stats.tsx` | `taskStats.test.ts`, `Stats.test.tsx`, `App.test.tsx` |
| Persistence after refresh | `taskStorage.ts` + browser LocalStorage | `taskStorage.test.ts`, `App.test.tsx` |
| Input sanitization | `sanitizeTitle()` | `taskHelpers.test.ts` |
| Malformed storage handling | `isStoredTask()` + safe parsing | `taskStorage.test.ts` |
| Keyboard interaction | Native buttons, inputs, Enter/Escape editing | `TaskItem.tsx`, accessibility-focused labels |
| Responsive UI | Responsive CSS breakpoints | `styles.css` |
| Frontend-only architecture | React + Vite + LocalStorage; no backend | `package.json`, source tree |

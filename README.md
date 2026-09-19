# FocusList

A frontend-only, responsive To-Do application built with React, TypeScript and Vite.

## Problem Statement

Build a frontend-only To-Do application that supports task creation, task management, priority selection, search, status and priority filtering, live statistics, and persistence after refresh.

## Required Features

- Create tasks with High, Medium or Low priority
- Mark tasks completed / active
- Edit task title and priority
- Delete tasks
- Search by task title
- Filter by All / Active / Completed
- Filter by High / Medium / Low priority
- Live Total / Completed / Pending statistics
- Persist tasks in browser LocalStorage
- Responsive desktop and mobile interface
- Semantic HTML, accessible names, keyboard-friendly controls
- Input sanitization and malformed-storage validation

## Architecture

```text
App.tsx
  |
  +-- TaskForm.tsx -----------------> useTasks.addTask()
  |
  +-- Filters.tsx ------------------> filterTasks()
  |
  +-- TaskList.tsx --> TaskItem.tsx -> toggle / edit / delete
  |
  +-- Stats.tsx <-------------------- getTaskStats()
  |
  +-- useTasks.ts
        |
        +-- taskHelpers.ts
        +-- taskFilters.ts
        +-- taskStats.ts
        +-- taskStorage.ts ----------> LocalStorage
```

## Source structure

```text
src/
├── components/
│   ├── Filters.tsx
│   ├── Icon.tsx
│   ├── Stats.tsx
│   ├── TaskForm.tsx
│   ├── TaskItem.tsx
│   └── TaskList.tsx
├── hooks/
│   └── useTasks.ts
├── test/
│   ├── App.test.tsx
│   ├── Filters.test.tsx
│   ├── Stats.test.tsx
│   ├── TaskForm.test.tsx
│   ├── TaskItem.test.tsx
│   ├── taskFilters.test.ts
│   ├── taskHelpers.test.ts
│   ├── taskStats.test.ts
│   ├── taskStorage.test.ts
│   └── setup.ts
├── types/
│   └── task.ts
└── utils/
    ├── taskFilters.ts
    ├── taskHelpers.ts
    ├── taskStats.ts
    └── taskStorage.ts
```

## Quality and security

- TypeScript strict mode
- ESLint configuration
- Vitest + React Testing Library
- No backend, database or API keys
- Minimal production dependencies
- No `dangerouslySetInnerHTML`
- No `eval` or dynamic code execution
- Sanitized and length-limited task titles
- Validated LocalStorage records
- Semantic HTML and ARIA labels
- Visible keyboard focus states
- Reduced-motion support

See [`FEATURES.md`](./FEATURES.md), [`TESTING.md`](./TESTING.md) and [`SECURITY.md`](./SECURITY.md) for verification details.

## Run locally

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run test
npm run build
```

## Deployment

This is a static Vite application and can be deployed to Vercel.

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- No environment variables are required

## Persistence

Task data is stored locally in the browser using the key `focuslist.tasks.v1`. No task data is sent to a backend.

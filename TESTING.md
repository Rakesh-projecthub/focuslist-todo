# FocusList Testing and Quality Checks

## Local verification

Run:

```bash
npm install
npm run lint
npm run test
npm run build
```

All commands should complete successfully before deployment.

## Automated coverage areas

- Task creation and validation
- Priority assignment
- Task completion and reactivation
- Task editing
- Task deletion
- Search by title
- All / Active / Completed filtering
- High / Medium / Low priority filtering
- Total / Completed / Pending statistics
- LocalStorage persistence
- Malformed LocalStorage handling
- Input sanitization and title length limits
- Accessible names and keyboard-oriented controls

## Manual browser checks

1. Create a task with each priority.
2. Complete and reactivate a task.
3. Edit title and priority.
4. Delete a task.
5. Search using different letter cases.
6. Test All, Active and Completed filters.
7. Test each priority filter.
8. Refresh the browser and confirm tasks remain.
9. Resize the browser to mobile width.
10. Navigate controls with Tab and activate buttons with Enter/Space.
11. Confirm no task title is interpreted as HTML.

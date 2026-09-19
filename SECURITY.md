# Security Notes

FocusList is intentionally frontend-only and does not process authentication, payments, secrets, or server-side data.

## Input handling

- Task titles are trimmed and whitespace-normalized.
- Control characters are removed.
- Titles are capped at 160 characters.
- Empty titles are rejected.
- React renders task titles as text; the application does not inject user input as HTML.

## Browser storage

- Only task records are stored in LocalStorage.
- Stored records are validated before being returned to application state.
- Invalid JSON or malformed records are ignored safely.
- No credentials, API keys, or secrets are stored.

## Dependency and runtime choices

- React and React DOM are the only production dependencies.
- There is no backend, database, API client, `eval`, `Function` constructor, or `dangerouslySetInnerHTML`.

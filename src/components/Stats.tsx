interface StatsProps {
  total: number;
  completed: number;
  pending: number;
}

export function Stats({ total, completed, pending }: StatsProps) {
  return (
    <section className="stats-grid" aria-label="Task statistics" aria-live="polite">
      <article className="stat-card">
        <span className="stat-label">Total Tasks</span>
        <strong>{total}</strong>
        <span className="stat-caption">All tasks</span>
      </article>
      <article className="stat-card">
        <span className="stat-label">Completed</span>
        <strong>{completed}</strong>
        <span className="stat-caption">Finished tasks</span>
      </article>
      <article className="stat-card">
        <span className="stat-label">Pending</span>
        <strong>{pending}</strong>
        <span className="stat-caption">Still to do</span>
      </article>
    </section>
  );
}

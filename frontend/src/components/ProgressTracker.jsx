export default function ProgressTracker({ tasks }) {
  const total = tasks.length;
  const toDo = tasks.filter((t) => t.status === "todo").length;
  const inProgress = tasks.filter((t) => t.status === "in progress").length;
  const done = tasks.filter((t) => t.status === "done").length;

  return (
    <div className="progress-tracker">
      <h2>Progress</h2>
      <p>Total tasks: {total}</p>
      <p>To Do: {toDo}</p>
      <p>In Progress: {inProgress}</p>
      <p>Done: {done}</p>
    </div>
  );
}

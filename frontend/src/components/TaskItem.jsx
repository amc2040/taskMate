export default function TaskItem({ task, onToggleDone }) {
  const id = task._id;   // FIXED

  return (
    <li className={`task-item ${task.status}`}>
      <input
        type="checkbox"
        checked={task.status === "done"}
        onChange={() => onToggleDone(id)}
      />

      <div>
        <strong>{task.title}</strong>
        <span className="status">({task.status})</span>
      </div>
    </li>
  );
}

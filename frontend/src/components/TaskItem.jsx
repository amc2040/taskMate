export default function TaskItem({ task, onToggleDone, onDelete }) {
  const id = task._id;
  
  return (
    <li className={`task-item ${task.status}`}>
      <input
        type="checkbox"
        checked={task.status === "done"}
        onChange={() => onToggleDone(id)}
      />
      <div className="task-content">
        <strong>{task.title}</strong>
        <span className="status">({task.status})</span>
      </div>
      <button 
        className="delete-btn" 
        onClick={() => onDelete(id)}
        aria-label="Delete task"
      >
        Delete
      </button>
    </li>
  );
}

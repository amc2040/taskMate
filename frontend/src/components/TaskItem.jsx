export default function TaskItem({ task, onToggleDone, onDelete }) {
  const id = task._id;
  
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    // Use the existing onToggleDone function but pass the new status
    onToggleDone(id, newStatus);
  };
  
  return (
    <li className={`task-item ${task.status}`}>
      <div className="task-content">
        <strong>{task.title}</strong>
      </div>
      <select 
        className="status-dropdown" 
        value={task.status} 
        onChange={handleStatusChange}
      >
        <option value="todo">To Do</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
      </select>
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

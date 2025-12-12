import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggleDone, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="no-tasks">
        <p>No tasks to display. Add a task to get started!</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggleDone={onToggleDone}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

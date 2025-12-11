import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggleDone }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}        // FIXED
          task={task}
          onToggleDone={onToggleDone}
        />
      ))}
    </ul>
  );
}

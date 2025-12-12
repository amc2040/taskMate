export default function TaskFilter({ filter, setFilter }) {
  return (
    <div className="task-filter">
      <label>
        Show:
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="todo">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </label>
    </div>
  );
}

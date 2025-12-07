export default function TaskFilter({ filter, setFilter }){
  return(
    <div className="task-filter">
      <label>
        Show:
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all"></option>
            <option value="todo">todo</option>
            <option value="done">done</option>
        </select>
    </label>
  </div>
);
}

import {useState} from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";

export default function App(){
    const[tasks, setTasks] = useState([]);
    const[filter, setFilter] = useState("all")
    const handleAddTask = (task) => {
      setTasks((prev) => [...prev, task]);
    };
const handleToggleDone = (id) =>{
  setTasks((prev) =>
    prev.map((task) =>
      task.id === id
        ?{...task, status: task.status === "done" ? "todo" : "done"}
        : task
    )
  );
};
const filteredTasks = tasks.filter((task) =>{
  if(filter === "all") return true;
  return task.stauts === filter;
});
return(
  <div>
    <h1>taskMate</h1>
    <TaskForm onAddTask={handleAddTask}/>
    <TaskFilter filter={filter} setFilter={setFilter}/>
    <TaskList tasks={filteredTasks} onToggleDone={handleToggleDone}/>
  </div>
 );
}

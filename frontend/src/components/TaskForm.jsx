import{useState} from "react";
export default functin TaskForm({onAddTask}){
  const[title, setTitle] = useState("");
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(title.trim() === "") return;
    const newTask = {
      id:
      title: title.trim(),
      status: "todo",
    };

    onAddTask(newTask);
    setTitle("");
  };

  return(
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
    </form>
    );
}

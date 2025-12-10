import { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import ProgressTracker from "./components/ProgressTracker";
import "./App.css";

const API_URL = "http://localhost:5001/api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async (title) => {
    try {
      const response = await axios.post(API_URL, { title });
      setTasks((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleToggleDone = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);
      const newStatus = task.status === "done" ? "todo" : "done";
      const response = await axios.put(`${API_URL}/${id}`, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? response.data : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>taskMate</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskFilter filter={filter} setFilter={setFilter} />
      <TaskList tasks={filteredTasks} onToggleDone={handleToggleDone} onDelete={handleDelete} />
      <ProgressTracker tasks={tasks} />
    </div>
  );
}

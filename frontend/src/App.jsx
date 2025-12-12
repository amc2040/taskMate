import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import ProgressTracker from "./components/ProgressTracker";
import "./App.css";

const API_URL = "http://localhost:5001/api/tasks";

// Home Page Component
function HomePage() {
  return (
    <div className="home-page">
      <h2>Welcome to taskMate</h2>
      <p>Your personal task management solution built with the MERN stack.</p>
      <div className="features">
        <h3>Features:</h3>
        <ul>
          <li>Create and manage tasks</li>
          <li>Track task progress</li>
          <li>Filter tasks by status</li>
          <li>Mark tasks as complete</li>
          <li>Delete completed tasks</li>
        </ul>
      </div>
      <Link to="/tasks" className="cta-button">Go to Tasks</Link>
    </div>
  );
}

// Tasks Page Component
function TasksPage({ tasks, filter, setFilter, onAddTask, onToggleDone, onDelete }) {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div className="tasks-page">
      <h2>My Tasks</h2>
      <TaskForm onAddTask={onAddTask} />
      <TaskFilter filter={filter} setFilter={setFilter} />
      <TaskList 
        tasks={filteredTasks} 
        onToggleDone={onToggleDone} 
        onDelete={onDelete} 
      />
      <ProgressTracker tasks={tasks} />
    </div>
  );
}

// Main App Component
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_URL);
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (title) => {
    try {
      const response = await axios.post(API_URL, { title });
      setTasks((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  const handleToggleDone = async (id, newStatus) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? response.data : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="nav-logo">taskMate</h1>
            <ul className="nav-menu">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/tasks" 
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                  Tasks
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container">
          {loading && <div className="loading">Loading tasks...</div>}
          {error && <div className="error-message">{error}</div>}
          
          {!loading && (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route 
                path="/tasks" 
                element={
                  <TasksPage 
                    tasks={tasks}
                    filter={filter}
                    setFilter={setFilter}
                    onAddTask={handleAddTask}
                    onToggleDone={handleToggleDone}
                    onDelete={handleDelete}
                  />
                } 
              />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

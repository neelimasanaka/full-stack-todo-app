import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import "../App.css";

const API_URL = "http://localhost:5000/api/todos";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const getConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL, getConfig());
      setTodos(response.data);
    } catch (error) {
      toast.error("Failed to fetch todos");
    }
  };

  const addTodo = async (title, priority, dueDate) => {
    try {
      const response = await axios.post(
        API_URL,
        {
          title,
          completed: false,
          priority: priority.toLowerCase(),
          due_date: dueDate || null,
          created_at: new Date().toLocaleString(),
        },
        getConfig()
      );

      setTodos([response.data, ...todos]);
      toast.success("Todo added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, getConfig());
      setTodos(todos.filter((todo) => todo.id !== id));
      toast.success("Todo deleted successfully");
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };

  const deleteAllTodos = async () => {
    try {
      await axios.delete(API_URL, getConfig());
      setTodos([]);
      toast.success("All todos deleted successfully");
    } catch (error) {
      toast.error("Failed to delete todos");
    }
  };

  const toggleComplete = async (todo) => {
    try {
      const response = await axios.put(
        `${API_URL}/${todo.id}`,
        {
          title: todo.title,
          completed: !todo.completed,
          priority: todo.priority.toLowerCase(),
          due_date: todo.due_date ? todo.due_date.slice(0, 10) : null,
          created_at: todo.created_at,
        },
        getConfig()
      );

      setTodos(
        todos.map((item) => (item.id === todo.id ? response.data : item))
      );

      toast.success("Todo updated successfully");
    } catch (error) {
      toast.error("Failed to update todo");
    }
  };

  const editTodo = async (
    id,
    title,
    completed,
    priority,
    dueDate,
    createdAt
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        {
          title,
          completed,
          priority: priority.toLowerCase(),
          due_date: dueDate || null,
          created_at: createdAt,
        },
        getConfig()
      );

      setTodos(
        todos.map((todo) => (todo.id === id ? response.data : todo))
      );

      toast.success("Todo edited successfully");
    } catch (error) {
      toast.error("Failed to edit todo");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="app">
      <div className="todo-container">
        <div className="header">
          <div className="logo">☑</div>
          <h1>Todo Manager</h1>
          <p>Plan better, achieve more</p>
        </div>

        <TodoForm addTodo={addTodo} />

        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          editTodo={editTodo}
          deleteAllTodos={deleteAllTodos}
        />

        <div className="stats">
          <div className="stat-card purple">
            <span>Total Tasks</span>
            <strong>{totalTasks}</strong>
          </div>

          <div className="stat-card green">
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>

          <div className="stat-card orange">
            <span>Pending</span>
            <strong>{pendingTasks}</strong>
          </div>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default TodoApp;



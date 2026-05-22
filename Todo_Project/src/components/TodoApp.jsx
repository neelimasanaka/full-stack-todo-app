import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import "../App.css";

const API_URL = "http://localhost:5000/api/todos";

function TodoApp() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get(API_URL);
    setTodos(response.data);
  };

  const addTodo = async (title, priority, dueDate) => {
    const response = await axios.post(API_URL, {
      title: title,
      completed: false,
      priority: priority,
      due_date: dueDate || null,
      created_at: new Date().toLocaleString(),
    });

    setTodos([response.data, ...todos]);
  };

  const deleteTodo = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );

    if (!confirmDelete) return;

    await axios.delete(`${API_URL}/${id}`);

    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteAllTodos = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all todos?"
    );

    if (!confirmDelete) return;

    await axios.delete(API_URL);
    setTodos([]);
  };

  const toggleComplete = async (todo) => {
    const response = await axios.put(`${API_URL}/${todo.id}`, {
      title: todo.title,
      completed: !todo.completed,
      priority: todo.priority,
      due_date: todo.due_date ? todo.due_date.slice(0, 10) : null,
      created_at: todo.created_at,
    });

    setTodos(
      todos.map((item) => (item.id === todo.id ? response.data : item))
    );
  };

  const editTodo = async (
    id,
    title,
    completed,
    priority,
    dueDate,
    createdAt
  ) => {
    const response = await axios.put(`${API_URL}/${id}`, {
      title: title,
      completed: completed,
      priority: priority,
      due_date: dueDate || null,
      created_at: createdAt,
    });

    setTodos(
      todos.map((todo) => (todo.id === id ? response.data : todo))
    );
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
          <p>Plan better, achieve more 🚀</p>
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
      </div>
    </div>
  );
}

export default TodoApp;
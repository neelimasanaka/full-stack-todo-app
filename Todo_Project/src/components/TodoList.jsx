import React from "react";
import TodoItem from "./TodoItem";

function TodoList({
  todos,
  deleteTodo,
  toggleComplete,
  editTodo,
  deleteAllTodos,
}) {
  return (
    <div className="todo-list">
      <div className="list-header">
        <h2>Your Tasks</h2>

        {todos.length > 0 && (
          <button className="delete-all-btn" onClick={deleteAllTodos}>
            Delete All
          </button>
        )}
      </div>

      {todos.length === 0 ? (
        <p className="empty-text">No tasks yet. Add your first task ✨</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
            editTodo={editTodo}
          />
        ))
      )}
    </div>
  );
}

export default TodoList;
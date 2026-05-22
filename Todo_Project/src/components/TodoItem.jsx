import React, { useState } from "react";

function TodoItem({ todo, deleteTodo, toggleComplete, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editPriority, setEditPriority] = useState(todo.priority || "medium");
  const [editDueDate, setEditDueDate] = useState(
    todo.due_date ? todo.due_date.slice(0, 10) : ""
  );

  const handleSave = () => {
    if (editTitle.trim() === "") {
      alert("Task cannot be empty");
      return;
    }

    editTodo(
      todo.id,
      editTitle,
      todo.completed,
      editPriority,
      editDueDate,
      todo.created_at
    );

    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input
            className="edit-input"
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <select
            className="edit-select"
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <input
            className="edit-date"
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
          />

          <div className="actions">
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>

            <button
              className="cancel-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="todo-left">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo)}
            />

            <div>
              <h3>{todo.title}</h3>
              <p>Created: {todo.created_at}</p>
              <p>
                Due Date:{" "}
                {todo.due_date ? todo.due_date.slice(0, 10) : "No due date"}
              </p>
            </div>
          </div>

          <span className={`priority ${todo.priority}`}>
            {todo.priority}
          </span>

          <div className="actions">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>

            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem;
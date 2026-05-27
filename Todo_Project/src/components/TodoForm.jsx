// import React, { useState } from "react";

// function TodoForm({ addTodo }) {
//   const [title, setTitle] = useState("");
//   const [priority, setPriority] = useState("Medium");
//   const [dueDate, setDueDate] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log("Add button clicked");

//     if (!title.trim()) {
//       alert("Please enter a task");
//       return;
//     }

//     addTodo(title, priority, dueDate);

//     setTitle("");
//     setPriority("Medium");
//     setDueDate("");
//   };

//   return (
//     <form className="todo-form" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Enter your task..."
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <select value={priority} onChange={(e) => setPriority(e.target.value)}>
//         <option value="High">High</option>
//         <option value="Medium">Medium</option>
//         <option value="Low">Low</option>
//       </select>

//       <input
//         type="date"
//         value={dueDate}
//         onChange={(e) => setDueDate(e.target.value)}
//       />

//       <button type="submit">Add Task</button>
//     </form>
//   );
// }

// export default TodoForm;

import React, { useState } from "react";
import { toast } from "react-toastify";

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a task");
      return;
    }

    addTodo(title, priority, dueDate);

    setTitle("");
    setPriority("Medium");
    setDueDate("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TodoForm;
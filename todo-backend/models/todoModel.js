const pool = require("../config/db");

const getAllTodos = async () => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
  return result.rows;
};

const createTodo = async (
  title,
  completed = false,
  priority = "medium",
  created_at,
  due_date
) => {
  const result = await pool.query(
    `INSERT INTO todos (title, completed, priority, created_at, due_date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [title, completed, priority, created_at, due_date]
  );

  return result.rows[0];
};

const updateTodo = async (
  id,
  title,
  completed,
  priority,
  created_at,
  due_date
) => {
  const result = await pool.query(
    `UPDATE todos
     SET title = $1,
         completed = $2,
         priority = $3,
         created_at = $4,
         due_date = $5
     WHERE id = $6
     RETURNING *`,
    [title, completed, priority, created_at, due_date, id]
  );

  return result.rows[0];
};

const deleteTodo = async (id) => {
  await pool.query("DELETE FROM todos WHERE id = $1", [id]);
};

const deleteAllTodos = async () => {
  await pool.query("DELETE FROM todos");
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
};


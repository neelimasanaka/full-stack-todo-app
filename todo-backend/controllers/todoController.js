const todoModel = require("../models/todoModel");

const validPriorities = ["low", "medium", "high"];

const getTodos = async (req, res) => {
  try {
    const todos = await todoModel.getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
};

const addTodo = async (req, res) => {
  try {
    const { title, completed, priority, created_at, due_date } = req.body;
    const finalPriority = priority || "medium";

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!validPriorities.includes(finalPriority)) {
      return res.status(400).json({
        message: "Priority must be low, medium, or high",
      });
    }

    const todo = await todoModel.createTodo(
      title.trim(),
      completed ?? false,
      finalPriority,
      created_at,
      due_date || null
    );

    res.status(201).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating todo" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed, priority, created_at, due_date } = req.body;
    const finalPriority = priority || "medium";

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!validPriorities.includes(finalPriority)) {
      return res.status(400).json({
        message: "Priority must be low, medium, or high",
      });
    }

    const todo = await todoModel.updateTodo(
      id,
      title.trim(),
      completed,
      finalPriority,
      created_at,
      due_date || null
    );

    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating todo" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await todoModel.deleteTodo(id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
};

const deleteAllTodos = async (req, res) => {
  try {
    await todoModel.deleteAllTodos();
    res.status(200).json({ message: "All todos deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting all todos" });
  }
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
};

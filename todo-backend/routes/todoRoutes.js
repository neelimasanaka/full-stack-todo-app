const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
} = require("../controllers/todoController");

router.get("/", authMiddleware, getTodos);
router.post("/", authMiddleware, addTodo);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);
router.delete("/", authMiddleware, deleteAllTodos);

module.exports = router;
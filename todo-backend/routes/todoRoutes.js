// const express = require("express");
// const router = express.Router();

// const {
//   getTodos,
//   addTodo,
//   updateTodo,
//   deleteTodo,
//   deleteAllTodos,
// } = require("../controllers/todoController");

// router.get("/", getTodos);
// router.post("/", addTodo);
// router.put("/:id", updateTodo);
// router.delete("/:id", deleteTodo);
// router.delete("/", deleteAllTodos);

// module.exports = router;

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


// const express = require("express");
// const router = express.Router();

// const authMiddleware = require("../middleware/authMiddleware");

// const {
//   getTodos,
//   addTodo,
//   updateTodo,
//   deleteTodo,
//   deleteAllTodos,
// } = require("../controllers/todoController");

// router.get("/", authMiddleware, getTodos);

// router.post("/", authMiddleware, addTodo);

// router.put("/:id", authMiddleware, updateTodo);

// router.delete("/:id", authMiddleware, deleteTodo);

// router.delete("/", authMiddleware, deleteAllTodos);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
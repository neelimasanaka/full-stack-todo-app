require("dotenv").config();

const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");
const pool = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Todo API is running");
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Database connection error:", err.stack);
  } else {
    console.log("PostgreSQL connected successfully");
    release();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
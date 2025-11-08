import express from "express";
import cors from "cors";
import Task from "./Task.js";
import connectDB from "./config.js";
import generateId from "../src/utils/generateId.js";

const app = express();
app.use(express.json());
app.use(cors());

// Connect Database
connectDB();

// Fetch All Tasks
// app.get("/api/tasks", async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.status(200).json(tasks);
//   } catch (err) {
//     console.error("Error fetching tasks:", err.message);
//     res.status(500).json({ error: "Failed to fetch tasks" });
//   }
// });

// To get all or  Today Planned tasks(by mentioned the query)
app.get("/api/tasks", async (req, res) => {
  try {
    const { date, createdToday } = req.query;

    let filter = {};

    if (createdToday) {
      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59
      );
      filter.createdAt = { $gte: startOfDay, $lte: endOfDay };
    } else if (date) {
      // (for other filters you may add later)
      filter.date = date;
    }

    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Create Task
app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = { ...req.body };
    // console.log(newTask);
    const createdTask = await Task.create(newTask);
    res.status(201).json(createdTask);
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(500).json({ error: "Failed to create new Task" });
  }
});

// Update Task
app.put("/api/tasks/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const update = req.body;
  if (!update || Object.keys(update).length === 0) {
    return res.status(400).json({ error: "No fields provided to update" });
  }

  try {
    const updatedTask = await Task.findOneAndUpdate({ taskId }, update, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err.message);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete Task
app.delete("/api/tasks/:taskId", async (req, res) => {
  const { taskId } = req.params;
  try {
    const result = await Task.deleteOne({ taskId });
    console.log(result);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

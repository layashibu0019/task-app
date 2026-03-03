const express = require('express');
const router = express.Router();

// In-memory storage
let tasks = [];
let currentId = 1;

/**
 * GET /
 * Basic info
 */
router.get('/', (req, res) => {
  res.json({
    name: "Task Manager API",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development"
  });
});

/**
 * GET /health
 */
router.get('/health', (req, res) => {
  res.json({ status: "OK" });
});

/**
 * POST /tasks
 * Create a new task
 */
router.post('/tasks', (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: currentId++,
    title,
    completed: completed || false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

/**
 * GET /tasks
 * Get all tasks
 */
router.get('/tasks', (req, res) => {
  res.json(tasks);
});

/**
 * GET /tasks/:id
 * Get single task
 */
router.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

/**
 * PUT /tasks/:id
 * Update task
 */
router.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, completed } = req.body;

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

/**
 * DELETE /tasks/:id
 * Delete task
 */
router.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(taskIndex, 1);

  res.json({ message: "Task deleted successfully" });
});

module.exports = router;
/**
 * GET /stats
 * Get task statistics
 */
router.get('/stats', (req, res) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  res.json({
    total,
    completed,
    pending
  });
});

import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/roleMiddleware.js";

import {
  createTask,
  getTasks,
  updateTaskStatus,
  getOverdueTasks,
} from "../controllers/taskController.js";

const router = express.Router();

// Create task (Admin only)
router.post("/", protect, adminOnly, createTask);

// Get tasks
router.get("/", protect, getTasks);

// Update status
router.put("/:id", protect, updateTaskStatus);

// Overdue tasks
router.get("/overdue", protect, getOverdueTasks);

export default router;
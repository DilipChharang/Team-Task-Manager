import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/roleMiddleware.js";

import {
  createProject,
  getProjects,
  addMember,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

// Get all projects (logged in user)
router.get("/", protect, getProjects);

// Create project (Admin only)
router.post("/", protect, adminOnly, createProject);

// Add member (Admin only)
router.post("/add-member", protect, adminOnly, addMember);

// Delete project (Admin only)
router.delete("/:id", protect, adminOnly, deleteProject);

export default router;
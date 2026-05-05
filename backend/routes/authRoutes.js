import express from "express";
import { signup, login, getAllUsers } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// 🔥 ADD THIS
router.get("/users", protect, getAllUsers);

export default router;
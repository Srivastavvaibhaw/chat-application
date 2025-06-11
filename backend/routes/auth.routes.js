// backend/routes/auth.routes.js
import express from "express";
import { signup, login, logout, deleteAccount } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Add your existing routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Add the delete account route (protected)
router.delete("/delete-account", protectRoute, deleteAccount);

export default router;

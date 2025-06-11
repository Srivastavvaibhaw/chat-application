// backend/routes/connection.routes.js
import express from "express";
import { 
  getConnectionCode,
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  blockUser,
  unblockUser,
  getPendingRequests,
  getConnectionsStatus // Add this import
} from "../controllers/connection.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/code", protectRoute, getConnectionCode);
router.post("/request", protectRoute, sendConnectionRequest);
router.post("/accept", protectRoute, acceptConnectionRequest);
router.post("/reject", protectRoute, rejectConnectionRequest);
router.post("/block", protectRoute, blockUser);
router.post("/unblock", protectRoute, unblockUser);
router.get("/pending", protectRoute, getPendingRequests);
router.get("/status", protectRoute, getConnectionsStatus);

export default router;

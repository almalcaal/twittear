import express from "express";
import {
  getNotifications,
  deleteNotifications,
  deleteSingleNotification,
} from "../controllers/notification.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);
router.delete("/:notificationId", protectRoute, deleteSingleNotification);

export default router;

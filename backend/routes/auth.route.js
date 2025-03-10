import express from "express";
import {
  userSignUp,
  userLogin,
  userLogout,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", userSignUp);

router.post("/login", userLogin);

router.post("/logout", userLogout);

router.get("/checkAuth", protectRoute, checkAuth);

export default router;

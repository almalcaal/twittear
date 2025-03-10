import express from "express";
import {
  userSignUp,
  userLogin,
  userLogout,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/signup", userSignUp);

router.get("/login", userLogin);

router.get("/logout", userLogout);

export default router;

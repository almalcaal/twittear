import express from "express";
import {
  getAllPosts,
  getFollowingPosts,
  getLikedPosts,
  getUserPosts,
  createPost,
  likeUnlikePost,
  commentOnPost,
  deletePost,
} from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllPosts);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/users/:username", protectRoute, getUserPosts);
router.post("/create", protectRoute, createPost);
router.post("/likes/:id", protectRoute, likeUnlikePost);
router.post("/comments/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);

export default router;

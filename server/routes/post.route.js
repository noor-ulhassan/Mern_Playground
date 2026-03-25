import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  createPost,
  getAllPost,
  singlePost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

const postRouter = express.Router();

router.post("/create", isAuthenticated, createPost);
router.get("/all", getAllPost);
router.get("/:id", singlePost);
router.put("/:id", isAuthenticated, updatePost);
router.delete("/:id", isAuthenticated, deletePost);

export default postRouter;

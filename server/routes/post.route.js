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

postRouter.post("/create", isAuthenticated, createPost);
postRouter.get("/all", getAllPost);
postRouter.get("/:id", singlePost);
postRouter.put("/:id", isAuthenticated, updatePost);
postRouter.delete("/:id", isAuthenticated, deletePost);

export default postRouter;

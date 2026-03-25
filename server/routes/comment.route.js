import express from "express";
import {
  createComment,
  getPostComments,
  deleteComment,
} from "../controllers/comment.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const commentRouter = express.Router();

commentRouter.post("/:id", isAuthenticated, createComment);
commentRouter.get("/:id", getPostComments);
commentRouter.delete("/:id", isAuthenticated, deleteComment);

export default commentRouter;

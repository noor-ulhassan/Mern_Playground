import express from "express";
import {
  createComment,
  getPostComments,
  deleteComment,
} from "../controllers/comment.controller";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", isAuthenticated, createComment);
router.get("/:id", getPostComments);
router.delete("/:id", isAuthenticated, deleteComment);

export default router;

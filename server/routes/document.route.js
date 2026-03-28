import express from "express";
import multer from "multer";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { uploadDocument } from "../controllers/document.controller.js";

const documentRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

documentRouter.post(
  "/upload",
  isAuthenticated,
  upload.single("file"),
  uploadDocument,
);

export default documentRouter;

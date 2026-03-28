import { Document } from "../models/document.model.js";
import { Chunk } from "../models/chunkSchema.js";
import cloudinary from "../utils/cloudinary.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
import { GoogleGenAI } from "@google/genai";
import { error } from "console";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "raw",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      )
      .end(buffer);
  });
};

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No File Uploaded",
      });
    }
    const fileBuffer = req.file.buffer;
    const file = await uploadToCloudinary(fileBuffer);
    return res.status(200).json({
      message: "Ready To Build",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Upload Failed",
    });
  }
};

import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  embedding: {
    type: [Number],
    required: true,
  },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
  },
  chunkNumber: {
    type: Number,
    required: true,
  },
});

export const Chunk = mongoose.model("Chunk", chunkSchema);

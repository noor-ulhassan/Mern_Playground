import { Post } from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";

export const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { id } = req.params;
    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Comment Required",
      });
    }
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "No Such Post",
      });
    }
    const comment = await Comment.create({
      text,
      author: req.user._id,
      post: id,
    });
    return res.status(201).json({
      success: true,
      message: "Comment Created Successfully",
      comment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create comment",
    });
  }
};

// Get Comments

export const getPostComments = async (req, res) => {
  try {
    const { id } = req.params;
    const postComment = await Comment.find({ post: id }).populate(
      "author",
      "username",
    );
    return res.status(200).json({
      success: true,
      message: "Comment of this Post",
      postComment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
    });
  }
};

// DELETE COMMENT

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    await Comment.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete comment",
    });
  }
};

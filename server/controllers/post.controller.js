import { Post } from "../models/post.model.js";

// create post

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }
    const post = await Post.create({
      author: req.user._id,
      title,
      content,
    });
    return res.status(201).json({
      success: true,
      message: "Post created Successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
};

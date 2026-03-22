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

// GET All Posts

export const getAllPost = async (req, res) => {
  try {
    const allPosts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate("author", "username email");
    return res.status(200).json({
      success: true,
      message: "All Posts Fetched Successfully",
      allPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
};

// Get Single Post

export const singlePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("author", "username email");
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Post Fetched Successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch post",
    });
  }
};

// Update Post

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    post.title = title;
    post.content = content;
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update post",
    });
  }
};

// Delete Post

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    await Post.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete post",
    });
  }
};

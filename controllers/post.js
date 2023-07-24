const PostSchema = require("../models/post.js");

const getPosts = async (req, res) => {
  try {
    const getPosts = await PostSchema.find();
    res.status(200).json({
      getPosts,
    });
  } catch (error) {
    res.status(201).json({ msg: error.message });
  }
};

const createPosts = async (req, res) => {
  try {
    const newPost = await PostSchema.create(req.body);
    res.status(201).json({
      newPost,
    });
  } catch (error) {
    res.status(201).json({ msg: error.message });
  }
};
const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const detailPost = await PostSchema.findById(id);
    res.status(200).json({
      detailPost,
    });
  } catch (error) {
    res.status(201).json({ msg: error.message });
  }
};
const getUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await PostSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      updatePost,
    });
  } catch (error) {
    res.status(201).json({ msg: error.message });
  }
};
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await PostSchema.findByIdAndRemove(id);
    res.status(201).json({
      msg: "silme islemi basarili",
    });
  } catch (error) {
    res.status(201).json({ msg: error.message });
  }
};

const searchPost = async (req, res) => {
  const { search, tag } = req.query;
  try {
    const title = new RegExp(search, "i");
    const posts = await PostSchema.find({
      $or: [{ title }],
      tag: { $in: tag.split(",") },
    });
    res.status(201).json({ posts });
  } catch (error) {
    res.status(201).json({ msg: error.message });
  }
};

module.exports = {
  createPosts,
  getDetail,
  getPosts,
  getUpdate,
  deletePost,
  searchPost
};

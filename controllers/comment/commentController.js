const Comment = require("../../models/commentModel");
const User = require("../../models/userModel");
const Post = require("../../models/postModel");
const { Op } = require("sequelize");

exports.allComments = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;

  try {
    let sortBy = req.query.sortBy ? req.query.sortBy : "id";

    const { count, rows: data } = await Comment.findAndCountAll({
      order: [[sortBy, "DESC"]],
      limit: parseInt(limit, 10),
      offset: (page - 1) * limit,
    });
    res.json({
      data,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.commentsByPost = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;

  try {
    let sortBy = req.query.sortBy ? req.query.sortBy : "id";

    const { count, rows: data } = await Comment.findAndCountAll({
      where: { postId: req.params.postId },
      include: [
        {
          model: Post,
          attributes: {
            exclude: [
              "content",
              "title",
              "updatedAt",
              "image",
              "postsCategoryId, read_time",
            ],
          },
        },
        {
          model: User,
          attributes: {
            exclude: ["password", "role", "createdAt", "updatedAt"],
          },
        },
      ],
      order: [[sortBy, "DESC"]],
      limit: parseInt(limit, 10),
      offset: (page - 1) * limit,
    });
    res.json({
      data,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.create = async (req, res) => {
  try {
    const comment = new Comment({
      content: req.body.content,
      userId: req.body.userId,
      postId: req.params.postId,
    });
    await comment.save();
    res.json(comment);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

exports.update = async (req, res) => {
  try {
    const comment = await Comment.findOne({
      where: {
        [Op.and]: [{ id: req.params.id }, { userId: req.params.userId }],
      },
    });
    comment.content = req.body.content;
    await comment.save();
    res.json(comment);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.delete = async (req, res) => {
  try {
    await Comment.destroy({
      where: {
        [Op.and]: [{ id: req.params.id }, { userId: req.params.userId }],
      },
    });
    res.status(204).json();
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.deleteByAdmin = async (req, res) => {
  try {
    await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).json();
  } catch (e) {
    res.status(500).json(e.message);
  }
};

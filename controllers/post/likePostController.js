const LikePost = require("../../models/likePostModel");
const { Op } = require("sequelize");
const Post = require("../../models/postModel");
const User = require("../../models/userModel");
const PostCategory = require("../../models/postCategoryModel");

exports.allLikedPosts = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;

  try {
    let sortBy = req.query.sortBy ? req.query.sortBy : "id";

    const { count, rows: data } = await LikePost.findAndCountAll({
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

exports.likeByPostId = async (req, res) => {
  try {
    const data = await LikePost.findAll({
      where: {
        postId: req.params.postId,
      },
    });
    res.json({ data });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.createLike = async (req, res) => {
  try {
    const getLike = await LikePost.findOne({
      where: {
        [Op.and]: [
          { userId: req.params.userId },
          { postId: req.params.postId },
        ],
      },
    });
    if (getLike) {
      res.status(400).json({ message: "vous aimez déjà ce post" });
    }

    if (!getLike) {
      const like = new LikePost({
        postId: req.params.postId,
        userId: req.params.userId,
      });
      await like.save();
      res.json(like);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.postLikedByUser = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    let sortBy = req.query.sortBy ? req.query.sortBy : "id";

    const { count, rows: data } = await LikePost.findAndCountAll({
      where: {
        userId: req.params.userId,
      },
      include: [
        {
          model: Post,
          include: [
            {
              model: User,
            },
            {
              model: PostCategory,
            },
          ],
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

exports.deleteLike = async (req, res) => {
  try {
    const like = await LikePost.findOne({
      where: {
        [Op.and]: [
          { userId: req.params.userId },
          { postId: req.params.postId },
        ],
      },
    });

    if (like) {
      await like.destroy();
      res.status(204).json();
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

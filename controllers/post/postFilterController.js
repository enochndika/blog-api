const { Op } = require("sequelize");
const User = require("../../models/userModel");
const Post = require("../../models/postModel");
const PostCategory = require("../../models/postCategoryModel");
const LikePost = require("../../models/likePostModel");
const Comment = require("../../models/commentModel");

exports.postsByCategory = async (req, res) => {
  try {
    const data = await Post.findAll({
      where: {
        postsCategoryId: req.params.postsCategoryId,
      },
      limit: 4,
      order: [["id", "DESC"]],
      attributes: {
        exclude: ["postsCategoryId"],
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "role", "username", "createdAt", "updatedAt"],
          },
        },
        {
          model: PostCategory,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.json(data);
  } catch (e) {
    res.status(500).json(e);
  }
};

exports.trendPosts = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;

  try {
    let sortBy = req.query.sortBy ? req.query.sortBy : "id";

    const { count, rows: data } = await Post.findAndCountAll({
      where: { promoted: true },
      include: [
        {
          model: PostCategory,
        },
        {
          model: Comment,
        },
        {
          model: User,
          attributes: {
            exclude: ["password", "role", "username", "createdAt", "updatedAt"],
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

exports.postsRelated = async (req, res) => {
  const { page = 1, limit = 4 } = req.query;

  try {
    let sortBy = req.query.sortBy ? req.query.sortBy : "id";
    const post = await Post.findByPk(req.params.postId);
    const data = await Post.findAll({
      where: { postsCategoryId: post.postsCategoryId },
      include: [
        {
          model: PostCategory,
        },
        {
          model: Comment,
        },
        {
          model: User,
          attributes: {
            exclude: ["password", "role", "username", "createdAt", "updatedAt"],
          },
        },
      ],
      order: [[sortBy, "DESC"]],
      limit: parseInt(limit, 10),
    });
    res.json({
      data,
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.postsVip = async (req, res) => {
  try {
    const data = await Post.findAll({
      where: {
        vip: true,
      },
      limit: 3,
      order: [["id", "DESC"]],
      attributes: {
        exclude: ["BlogCategoryId"],
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "role", "username", "createdAt", "updatedAt"],
          },
        },
        {
          model: PostCategory,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.json(data);
  } catch (e) {
    res.status(500).json(e);
  }
};

exports.search = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    let sortBy = req.query.sortBy ? req.query.sortBy : "id";

    const { count, rows: data } = await Post.findAndCountAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: "%" + req.query.title + "%",
            },

            /*  title: sequelize.where(
              sequelize.fn("LOWER", sequelize.col("title")),
              "LIKE",
              "%" + req.body.title.toLowerCase() + "%"
            ),*/
          },
        ],
      },

      include: [
        {
          model: PostCategory,
        },
        {
          model: User,
          attributes: {
            exclude: ["password", "role", "username", "createdAt", "updatedAt"],
          },
        },
        {
          model: LikePost,
        },
      ],
      order: [[sortBy, "DESC"]],
      limit: parseInt(limit, 10),
      offset: (page - 1) * limit,
    });
    res.json({
      data: data,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.postsByUserId = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    let sortBy = req.query.sortBy ? req.query.sortBy : "id";

    const { count, rows: data } = await Post.findAndCountAll({
      where: {
        userId: req.params.userId,
      },
      include: [
        {
          model: PostCategory,
        },
        {
          model: User,
          attributes: {
            exclude: ["password", "role", "username", "createdAt", "updatedAt"],
          },
        },
        {
          model: LikePost,
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

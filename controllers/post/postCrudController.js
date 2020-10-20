const User = require("../../models/userModel");
const Blog = require("../../models/postModel");
const BlogCategory = require("../../models/postCategoryModel");
const LikePost = require("../../models/likePostModel");
const Comment = require("../../models/commentModel");
const _ = require("underscore");
const slugify = require("slugify");

exports.postById = async (req, res, next, id) => {
  try {
    req.post = await Blog.findOne({ where: { id } });
    next();
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.read = async (req, res) => {
  try {
    const post = await Blog.findOne({
      where: { slug: req.params.slug },
      attributes: {
        exclude: ["postsCategoryId"],
      },
      include: [
        {
          model: BlogCategory,
        },
        {
          model: Comment,
        },
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: LikePost,
        },
      ],
    });
    if (post === null) {
      res.status(404).json("No post found");
    }
    res.json(post);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.create = async (req, res, next) => {
  try {
    let body = req.body;
    let bodySave = _.extend(body, {
      slug: slugify(req.body.title).toLowerCase(),
      userId: req.params.userId,
    });
    const post = new Blog(bodySave);
    await post.save();
    res.json(post);
  } catch (e) {
    res.status(500).json(e);
    return next(e);
  }
};

exports.update = async (req, res) => {
  let post = req.post;
  let { body } = req;
  try {
    post.title = body.title;
    post.description = body.description;
    post.content = body.content;
    post.image = body.image;
    post.slug = slugify(body.title).toLowerCase();
    post.promoted = body.promoted;
    post.vip = body.vip;
    post.read_time = body.read_time;
    post.userId = req.params.userId;

    await post.save();
    res.json(post);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.list = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    let sortBy = req.query.sortBy ? req.query.sortBy : "id";

    const { count, rows: data } = await Blog.findAndCountAll({
      include: [
        {
          model: BlogCategory,
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
      currentPage: page,
      count: count,
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.delete = async (req, res) => {
  let post = req.post;
  try {
    const user = await User.findByPk(req.params.userId);
    if (user.id === post.userId) {
      await post.destroy();
      res.status(204).json();
    } else {
      res.status(400).json({ message: "You are not the owner" });
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.deleteByAdmin = async (req, res) => {
  let post = req.post;
  try {
    await post.destroy();
    res.status(204).json();
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const PostCategory = require("../../models/postCategoryModel");
const Post = require("../../models/postModel");

exports.create = async (req, res) => {
  try {
    const category = new PostCategory(req.body);
    await category.save();
    res.json(category);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.update = async (req, res) => {
  try {
    const category = await PostCategory.findByPk(req.params.id);
    category.name = req.body.name;
    await category.save();
  } catch (e) {
    res.status(500).json(e.message);
  }
};
exports.list = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    let sortBy = req.query.sortBy ? req.query.sortBy : "id";

    const { count, rows: data } = await PostCategory.findAndCountAll({
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

exports.delete = async (req, res) => {
  try {
    const category = await PostCategory.findByPk(req.params.id);
    const post = await Post.findAll({
      where: {
        postsCategoryId: category.id,
      },
    });

    if (post.length <= 0) {
      await category.destroy();
    }
    if (post.length > 0) {
      res.status(400).json({
        message:
          "Vous ne pouvez pas supprimer cette catégorie car elle possède des posts",
      });
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
};

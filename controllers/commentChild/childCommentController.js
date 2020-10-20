const ChildComment = require("../../models/childCommentModel");
const User = require("../../models/userModel");
const { Op } = require("sequelize");

exports.allChildComments = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;

  try {
    let sortBy = req.query.sortBy ? req.query.sortBy : "id";

    const { count, rows: data } = await ChildComment.findAndCountAll({
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

exports.childCommentsByCommentId = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;

  try {
    let sortBy = req.query.sortBy ? req.query.sortBy : "id";

    const { count, rows: data } = await ChildComment.findAndCountAll({
      where: { commentId: req.params.commentId },
      include: [
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

exports.update = async (req, res) => {
  try {
    const childComment = await ChildComment.findByPk(req.params.id);
    childComment.content = req.body.content;
    await childComment.save();
    res.json(childComment);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.create = async (req, res) => {
  try {
    const childComment = new ChildComment({
      content: req.body.content,
      userId: req.body.userId,
      commentId: req.params.commentId,
    });
    await childComment.save();
    res.json(childComment);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

exports.delete = async (req, res) => {
  try {
    await ChildComment.destroy({
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
    await ChildComment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).json();
  } catch (e) {
    res.status(500).json(e.message);
  }
};

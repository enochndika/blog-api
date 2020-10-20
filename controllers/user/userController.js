const User = require("../../models/userModel");

exports.read = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
      attributes: {
        exclude: ["password"],
      },
    });
    res.json(user);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.update = async (req, res) => {
  const { fullName } = req.body;
  try {
    const user = await User.findByPk(req.params.id);
    user.fullName = fullName;
    await user.save();

    res.json(user);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.list = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    let sortBy = req.query.sortBy ? req.query.sortBy : "id";

    const { count, rows: data } = await User.findAndCountAll({
      attributes: {
        exclude: ["password"],
      },
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
    await User.destroy({ where: { id: req.params.id } });
    res.status(204).json();
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.deleteByAdmin = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(204).json();
  } catch (e) {
    res.status(500).json(e.message);
  }
};

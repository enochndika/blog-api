const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Post = require("./postModel");
const Comment = require("./commentModel");
const ChildComment = require("./childCommentModel");
const ReportPost = require("./reportPostModel");
const ReportComment = require("./reportComment");
const ReportChildComment = require("./reportChildComment");
const LikePost = require("./likePostModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = sequelize.define("users", {
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  fullName: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM("author", "king"),
    defaultValue: "author",
  },
  avatar: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  karma: {
    type: DataTypes.ENUM("0", "1", "2", "3", "4"),
    defaultValue: "0",
  },
  last_logged: {
    type: DataTypes.DATE(),
    defaultValue: Date.now(),
  },
});

//hooks
User.beforeSave(async function (user) {
  if (!user.changed("password")) return;
  const salt = await bcrypt.genSalt(10); //whatever number you want
  user.password = await bcrypt.hash(user.password, salt);
});

// methods
User.prototype.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

User.prototype.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    username: this.username,
    role: this.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};

User.hasMany(Post, {
  onDelete: "CASCADE",
  as: "author",
});

Post.belongsTo(User, {
  constraints: false,
});

User.hasMany(Comment, {
  onDelete: "CASCADE",
});
Comment.belongsTo(User, {
  constraints: false,
});

User.hasMany(ChildComment, {
  onDelete: "CASCADE",
});
ChildComment.belongsTo(User, {
  constraints: false,
});

User.hasMany(LikePost, {
  onDelete: "CASCADE",
});

LikePost.belongsTo(User, {
  constraints: false,
});

User.hasMany(ReportComment, {
  onDelete: "CASCADE",
});

ReportComment.belongsTo(User, {
  constraints: false,
});

User.hasMany(ReportChildComment, {
  onDelete: "CASCADE",
});
ReportChildComment.belongsTo(User, {
  constraints: false,
});

User.hasMany(ReportPost, {
  onDelete: "CASCADE",
});

ReportPost.belongsTo(User, {
  constraints: false,
});
module.exports = User;

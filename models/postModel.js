const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Comment = require("./commentModel");
const LikePost = require("./likePostModel");
const ReportPost = require("./reportPostModel");

const Post = sequelize.define("posts", {
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.JSONB,
  },
  description: {
    type: DataTypes.TEXT,
  },
  slug: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  promoted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  vip: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  read_time: {
    type: DataTypes.INTEGER,
  },
  local: {
    type: DataTypes.TEXT,
  },
});

(async () => {
  try {
    await sequelize.sync();
  } catch (e) {
    console.log(e);
  }
})();

Post.hasMany(Comment, {
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  constraints: false,
});

Post.hasMany(LikePost, {
  onDelete: "CASCADE",
});
LikePost.belongsTo(Post, {
  constraints: false,
});

Post.hasMany(ReportPost, {
  onDelete: "CASCADE",
});

ReportPost.belongsTo(Post, {
  constraints: false,
});

module.exports = Post;

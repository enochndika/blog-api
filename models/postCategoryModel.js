const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Post = require("./postModel");

const PostCategory = sequelize.define("posts_category", {
  name: {
    type: DataTypes.STRING,
  },
});

(async () => {
  try {
    await sequelize.sync();
  } catch (e) {
    console.log(e);
  }
})();

PostCategory.hasMany(Post, {
  constraints: false,
});

Post.belongsTo(PostCategory);

module.exports = PostCategory;

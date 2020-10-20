const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

const LikePost = sequelize.define("like_posts", {
  like: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

(async () => {
  try {
    await sequelize.sync();
  } catch (e) {
    console.log(e);
  }
})();

module.exports = LikePost;

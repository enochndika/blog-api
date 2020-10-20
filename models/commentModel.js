const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const ChildComment = require("./childCommentModel");
const ReportComment = require("./reportComment");

const Comment = sequelize.define("comments", {
  content: {
    type: DataTypes.TEXT,
  },
  like: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

(async () => {
  try {
    await sequelize.sync();
  } catch (e) {
    console.log(e);
  }
})();

Comment.hasMany(ChildComment, {
  onDelete: "CASCADE",
});

ChildComment.belongsTo(Comment, {
  constraints: false,
});

Comment.hasMany(ReportComment, {
  onDelete: "CASCADE",
});

ReportComment.belongsTo(Comment, {
  constraints: false,
});

module.exports = Comment;

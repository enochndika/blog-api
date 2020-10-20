const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const ReportChildComment = require("./reportChildComment");

const ChildComment = sequelize.define("child_comments", {
  content: {
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

ChildComment.hasMany(ReportChildComment, {
  onDelete: "CASCADE",
});

ReportChildComment.belongsTo(ChildComment, {
  onDelete: "CASCADE",
});

module.exports = ChildComment;

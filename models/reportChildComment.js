const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

const ReportChildComment = sequelize.define("reports_child_comments", {
  subject: {
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

module.exports = ReportChildComment;

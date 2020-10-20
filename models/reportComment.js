const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

const ReportComment = sequelize.define("reports_comments", {
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

module.exports = ReportComment;

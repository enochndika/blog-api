const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

const ReportPostModel = sequelize.define("reports_posts", {
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

module.exports = ReportPostModel;

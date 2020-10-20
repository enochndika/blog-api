const ReportComment = require("../../models/reportComment");

exports.allReports = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;

  try {
    let sortBy = req.query.sortBy ? req.query.sortBy : "id";

    const { count, rows: data } = await ReportComment.findAndCountAll({
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

exports.report = async (req, res) => {
  try {
    const report = new ReportComment({
      commentId: req.params.commentId,
      userId: req.params.userId,
      subject: req.body.subject,
    });
    await report.save();
    res.json(report);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

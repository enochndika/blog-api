import { Response, Request } from 'express';
import ReportComment from '@/models/reportComment';

/* get all reports */
export const list = async (req: Request, res: Response) => {
  const { page = 1, limit = 6 }: { page?: any; limit?: any } = req.query;

  try {
    const sortBy = req.query.sortBy ? req.query.sortBy : 'id';

    const { count, rows: data } = await ReportComment.findAndCountAll({
      order: [[sortBy.toString(), 'DESC']],
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

/* create a new report*/
export const create = async (req: Request, res: Response) => {
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

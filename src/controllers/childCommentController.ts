import { Response, Request } from 'express';
import { Op } from 'sequelize';

import ChildComment from '@/models/childCommentModel';
import User from '@/models/userModel';

async function list(req: Request, res: Response) {
  const { page = 1, limit = 6 }: { page?: any; limit?: any } = req.query;

  try {
    const sortBy = req.query.sortBy ? req.query.sortBy : 'id';

    const { count, rows: data } = await ChildComment.findAndCountAll({
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
}

/* get all child comments by commentId*/
async function read(req: Request, res: Response) {
  const { page = 1, limit = 6 }: { page?: any; limit?: any } = req.query;

  try {
    const sortBy = req.query.sortBy ? req.query.sortBy : 'id';

    const { count, rows: data } = await ChildComment.findAndCountAll({
      where: {
        [Op.and]: [{ commentId: req.params.commentId }],
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'role', 'createdAt', 'updatedAt'],
          },
        },
      ],
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
}

async function update(req: Request, res: Response) {
  try {
    const childComment: any = await ChildComment.findByPk(req.params.id);
    childComment.content = req.body.content;
    await childComment.save();
    res.json(childComment);
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function create(req: Request, res: Response) {
  try {
    const childComment = new ChildComment({
      content: req.body.content,
      userId: req.body.userId,
      commentId: req.params.commentId,
    });
    await childComment.save();
    res.json(childComment);
  } catch (e) {
    res.status(400).json(e.message);
  }
}

async function remove(req: Request, res: Response) {
  try {
    await ChildComment.destroy({
      where: {
        [Op.and]: [{ id: req.params.id }, { userId: req.params.userId }],
      },
    });
    res.status(204).json();
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function removeByAdmin(req: Request, res: Response) {
  try {
    await ChildComment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).json();
  } catch (e) {
    res.status(500).json(e.message);
  }
}

export { removeByAdmin, list, update, create, remove, read };

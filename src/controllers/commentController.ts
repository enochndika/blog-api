import { Op } from 'sequelize';
import { Response, Request } from 'express';

import User from '@/models/userModel';
import Post from '@/models/postModel';
import Comment from '@/models/commentModel';

/* get all comments */
async function list(req: Request, res: Response) {
  const { page = 1, limit = 6 }: { page?: any; limit?: any } = req.query;

  try {
    const sortBy = req.query.sortBy ? req.query.sortBy : 'id';

    const { count, rows: data } = await Comment.findAndCountAll({
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

async function commentsByPost(req: Request, res: Response) {
  const { page = 1, limit = 6 }: { page?: any; limit?: any } = req.query;

  try {
    const sortBy = req.query.sortBy ? req.query.sortBy : 'id';

    const { count, rows: data } = await Comment.findAndCountAll({
      where: {
        [Op.and]: [{ postId: req.params.postId }],
      },
      include: [
        {
          model: Post,
          attributes: {
            exclude: [
              'content',
              'title',
              'updatedAt',
              'image',
              'postsCategoryId, read_time',
            ],
          },
        },
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

async function create(req: Request, res: Response) {
  try {
    const comment = new Comment({
      content: req.body.content,
      userId: req.body.userId,
      postId: req.params.postId,
    });
    await comment.save();
    res.json(comment);
  } catch (e) {
    res.status(400).json(e.message);
  }
}

async function update(req: Request, res: Response) {
  try {
    const comment: any = await Comment.findOne({
      where: {
        [Op.and]: [{ id: req.params.id }, { userId: req.params.userId }],
      },
    });
    comment.content = req.body.content;
    await comment.save();
    res.json(comment);
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function remove(req: Request, res: Response) {
  try {
    await Comment.destroy({
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
    await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).json();
  } catch (e) {
    res.status(500).json(e.message);
  }
}

export { remove, create, update, list, removeByAdmin, commentsByPost };

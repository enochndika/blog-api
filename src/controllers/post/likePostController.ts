import { Response, Request } from 'express';
import LikePost from '@/models/likePostModel';
import { Op } from 'sequelize';
import Post from '@/models/postModel';
import User from '@/models/userModel';
import PostCategory from '@/models/postCategoryModel';

/* get all likes */
export const list = async (req: Request, res: Response) => {
  const { page = 1, limit = 6 }: { page?: any; limit?: any } = req.query;

  try {
    const sortBy = req.query.sortBy ? req.query.sortBy : 'id';

    const { count, rows: data } = await LikePost.findAndCountAll({
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

/* get all likes by post id */
export const read = async (req: Request, res: Response) => {
  try {
    const data = await LikePost.findAll({
      where: {
        [Op.and]: [{ postId: req.params.postId }],
      },
    });
    res.json({ data });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const getLike = await LikePost.findOne({
      where: {
        [Op.and]: [
          { userId: req.params.userId },
          { postId: req.params.postId },
        ],
      },
    });
    if (getLike) {
      res.status(400).json({ message: 'vous aimez déjà ce post' });
    }

    if (!getLike) {
      const like = new LikePost({
        postId: req.params.postId,
        userId: req.params.userId,
      });
      await like.save();
      res.json(like);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

/* get all posts liked by a user*/
export const likesByUser = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 }: { page?: any; limit?: any } = req.query;
  try {
    const sortBy = req.query.sortBy ? req.query.sortBy : 'id';

    const { count, rows: data } = await LikePost.findAndCountAll({
      where: {
        [Op.and]: [{ userId: req.params.userId }],
      },
      include: [
        {
          model: Post,
          include: [
            {
              model: User,
            },
            {
              model: PostCategory,
            },
          ],
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
};

export const remove = async (req: Request, res: Response) => {
  try {
    const like = await LikePost.findOne({
      where: {
        [Op.and]: [
          { userId: req.params.userId },
          { postId: req.params.postId },
        ],
      },
    });

    if (like) {
      await like.destroy();
      res.status(204).json();
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

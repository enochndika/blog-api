import _ from 'underscore';
import slugify from 'slugify';
import { Op } from 'sequelize';
import { Request, Response } from 'express';

import User from '@/models/userModel';
import Post from '@/models/postModel';
import Comment from '@/models/commentModel';
import LikePost from '@/models/likePostModel';
import PostCategory from '@/models/postCategoryModel';

/* CRUD*/

async function read(req: Request, res: Response) {
  try {
    const post = await Post.findOne({
      where: { slug: req.params.slug },
      include: [
        {
          model: PostCategory,
        },
        {
          model: Comment,
        },
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: LikePost,
        },
      ],
    });
    if (post === null) {
      res.status(404).json('No post found');
    }
    res.json(post);
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function create(req: Request, res: Response) {
  try {
    const body = req.body;
    const bodySave = _.extend(body, {
      slug: slugify(req.body.title).toLowerCase(),
      userId: req.params.userId,
    });
    const post = new Post(bodySave);
    await post.save();
    res.json(post);
  } catch (e) {
    res.status(500).json(e);
  }
}

async function update(req: Request, res: Response) {
  const post: any = await Post.findByPk(req.params.postId);
  const { body } = req;
  try {
    post.title = body.title;
    post.description = body.description;
    post.content = body.content;
    post.image = body.image;
    post.postsCategoryId = body.postsCategoryId;
    post.slug = slugify(body.title).toLowerCase();
    post.promoted = body.promoted;
    post.vip = body.vip;
    post.read_time = body.read_time;
    post.userId = req.params.userId;

    await post.save();
    res.json(post);
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function list(req: Request, res: Response) {
  const { page = 1, limit = 10 }: { page?: number; limit?: number } = req.query;
  try {
    const sortBy = req.query.sortBy ? req.query.sortBy : 'id';

    const { count, rows: data } = await Post.findAndCountAll({
      include: [
        {
          model: PostCategory,
        },
        {
          model: Comment,
        },
        {
          model: User,
          attributes: {
            exclude: ['password', 'role', 'username', 'createdAt', 'updatedAt'],
          },
        },
        {
          model: LikePost,
        },
      ],
      order: [[sortBy.toString(), 'DESC']],
      limit: parseInt(String(limit), 10),
      offset: (page - 1) * limit,
    });
    res.json({
      data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      count: count,
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function remove(req: Request, res: Response) {
  const post: any = await Post.findByPk(req.params.postId);
  try {
    const user: any = await User.findByPk(req.params.userId);
    if (user.id === post.userId) {
      await post.destroy();
      res.status(204).json();
    } else {
      res.status(400).json({ message: 'You are not the owner' });
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function removeByAdmin(req: Request, res: Response) {
  try {
    await Post.destroy({ where: { id: req.params.postId } });
    res.status(204).json();
  } catch (e) {
    res.status(500).json(e.message);
  }
}

/* FILTERS */

async function postsByCategory(req: Request, res: Response) {
  try {
    const data = await Post.findAll({
      where: {
        [Op.and]: [{ postsCategoryId: req.params.postsCategoryId }],
      },
      limit: 4,
      order: [['id', 'DESC']],
      attributes: {
        exclude: ['postsCategoryId'],
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'role', 'username', 'createdAt', 'updatedAt'],
          },
        },
        {
          model: PostCategory,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    });

    res.json(data);
  } catch (e) {
    res.status(500).json(e);
  }
}

async function trendPosts(req: Request, res: Response) {
  const { page = 1, limit = 8 }: { page?: number; limit?: number } = req.query;

  try {
    const sortBy = req.query.sortBy ? req.query.sortBy : 'id';

    const { count, rows: data } = await Post.findAndCountAll({
      where: { promoted: true },
      include: [
        {
          model: PostCategory,
        },
        {
          model: Comment,
        },
        {
          model: User,
          attributes: {
            exclude: ['password', 'role', 'username', 'createdAt', 'updatedAt'],
          },
        },
      ],
      order: [[sortBy.toString(), 'DESC']],
      limit: parseInt(String(limit), 10),
      offset: (page - 1) * limit,
    });
    res.json({
      data,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(String(page), 10),
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function postsRelated(req: Request, res: Response) {
  const { page = 1, limit = 4 }: { page?: number; limit?: number } = req.query;

  try {
    const sortBy = req.query.sortBy ? req.query.sortBy : 'id';
    const post: any = await Post.findByPk(req.params.postId);
    const data = await Post.findAll({
      where: {
        [Op.and]: [{ postsCategoryId: post.postsCategoryId }],
      },
      include: [
        {
          model: PostCategory,
        },
        {
          model: Comment,
        },
        {
          model: User,
          attributes: {
            exclude: ['password', 'role', 'username', 'createdAt', 'updatedAt'],
          },
        },
      ],
      order: [[sortBy.toString(), 'DESC']],
      limit: parseInt(String(limit), 10),
    });
    res.json({
      data,
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function postsVip(req: Request, res: Response) {
  try {
    const data = await Post.findAll({
      where: {
        vip: true,
      },
      limit: 3,
      order: [['id', 'DESC']],
      attributes: {
        exclude: ['BlogCategoryId'],
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'role', 'username', 'createdAt', 'updatedAt'],
          },
        },
        {
          model: PostCategory,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    });

    res.json(data);
  } catch (e) {
    res.status(500).json(e);
  }
}

async function search(req: Request, res: Response) {
  const { page = 1, limit = 8 }: { page?: number; limit?: number } = req.query;

  try {
    const sortBy = req.query.sortBy ? req.query.sortBy : 'id';

    const { count, rows: data } = await Post.findAndCountAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: '%' + req.query.title + '%',
            },

            /*  title: sequelize.where(
              sequelize.fn("LOWER", sequelize.col("title")),
              "LIKE",
              "%" + req.body.title.toLowerCase() + "%"
            ),*/
          },
        ],
      },

      include: [
        {
          model: PostCategory,
        },
        {
          model: User,
          attributes: {
            exclude: ['password', 'role', 'username', 'createdAt', 'updatedAt'],
          },
        },
        {
          model: LikePost,
        },
      ],
      order: [[sortBy.toString(), 'DESC']],
      limit: parseInt(String(limit), 10),
      offset: (page - 1) * limit,
    });
    res.json({
      data: data,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(String(page), 10),
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function postsByUserId(req: Request, res: Response) {
  const { page = 1, limit = 10 }: { page?: number; limit?: number } = req.query;

  try {
    const sortBy = req.query.sortBy ? req.query.sortBy : 'id';

    const { count, rows: data } = await Post.findAndCountAll({
      where: {
        [Op.and]: [{ userId: req.params.userId }],
      },
      include: [
        {
          model: PostCategory,
        },
        {
          model: User,
          attributes: {
            exclude: ['password', 'role', 'username', 'createdAt', 'updatedAt'],
          },
        },
        {
          model: LikePost,
        },
      ],
      order: [[sortBy.toString(), 'DESC']],
      limit: parseInt(String(limit), 10),
      offset: (page - 1) * limit,
    });
    res.json({
      data,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(String(page), 10),
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
}

export {
  remove,
  list,
  removeByAdmin,
  create,
  read,
  update,
  postsByUserId,
  postsRelated,
  postsByCategory,
  postsVip,
  search,
  trendPosts,
};

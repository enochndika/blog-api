import { Op } from 'sequelize';
import { Response, Request } from 'express';

import PostCategory from '@/models/postCategoryModel';
import Post from '@/models/postModel';

async function create(req: Request, res: Response) {
  try {
    const category = new PostCategory(req.body);
    await category.save();
    res.json(category);
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function update(req: Request, res: Response) {
  try {
    const category: any = await PostCategory.findByPk(req.params.id);
    category.name = req.body.name;
    await category.save();
  } catch (e) {
    res.status(500).json(e.message);
  }
}

async function list(req: Request, res: Response) {
  const { page = 1, limit = 10 }: { page?: any; limit?: any } = req.query;
  try {
    const sortBy = req.query.sortBy ? req.query.sortBy : 'id';

    const { count, rows: data } = await PostCategory.findAndCountAll({
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

async function remove(req: Request, res: Response) {
  try {
    const category: any = await PostCategory.findByPk(req.params.id);
    const post = await Post.findAll({
      where: {
        [Op.and]: [{ postsCategoryId: category.id }],
      },
    });

    if (post.length <= 0) {
      await category.destroy();
    }
    if (post.length > 0) {
      res.status(400).json({
        message:
          'Vous ne pouvez pas supprimer cette catégorie car elle possède des posts',
      });
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
}

export { create, remove, list, update };

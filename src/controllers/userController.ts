import { Response, Request } from 'express';
import User from '@/models/userModel';

export const read = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
      attributes: {
        exclude: ['password'],
      },
    });

    if (!user) {
      res.status(400).json({ message: 'Utilisateur introuvable' });
    }
    res.json(user);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

export const update = async (req: Request, res: Response) => {
  const { fullName } = req.body;
  try {
    const user: any = await User.findByPk(req.params.id);
    user.fullName = fullName;
    await user.save();

    res.json(user);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

export const list = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 }: { page?: any; limit?: any } = req.query;
  try {
    const sortBy = req.query.sortBy ? req.query.sortBy : 'id';
    const { count, rows: data } = await User.findAndCountAll({
      attributes: {
        exclude: ['password'],
      },
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
    await User.destroy({ where: { id: req.params.id } });
    res.status(204).json();
  } catch (e) {
    res.status(500).json(e.message);
  }
};

export const removeByAdmin = async (req: Request, res: Response) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(204).json();
  } catch (e) {
    res.status(500).json(e.message);
  }
};

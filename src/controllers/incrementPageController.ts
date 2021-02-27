import IncrementPage from '@/models/incrementPageModel';
import { Request, Response } from 'express';

export const create = async (req: Request, res: Response) => {
  try {
    const newPage = new IncrementPage({
      page: req.body.page,
    });
    await newPage.save();
    res.json(newPage);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    const page = await IncrementPage.findAll();
    res.json({
      data: page,
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await IncrementPage.destroy({ where: { id: req.params.id } });
    res.status(204).json();
  } catch (e) {
    res.status(500).json(e.message);
  }
};

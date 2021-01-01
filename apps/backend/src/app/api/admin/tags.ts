import { Request, Response } from 'express';
import { Tag } from '../../models/tag';

export const tags = async (req: Request, res: Response) => {
  const limit = parseInt(String(req.query['limit'])) || 10;
  const offset = parseInt(String(req.query['offset'])) || 0;

  const query = {};

  const items = await Tag.find(query).skip(offset).limit(limit);
  const total = await Tag.countDocuments(query);

  return res.render('admin/tags', { items, total });
};

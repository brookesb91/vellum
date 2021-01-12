import { Request, Response } from 'express';
import { Referer } from '../../models/referer';

export const referers = async (req: Request, res: Response) => {
  const limit = parseInt(String(req.query['limit'])) || 10;
  const offset = parseInt(String(req.query['offset'])) || 0;

  const query = {};

  const items = await Referer.find(query)
    .populate('meta.tags')
    .skip(offset)
    .limit(limit);
  const total = await Referer.countDocuments(query);

  return res.render('admin/referers', { items, total });
};

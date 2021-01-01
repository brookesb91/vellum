import { Request, Response } from 'express';

import { Tag } from '../models/tag';
import { Referer } from '../models/referer';

export const home = async (req: Request, res: Response) => {
  const query = {};
  const limit = 10;
  const sort = { createdAt: -1 };

  const tags = await Tag.find(query).sort(sort).limit(limit);
  const items = await Referer.find(query)
    .sort(sort)
    .limit(limit)
    .populate('tags');

  return res.render('home', {
    tags,
    items,
  });
};

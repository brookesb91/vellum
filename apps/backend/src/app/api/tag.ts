import { Request, Response } from 'express';
import { Tag } from '../models/tag';
import { Referer } from '../models/referer';

export const tag = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const result = await Tag.findOne({ name: slug });

  if (!result) {
    return res.redirect('/404');
  }

  const limit = 10;
  const sort = { createdAt: -1 };

  const items = await Referer.find({
    status: 'complete',
    'meta.tags': { $in: result.id },
  })
    .sort(sort)
    .limit(limit)
    .populate('meta.tags');

  return res.render('tag', {
    tag: result,
    items,
  });
};

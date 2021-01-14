import { Request, Response } from 'express';

import { Tag, TagDocument } from '../models/tag';
import { Referer } from '../models/referer';

const TAG_LIMIT = 10;
const ITEM_LIMIT = 12;

export const home = async (req: Request, res: Response) => {
  const query = {};
  const sort = { createdAt: -1 };

  let tag: TagDocument = null;

  if (typeof req.query.tag !== 'undefined') {
    tag = await Tag.findOne({ name: req.query.tag as string });

    if (!tag) {
      return res.redirect('/');
    }

    query['meta.tags'] = { $in: [tag.id] };
  }

  const tags = await Tag.find({}).sort(sort).limit(TAG_LIMIT);

  const items = await Referer.find({
    ...query,
    status: 'complete',
  })
    .sort(sort)
    .limit(ITEM_LIMIT)
    .populate('meta.tags');

  return res.render('home', {
    tags,
    tag,
    items,
  });
};

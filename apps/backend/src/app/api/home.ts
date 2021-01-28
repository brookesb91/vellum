import { Request, Response } from 'express';

import { Tag, TagDocument } from '../models/tag';
import { Referer } from '../models/referer';

const TAG_LIMIT = 10;
const ITEM_LIMIT = 12;

export const home = async (req: Request, res: Response) => {
  const page = req.query.page ? parseInt(String(req.query['page'])) : 1 || 1;
  const offset = ITEM_LIMIT * (page - 1);

  const query = { status: 'complete' };

  let tag: TagDocument = null;

  if (typeof req.query.tag !== 'undefined') {
    tag = await Tag.findOne({ name: req.query.tag as string });

    if (!tag) {
      return res.redirect('/');
    }

    query['meta.tags'] = { $in: [tag.id] };
  }

  const items = await Referer.find(query)
    .sort({ createdAt: -1 })
    .limit(ITEM_LIMIT)
    .skip(offset)
    .populate('meta.tags');

  const total = await Referer.countDocuments(query);

  const tagsQuery = {};

  if (tag) {
    const tagIds = await Referer.distinct('meta.tags', query);
    tagsQuery['_id'] = { $in: tagIds };
  }

  const tags = await Tag.find(tagsQuery)
    .sort({ createdAt: -1 })
    .limit(TAG_LIMIT);

  const pagination = {
    page,
    limit: ITEM_LIMIT,
    offset,
    next: page * ITEM_LIMIT < total,
    previous: page > 1,
  };

  return res.render('home', {
    tags,
    tag,
    items,
    pagination,
  });
};

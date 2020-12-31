import { Request, Response } from 'express';
import slugify from 'slugify';

import { Tag, TagDocument } from '../models/tag';
import { Referer } from '../models/referer';
import { scrape } from '../infrastructure/scraper';

export const embed = async (req: Request, res: Response) => {
  if (typeof req.query['tags'] !== 'string') {
    return res.sendStatus(422);
  }

  const parsedTags = [
    ...req.query['tags'].match(/\b[a-zA-Z0-9\-\s]{2,}/g),
  ].map((t) => slugify(t));

  if (!parsedTags.length) {
    return res.sendStatus(422);
  }

  const tags: TagDocument[] = [];

  for (let i = 0; i < parsedTags.length; i++) {
    const doc = { name: parsedTags[i] };

    let tag = await Tag.findOne(doc);

    if (!tag) {
      tag = await Tag.create(doc);
    }

    tags.push(tag);
  }

  if (tags.length) {
    const referer = req.headers['referer'];

    let ref = await Referer.findOne({
      url: referer,
    });

    if (!ref) {
      ref = new Referer({ url: referer });
    }

    ref.tags = tags.map((x) => x.id);

    await ref.save();
  }

  return res.render('embed', {
    tags: tags.map((tag) => tag.toJSON()),
    styles: req.query['styles'],
  });
};

import { Request, Response } from 'express';

import { Tag } from '../models/tag';
import { Referer } from '../models/referer';

export const embed = async (req: Request, res: Response) => {
  // if (typeof req.query['tags'] !== 'string') {
  //   return res.sendStatus(422);
  // }

  // const parsedTags = parseTags(req.query['tags']);

  // if (!parsedTags.length) {
  //   return res.sendStatus(422);
  // }

  // const tags: TagDocument[] = [];

  // for (let i = 0; i < parsedTags.length; i++) {
  //   const doc = { name: parsedTags[i] };

  //   let tag = await Tag.findOne(doc);

  //   if (!tag) {
  //     tag = await Tag.create(doc);
  //   }

  //   tags.push(tag);
  // }

  // const url = new URL(req.headers['referer']);

  // let referer = await Referer.findOne({
  //   url: { host: url.host, path: url.pathname },
  // });

  // if (!referer) {
  //   referer = new Referer({ url });
  // }

  // if (tags.length) {
  //   referer.tags = tags.map((x) => x.id);
  // }

  // if (referer.isNew || referer.isModified()) {
  //   await referer.save();
  // }

  const url = req.headers['referer'];

  const referer = (await Referer.fromURL(url)).populate('meta.tags');

  return res.render('embed', {
    referer,
    styles: req.query['styles'],
  });
};

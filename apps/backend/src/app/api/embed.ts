import { Request, Response } from 'express';
import { Referer } from '../models/referer';

export const embed = async (req: Request, res: Response) => {
  const url = req.headers['referer'];

  const referer = await (await Referer.fromURL(url))
    .populate('meta.tags')
    .execPopulate();

  return res.render('embed', {
    referer,
    styles: req.query['styles'],
  });
};

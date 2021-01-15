import { Request, Response } from 'express';
import * as pug from 'pug';
import toImage from 'node-html-to-image';
import * as path from 'path';

import { Referer } from '../models/referer';

export const image = async (req: Request, res: Response) => {
  const url = req.headers['referer'];

  const referer = await (await Referer.fromURL(url))
    .populate('meta.tags')
    .execPopulate();

  const compile = pug.compileFile(path.join(__dirname, 'views', 'embed.pug'));
  const html = compile({ referer, styles: req.query['styles'] });
  const output = await toImage({ html });

  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(output, 'binary');
};

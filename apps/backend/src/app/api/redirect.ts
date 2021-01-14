import { Request, Response } from 'express';

export const redirect = async (req: Request, res: Response) => {
  if (typeof req.query.url === 'undefined') {
    return res.redirect('/');
  }

  return res.render('redirect', { url: req.query.url });
};

import { Request, Response } from 'express';

export const requireReferer = async (req: Request, res: Response) => {
  if (!req.headers['referer']) {
    return res.status(401);
  }
};

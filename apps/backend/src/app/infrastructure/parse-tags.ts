import slugify from 'slugify';

export const parseTags = (val: string) => {
  return [...val.match(/\b[a-zA-Z0-9\-\s]{2,}/g)].map((t) => slugify(t));
};

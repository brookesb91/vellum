import { Request, Response } from 'express';

import { Referer, RefererDocument, RefererModel } from '../../models/referer';

const referers = async (req: Request, res: Response) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  console.log(ip);
  const limit = parseInt(String(req.query['limit'])) || 10;
  const offset = parseInt(String(req.query['offset'])) || 0;

  const query = {};

  const items = await Referer.find(query)
    .populate('meta.tags')
    .skip(offset)
    .limit(limit);
  const total = await Referer.countDocuments(query);

  return res.render('admin/referers', {
    items,
    total,
    actions: [
      { name: 'Delete', path: 'delete' },
      { name: 'Scrape', path: 'scrape' },
    ],
  });
};

const createStructure = (data: Partial<RefererModel> = {}) => {
  return [
    {
      label: 'ID',
      type: 'input',
      name: 'id',
      attrs: {
        type: 'text',
        disabled: true,
        readonly: true,
        value: data.id,
      },
    },
    {
      label: 'Title',
      type: 'input',
      name: 'meta.title',
      attrs: {
        type: 'text',
        value: data.meta?.title || '',
      },
    },
    {
      label: 'Description',
      type: 'textarea',
      name: 'meta.description',
      attrs: {
        rows: 5,
        value: data.meta?.description || '',
      },
    },
    {
      label: 'Locale',
      type: 'input',
      name: 'meta.locale',
      attrs: {
        type: 'text',
        value: data.meta?.locale || '',
      },
    },
    {
      label: 'Type',
      type: 'input',
      name: 'meta.type',
      attrs: {
        type: 'text',
        value: data.meta?.type || '',
      },
    },
    {
      label: 'Image',
      type: 'input',
      name: 'meta.image',
      attrs: {
        type: 'text',
        value: data.meta?.image || '',
      },
    },
    {
      label: 'Icon',
      type: 'input',
      name: 'meta.icon',
      attrs: {
        type: 'text',
        value: data.meta?.icon || '',
      },
    },
  ];
};

const referer = async (req: Request, res: Response) => {
  const item = await Referer.findById(req.params['refererId']);

  if (!item) {
    return res.redirect('/admin');
  }

  return res.render('admin/editor', {
    attrs: { method: 'POST' },
    structure: createStructure(item),
  });
};

const create = async (req: Request, res: Response) => {
  return res.render('admin/editor', {
    attrs: { method: 'POST' },
    structure: [
      { label: 'URL', type: 'input', name: 'url', attrs: { type: 'text' } },
    ],
  });
};

const save = async (req: Request, res: Response) => {
  // do stuff
  let item: RefererDocument;

  if (typeof req.body['url'] !== 'undefined') {
    item = await Referer.fromURL(req.body['url']);
  } else if (typeof req.params['refererId'] !== 'undefined') {
    item = await Referer.findById(req.params['refererId']);
  }

  if (!item) {
    return res.redirect('/admin/referers');
  }

  const assign = (path: string, prop: string) => {
    if (typeof req.body[path] !== 'undefined') {
      item.meta[prop] = req.body[path];
    }
  };

  const structure = createStructure();

  structure.slice(1).forEach((field) => {
    const path = field.name;
    const prop = path.split('.')[1];
    assign(path, prop);
  });

  await item.save();

  return res.redirect(`/admin/referers/${item.id}`);
};

const remove = async (req: Request, res: Response) => {
  const item = await Referer.findById(req.params['refererId']);

  if (!item) {
    return res.redirect('/admin/referers');
  }

  await item.remove();

  return res.redirect('/admin/referers');
};

const scrape = async (req: Request, res: Response) => {
  const item = await Referer.findById(req.params['refererId']);

  if (!item) {
    return res.redirect('/admin/referers');
  }

  const result = await Referer.fromURL(item.url.full);

  return res.redirect('/admin/referers/' + result.id);
};

export const RefererController = {
  referers,
  referer,
  create,
  save,
  remove,
  scrape,
};

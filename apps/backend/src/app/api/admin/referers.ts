import { Request, Response } from 'express';
import { Referer, RefererModel } from '../../models/referer';

const referers = async (req: Request, res: Response) => {
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
      { name: 'delete', method: 'DELETE' },
      { name: 'scrape', method: 'POST', action: `scrape` },
    ],
  });
};

const createStructure = (data: Partial<RefererModel> = {}) => {
  return [
    ...(data.id
      ? [
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
        ]
      : []),
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
    structure: createStructure(),
  });
};

const save = async (req: Request, res: Response) => {
  // do stuff

  return res.redirect('/admin/referers');
};

const remove = async (req: Request, res: Response) => {
  const referer = await Referer.findById(req.params['refererId']);

  if (!referer) {
    return res.redirect('/admin');
  }

  await referer.remove();

  return res.redirect('/admin/referers');
};

const scrape = async (req: Request, res: Response) => {};

export const RefererController = {
  referers,
  referer,
  create,
  save,
  remove,
  scrape,
};

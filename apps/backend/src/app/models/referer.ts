import * as mongoose from 'mongoose';

import { scrape } from '../infrastructure/scraper';

export interface RefererModel {
  id?: string;
  url: {
    protocol: string;
    host: string;
    path: string;
  };
  meta?: {
    title?: string;
    description?: string;
    locale?: string;
    type?: string;
    image?: string;
    name?: string;
    tags?: string[];
    publishedAt?: Date;
    modifiedAt?: Date;
  };
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type RefererDocument = mongoose.Document & RefererModel;

type fromURLFn = (url: string) => Promise<RefererDocument>;

interface RefererModelStatics extends mongoose.Model<RefererDocument> {
  fromURL: fromURLFn;
}

const refererSchema = new mongoose.Schema<RefererDocument>(
  {
    url: {
      full: { type: String },
      protocol: { type: String },
      host: { type: String },
      path: { type: String },
    },
    meta: {
      title: { type: String },
      description: { type: String },
      locale: { type: String },
      type: { type: String },
      image: { type: String },
      icon: { type: String },
      name: { type: String },
      color: { type: String },
      tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
      modifiedAt: { type: mongoose.Schema.Types.Date },
      publishedAt: { type: mongoose.Schema.Types.Date },
    },
    scrapedAt: { type: mongoose.Schema.Types.Date },
    status: {
      type: String,
      default: function () {
        return 'pending';
      },
    },
  },
  { timestamps: true }
);

const requiredFields = ['title', 'description', 'image'];

refererSchema.post('save', async function () {
  const status = requiredFields.every(
    (p) => typeof this.meta[p] === 'string' && this.meta[p] !== ''
  )
    ? 'complete'
    : 'pending';

  if (status !== this.status) {
    await this.update({ status });
  }
});

refererSchema.statics.fromURL = async function (input: string) {
  const url = new URL(input);
  const { protocol, host, pathname: path } = url;

  let ref = await this.findOne({ 'url.full': url.toString() });

  const shouldScrape = !ref || (ref && ref.status === 'pending');

  if (shouldScrape) {
    const meta = await scrape(url.toString());

    for (let i = 0; i < meta.tags.length; i++) {
      const doc = { name: meta.tags[i] };
      let tag = await this.model('Tag').findOne(doc);

      if (!tag) {
        tag = await this.model('Tag').create(doc);
      }

      meta.tags[i] = tag.id;
    }

    if (!ref) {
      ref = await this.create({
        meta,
        url: { protocol, host, path, full: url.toString() },
        scrapedAt: new Date(),
      });
    } else {
      // await ref.update({ meta, scrapedAt: new Date() });
      ref.meta = meta;
      ref.scrapedAt = new Date();
      await ref.save();
    }
  }

  return ref;
};

export const Referer = mongoose.model<RefererDocument, RefererModelStatics>(
  'Referer',
  refererSchema
);

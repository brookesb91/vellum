import * as mongoose from 'mongoose';

import { scrape } from '../infrastructure/scraper';

export interface RefererModel {
  id?: string;
  url: string;
  title?: string;
  description?: string;
  locale?: string;
  type?: string;
  image?: string;
  name?: string;
  tags?: string[];
  status?: string;
  publishedAt?: string;
  modifiedAt?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type RefererDocument = mongoose.Document & RefererModel;

const refererSchema = new mongoose.Schema<RefererDocument>(
  {
    title: { type: String },
    description: { type: String },
    locale: { type: String },
    type: { type: String },
    url: { type: String },
    image: { type: String },
    name: { type: String },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    modifiedAt: { type: Date },
    publishedAt: { type: Date },
    status: {
      type: String,
      default: function () {
        return 'pending';
      },
    },
  },
  { timestamps: true }
);

refererSchema.post('save', async function () {
  if (this.status === 'pending') {
    const doc = await scrape(this.url);
    await this.update({ ...doc, status: 'complete' });
  }
});

export const Referer = mongoose.model<RefererDocument>(
  'Referer',
  refererSchema
);

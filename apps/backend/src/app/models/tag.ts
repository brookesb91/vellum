import * as mongoose from 'mongoose';

export interface TagModel {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TagDocument = mongoose.Document & TagModel;

const tagSchema = new mongoose.Schema<TagDocument>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Tag = mongoose.model<TagDocument>('Tag', tagSchema);

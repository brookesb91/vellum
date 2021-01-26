import * as mongoose from 'mongoose';
import { config } from '../config';

export const connectDB = async () => {
  mongoose.set('debug', true);
  await mongoose.connect(config.get('db_uri'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

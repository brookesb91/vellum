import * as mongoose from 'mongoose';

export const connectDB = async () => {
  mongoose.set('debug', true);
  await mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/vellum',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  );
};

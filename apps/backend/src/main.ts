/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';

import router from './app/router';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));

app.use(router);
app.get('/test', (req, res) => res.render('test'));

const port = process.env.port || 8080;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);

  mongoose.connect('mongodb://localhost/vellum');
  mongoose.set('debug', true);
});

server.on('error', console.error);

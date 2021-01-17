import * as express from 'express';
import * as path from 'path';

import router from './router';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(router);

app.get('/test', (req, res) => res.render('test'));

export { app };

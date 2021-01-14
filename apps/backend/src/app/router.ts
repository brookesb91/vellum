import { Router } from 'express';

import { embed } from './api/embed';
import { home } from './api/home';

import { referers } from './api/admin/referers';
import { tags } from './api/admin/tags';
import { redirect } from './api/redirect';

const router = Router();

router.get('/', home);
router.get('/embed', embed);
router.get('/redirect', redirect);

router.get('/admin', (req, res) => res.render('admin/index'));
router.get('/admin/referers', referers);
router.get('/admin/tags', tags);

export default router;

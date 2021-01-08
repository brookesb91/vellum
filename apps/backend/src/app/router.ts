import { Router } from 'express';

import { embed } from './api/embed';
import { home } from './api/home';
import { tag } from './api/tag';

import { referers } from './api/admin/referers';
import { tags } from './api/admin/tags';

const router = Router();

router.get('/', home);
router.get('/embed', embed);
router.get('/tags/:slug', tag);

router.get('/admin', (req, res) => res.render('admin/index'));
router.get('/admin/referers', referers);
router.get('/admin/tags', tags);

export default router;

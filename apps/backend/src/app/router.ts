import { Router } from 'express';

import { embed } from './api/embed';
import { home } from './api/home';

import { RefererController } from './api/admin/referers';
import { tags } from './api/admin/tags';
import { redirect } from './api/redirect';
import { image } from './api/image';

const router = Router();

router.get('/', home);
router.get('/embed', embed);
router.get('/embed/image', image);
router.get('/redirect', redirect);

router.get('/admin', (req, res) => res.render('admin/index'));

router.get('/admin/referers', RefererController.referers);
router.get('/admin/referers/create', RefererController.create);
router.post('/admin/referers/create', RefererController.save);
router.get('/admin/referers/:refererId', RefererController.referer);
router.post('/admin/referers/:refererId', RefererController.save);
router.post('/admin/referers/:refererId/scrape', RefererController.scrape);
router.post('/admin/referers/:refererId/delete', RefererController.remove);

router.get('/admin/tags', tags);

export default router;

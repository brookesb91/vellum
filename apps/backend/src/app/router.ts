import { Router } from 'express';

import { embed } from './api/embed';
import { home } from './api/home';

import { RefererController } from './api/admin/referers';
import { tags } from './api/admin/tags';
import { redirect } from './api/redirect';
import { image } from './api/image';

const router = Router();

// Front
router.get('/', home);
router.get('/embed', embed);
router.get('/embed/image', image);
router.get('/redirect', redirect);

// Admin
const password = process.env.ADMIN_PASSWORD || 'mw5RbBZZuNcgXNY';

router.get('/admin', (req, res) => res.render('admin/index'));

router.get(`/admin/${password}/referers`, RefererController.referers);
router.get(`/admin/${password}/referers/create`, RefererController.create);
router.post(`/admin/${password}/referers/create`, RefererController.save);
router.get(`/admin/${password}/referers/:refererId`, RefererController.referer);
router.post(`/admin/${password}/referers/:refererId`, RefererController.save);
router.get(
  `/admin/${password}/referers/:refererId/tags`,
  RefererController.editTags
);
router.post(
  `/admin/${password}/referers/:refererId/tags`,
  RefererController.updateTags
);
router.post(
  `/admin/${password}/referers/:refererId/scrape`,
  RefererController.scrape
);
router.post(
  `/admin/${password}/referers/:refererId/delete`,
  RefererController.remove
);

router.get(`/admin/${password}/tags`, tags);

export default router;

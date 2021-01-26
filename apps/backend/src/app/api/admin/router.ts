import { Router } from 'express';

import { RefererController } from './referers';
import { tags } from './tags';

const router = Router();

router.get('/', (req, res) => res.render('admin/index'));

router.get(`/referers`, RefererController.referers);
router.get(`/referers/create`, RefererController.create);
router.post(`/referers/create`, RefererController.save);
router.get(`/referers/:refererId`, RefererController.referer);
router.post(`/referers/:refererId`, RefererController.save);
router.get(`/referers/:refererId/tags`, RefererController.editTags);
router.post(`/referers/:refererId/tags`, RefererController.updateTags);
router.post(`/referers/:refererId/scrape`, RefererController.scrape);
router.post(`/referers/:refererId/delete`, RefererController.remove);

// TODO
router.get(`/tags`, tags);

export { router };

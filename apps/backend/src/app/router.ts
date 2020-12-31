import { Router } from 'express';

import { embed } from './api/embed';
import { referers } from './api/admin/referers';

const router = Router();

router.get('/embed', embed);

router.get('/admin/referers', referers);

export default router;

import { Router } from 'express';

import { config } from '../config';
import { embed } from './embed';
import { home } from './home';
import { redirect } from './redirect';
import { image } from './image';
import { router as admin } from './admin';

const ADMIN_KEY = config.get('admin_key');

const router = Router();

// Front
router.get('/', home);
router.get('/embed', embed);
router.get('/embed/image', image);
router.get('/redirect', redirect);

// Admin
router.use(`/admin/${ADMIN_KEY}`, admin);

export { router };

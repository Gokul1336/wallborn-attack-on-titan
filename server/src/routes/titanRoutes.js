import { Router } from 'express';
import { listTitans, getTitanBySlug, getFeaturedTitans } from '../controllers/titanController.js';

const router = Router();

router.get('/', listTitans);
router.get('/featured', getFeaturedTitans);
router.get('/:slug', getTitanBySlug);

export default router;

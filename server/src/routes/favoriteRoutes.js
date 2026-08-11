import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  toggleFavoriteCharacter,
  toggleFavoriteTitan,
  getMyFavorites,
} from '../controllers/favoriteController.js';

const router = Router();

router.use(requireAuth);
router.get('/', getMyFavorites);
router.post('/characters/:slug', toggleFavoriteCharacter);
router.post('/titans/:slug', toggleFavoriteTitan);

export default router;

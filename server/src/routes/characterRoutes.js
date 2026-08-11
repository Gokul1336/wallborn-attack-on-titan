import { Router } from 'express';
import { listCharacters, getCharacterBySlug, getFeaturedCharacters } from '../controllers/characterController.js';

const router = Router();

router.get('/', listCharacters);
router.get('/featured', getFeaturedCharacters);
router.get('/:slug', getCharacterBySlug);

export default router;

import { Router } from 'express';
import { getProfile, updateAvatar } from '../controllers/userController.js';
import { requireAuth } from '../middleware/auth.js';
import { uploadAvatar } from '../middleware/upload.js';

const router = Router();

router.get('/profile', requireAuth, getProfile);
router.patch('/avatar', requireAuth, uploadAvatar, updateAvatar);

export default router;

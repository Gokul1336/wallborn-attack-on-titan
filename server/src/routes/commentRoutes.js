import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { listComments, createComment, deleteComment } from '../controllers/commentController.js';

const router = Router();

router.get('/:targetType/:targetSlug', listComments);
router.post('/:targetType/:targetSlug', requireAuth, createComment);
router.delete('/:commentId', requireAuth, deleteComment);

export default router;

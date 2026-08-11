import { Router } from 'express';
import {
  signup,
  login,
  logout,
  getMe,
  verifyEmail,
  resendVerificationOtp,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', requireAuth, getMe);

router.post('/verify-email', requireAuth, verifyEmail);
router.post('/resend-otp', requireAuth, resendVerificationOtp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;

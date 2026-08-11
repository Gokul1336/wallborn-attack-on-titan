import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signToken } from '../config/jwt.js';
import { sendOtpEmail } from '../config/mailer.js';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are all required.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }

    const existing = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username }] });
    if (existing) {
      return res.status(409).json({ message: 'An account with that username or email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email: email.toLowerCase(), passwordHash });

    // Send a verification OTP, but don't let a flaky mail provider block account creation —
    // the user can always hit "resend code" from the verify-email screen.
    try {
      const code = await user.setOtp('verify-email');
      await user.save();
      await sendOtpEmail({ to: user.email, username: user.username, code, purpose: 'verify-email' });
    } catch (mailErr) {
      console.error('[signup] could not send verification email:', mailErr.message);
    }

    const token = signToken(user._id);
    res.cookie('wallborn_token', token, COOKIE_OPTIONS);
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Could not create account.', error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }

    const valid = await user.comparePassword(password);
    if (!valid) {
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }

    const token = signToken(user._id);
    res.cookie('wallborn_token', token, COOKIE_OPTIONS);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Login failed.', error: err.message });
  }
}

export async function logout(_req, res) {
  res.clearCookie('wallborn_token', { ...COOKIE_OPTIONS, maxAge: 0 });
  res.json({ message: 'Logged out.' });
}

export async function getMe(req, res) {
  res.json({ user: req.user });
}

export async function verifyEmail(req, res) {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: 'Verification code is required.' });
    }

    const user = await User.findById(req.user._id).select('+otpHash +otpPurpose +otpExpiresAt');
    if (user.isVerified) {
      return res.json({ message: 'Already verified.', user });
    }

    const valid = await user.verifyOtp(code, 'verify-email');
    if (!valid) {
      return res.status(400).json({ message: 'That code is invalid or has expired.' });
    }

    user.isVerified = true;
    user.clearOtp();
    await user.save();

    res.json({ message: 'Email verified.', user });
  } catch (err) {
    res.status(500).json({ message: 'Could not verify email.', error: err.message });
  }
}

export async function resendVerificationOtp(req, res) {
  try {
    const user = await User.findById(req.user._id).select('+otpLastSentAt');
    if (user.isVerified) {
      return res.status(400).json({ message: 'This account is already verified.' });
    }
    if (!user.canResendOtp()) {
      return res.status(429).json({ message: 'Please wait a bit before requesting another code.' });
    }

    const code = await user.setOtp('verify-email');
    await user.save();
    await sendOtpEmail({ to: user.email, username: user.username, code, purpose: 'verify-email' });

    res.json({ message: 'Verification code sent.' });
  } catch (err) {
    res.status(500).json({ message: 'Could not send verification code.', error: err.message });
  }
}

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+otpLastSentAt');

    // Always respond the same way whether or not the account exists, so this
    // endpoint can't be used to check which emails have accounts.
    const genericResponse = { message: 'If an account exists for that email, a code has been sent.' };

    if (!user || !user.canResendOtp()) {
      return res.json(genericResponse);
    }

    const code = await user.setOtp('reset-password');
    await user.save();
    await sendOtpEmail({ to: user.email, username: user.username, code, purpose: 'reset-password' });

    res.json(genericResponse);
  } catch (err) {
    res.status(500).json({ message: 'Could not process request.', error: err.message });
  }
}

export async function resetPassword(req, res) {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
      return res.status(400).json({ message: 'Email, code, and new password are all required.' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      '+otpHash +otpPurpose +otpExpiresAt'
    );
    if (!user) {
      return res.status(400).json({ message: 'That code is invalid or has expired.' });
    }

    const valid = await user.verifyOtp(code, 'reset-password');
    if (!valid) {
      return res.status(400).json({ message: 'That code is invalid or has expired.' });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 12);
    user.clearOtp();
    await user.save();

    res.json({ message: 'Password reset. You can now log in with your new password.' });
  } catch (err) {
    res.status(500).json({ message: 'Could not reset password.', error: err.message });
  }
}

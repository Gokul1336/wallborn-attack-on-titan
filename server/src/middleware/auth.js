import { verifyToken } from '../config/jwt.js';
import User from '../models/User.js';

export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.wallborn_token;
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated. Please log in.' });
    }
    const payload = verifyToken(token);
    const user = await User.findById(payload.sub);
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists.' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired session.' });
  }
}

// Attaches req.user if a valid token is present, but doesn't block the request otherwise.
export async function attachUserIfPresent(req, _res, next) {
  try {
    const token = req.cookies?.wallborn_token;
    if (!token) return next();
    const payload = verifyToken(token);
    const user = await User.findById(payload.sub);
    if (user) req.user = user;
    next();
  } catch {
    next();
  }
}

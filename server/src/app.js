import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import characterRoutes from './routes/characterRoutes.js';
import titanRoutes from './routes/titanRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express();

app.use(
  cors({
    origin: 'https://wallborn-attack-on-titan.vercel.app',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'wallborn-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/titans', titanRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/comments', commentRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `No route found for ${req.method} ${req.originalUrl}` });
});

// Centralized error handler
app.use((err, _req, res, _next) => {
  if (err.name === 'MulterError') {
    const message =
      err.code === 'LIMIT_FILE_SIZE' ? 'Image must be 5MB or smaller.' : err.message;
    return res.status(400).json({ message });
  }
  console.error('[error]', err);
  res.status(err.status || 500).json({ message: err.message || 'Something went wrong on our end.' });
});

export default app;
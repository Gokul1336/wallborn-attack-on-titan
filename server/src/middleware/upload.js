import multer from 'multer';

// Files land in memory as a Buffer (req.file.buffer) instead of on disk —
// we forward that buffer straight to Cloudinary and never store it locally.
const storage = multer.memoryStorage();

function fileFilter(_req, file, cb) {
  if (!file.mimetype.startsWith('image/')) {
    const err = new Error('Only image files are allowed.');
    err.status = 400;
    return cb(err);
  }
  cb(null, true);
}

export const uploadAvatar = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).single('avatar');

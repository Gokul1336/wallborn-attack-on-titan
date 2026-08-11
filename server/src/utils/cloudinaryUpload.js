import cloudinary from '../config/cloudinary.js';

// multer's memoryStorage gives us the file as a Buffer (req.file.buffer).
// Cloudinary's upload_stream wants a writable stream, so we pipe the buffer
// straight into it — no temp file ever touches disk.
export function uploadBufferToCloudinary(buffer, { folder, publicId } = {}) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folder || 'wallborn/avatars',
        public_id: publicId,
        overwrite: true,
        resource_type: 'image',
        transformation: [{ width: 512, height: 512, crop: 'fill', gravity: 'face' }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
}

export async function deleteFromCloudinary(publicId) {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    // Non-fatal — an orphaned image on Cloudinary isn't worth failing the request over.
    console.error('[cloudinary] failed to delete old avatar:', err.message);
  }
}

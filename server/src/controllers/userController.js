import User from '../models/User.js';
import { uploadBufferToCloudinary, deleteFromCloudinary } from '../utils/cloudinaryUpload.js';

export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      user,
      stats: {
        favoriteCharacterCount: user.favoriteCharacters.length,
        favoriteTitanCount: user.favoriteTitans.length,
        memberSince: user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Could not load profile.', error: err.message });
  }
}

export async function updateAvatar(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file was uploaded.' });
    }

    const user = await User.findById(req.user._id).select('+avatarPublicId');
    const previousPublicId = user.avatarPublicId;

    const result = await uploadBufferToCloudinary(req.file.buffer, {
      folder: 'wallborn/avatars',
      publicId: `user_${user._id}`,
    });

    user.avatarUrl = result.secure_url;
    user.avatarPublicId = result.public_id;
    await user.save();

    // Clean up the old image only after the new one is confirmed uploaded,
    // and only if Cloudinary assigned it a different public_id.
    if (previousPublicId && previousPublicId !== result.public_id) {
      await deleteFromCloudinary(previousPublicId);
    }

    res.json({ message: 'Profile picture updated.', user });
  } catch (err) {
    res.status(500).json({ message: 'Could not upload profile picture.', error: err.message });
  }
}

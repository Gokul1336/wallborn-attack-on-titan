import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 24 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    favoriteCharacters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
    favoriteTitans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TitanKin' }],
    role: { type: String, enum: ['user', 'admin'], default: 'user' },

    // Email verification / password reset
    isVerified: { type: Boolean, default: false },
    otpHash: { type: String, select: false },
    otpPurpose: { type: String, enum: ['verify-email', 'reset-password'], select: false },
    otpExpiresAt: { type: Date, select: false },
    otpLastSentAt: { type: Date, select: false },

    // Profile avatar (stored on Cloudinary)
    avatarUrl: { type: String, default: '' },
    avatarPublicId: { type: String, select: false },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.passwordHash);
};

const OTP_TTL_MINUTES = 10;
const OTP_RESEND_COOLDOWN_MS = 60 * 1000;

// Generates a 6-digit OTP, stores only its bcrypt hash, and returns the
// plaintext code once so the caller can email it. Never persisted in plaintext.
userSchema.methods.setOtp = async function (purpose) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  this.otpHash = await bcrypt.hash(code, 10);
  this.otpPurpose = purpose;
  this.otpExpiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);
  this.otpLastSentAt = new Date();
  return code;
};

userSchema.methods.canResendOtp = function () {
  if (!this.otpLastSentAt) return true;
  return Date.now() - this.otpLastSentAt.getTime() > OTP_RESEND_COOLDOWN_MS;
};

userSchema.methods.verifyOtp = async function (code, purpose) {
  if (!this.otpHash || !this.otpExpiresAt || this.otpPurpose !== purpose) return false;
  if (this.otpExpiresAt.getTime() < Date.now()) return false;
  return bcrypt.compare(code, this.otpHash);
};

userSchema.methods.clearOtp = function () {
  this.otpHash = undefined;
  this.otpPurpose = undefined;
  this.otpExpiresAt = undefined;
  this.otpLastSentAt = undefined;
};

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.passwordHash;
    delete ret.otpHash;
    delete ret.otpPurpose;
    delete ret.otpExpiresAt;
    delete ret.otpLastSentAt;
    delete ret.avatarPublicId;
    return ret;
  },
});

export default mongoose.model('User', userSchema);

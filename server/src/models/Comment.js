import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    targetType: { type: String, enum: ['Character', 'TitanKin'], required: true },
    targetSlug: { type: String, required: true, index: true },
    body: { type: String, required: true, maxlength: 1000, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Comment', commentSchema);

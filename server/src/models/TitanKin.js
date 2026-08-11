import mongoose from 'mongoose';

const titanKinSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // e.g. "The Cinder Colossus"
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    classification: {
      type: String,
      enum: ['Wandering', 'Sentinel', 'Apex', 'Sealed God', 'Unknown'],
      default: 'Wandering',
    },
    heightMeters: { type: Number, required: true },
    threatLevel: { type: Number, min: 1, max: 10, default: 5 },
    firstSighting: { type: String }, // narrative date, e.g. "Year 297, Outer Wall breach"
    portraitColor: { type: String, default: '#8B2635' },
    portraitUrl: { type: String, default: '' },
    shortBio: { type: String, required: true },
    fullBio: { type: String, required: true },
    abilities: [{ type: String }],
    weakness: { type: String },
    boundCharacter: { type: mongoose.Schema.Types.ObjectId, ref: 'Character', default: null },
    storyArcs: [
      {
        arcSlug: String,
        arcTitle: String,
        summary: String,
        order: Number,
      },
    ],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

titanKinSchema.index({ name: 'text', shortBio: 'text', fullBio: 'text' });

export default mongoose.model('TitanKin', titanKinSchema);

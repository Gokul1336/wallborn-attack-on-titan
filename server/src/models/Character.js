import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    title: { type: String, trim: true }, // e.g. "The Last Vanguard Scout"
    order: {
      type: String,
      enum: ['Vanguard', 'Ironwatch', 'Cinder Corps', 'Civilian', 'Unaffiliated'],
      default: 'Unaffiliated',
    },
    rank: { type: String, default: 'Recruit' },
    wallTier: {
      type: String,
      enum: ['Outer', 'Mid', 'Inner', 'Beyond the Walls'],
      default: 'Mid',
    },
    status: {
      type: String,
      enum: ['Active', 'KIA', 'Missing', 'Titan-Bonded', 'Unknown'],
      default: 'Active',
    },
    age: { type: Number },
    heightCm: { type: Number },
    portraitColor: { type: String, default: '#3D5A6C' }, // placeholder swatch until art is generated
    portraitUrl: { type: String, default: '' }, // filled in once illustrations are generated
    shortBio: { type: String, required: true },
    fullBio: { type: String, required: true },
    abilities: [{ type: String }],
    affiliatedTitanForm: { type: mongoose.Schema.Types.ObjectId, ref: 'TitanKin', default: null },
    storyArcs: [
      {
        arcSlug: String,
        arcTitle: String,
        summary: String,
        order: Number,
      },
    ],
    relationships: [
      {
        characterSlug: String,
        relation: String, // e.g. "Squad Captain", "Rival", "Sister"
      },
    ],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

characterSchema.index({ name: 'text', shortBio: 'text', fullBio: 'text' });

export default mongoose.model('Character', characterSchema);

import Character from '../models/Character.js';

export async function listCharacters(req, res) {
  try {
    const { order, status, wallTier, q } = req.query;
    const filter = {};
    if (order) filter.order = order;
    if (status) filter.status = status;
    if (wallTier) filter.wallTier = wallTier;
    if (q) filter.$text = { $search: q };

    const characters = await Character.find(filter)
      .select('name slug title order rank wallTier status portraitColor portraitUrl featured')
      .sort({ featured: -1, name: 1 });

    res.json({ count: characters.length, characters });
  } catch (err) {
    res.status(500).json({ message: 'Could not load characters.', error: err.message });
  }
}

export async function getCharacterBySlug(req, res) {
  try {
    const character = await Character.findOne({ slug: req.params.slug }).populate(
      'affiliatedTitanForm',
      'name slug classification heightMeters portraitColor portraitUrl'
    );
    if (!character) {
      return res.status(404).json({ message: 'No character found with that identifier.' });
    }
    res.json({ character });
  } catch (err) {
    res.status(500).json({ message: 'Could not load character.', error: err.message });
  }
}

export async function getFeaturedCharacters(_req, res) {
  try {
    const characters = await Character.find({ featured: true }).select(
      'name slug title order rank wallTier status portraitColor portraitUrl'
    );
    res.json({ characters });
  } catch (err) {
    res.status(500).json({ message: 'Could not load featured characters.', error: err.message });
  }
}

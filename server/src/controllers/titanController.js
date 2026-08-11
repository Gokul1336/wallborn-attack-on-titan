import TitanKin from '../models/TitanKin.js';

export async function listTitans(req, res) {
  try {
    const { classification, q } = req.query;
    const filter = {};
    if (classification) filter.classification = classification;
    if (q) filter.$text = { $search: q };

    const titans = await TitanKin.find(filter)
      .select('name slug classification heightMeters threatLevel portraitColor portraitUrl featured')
      .sort({ featured: -1, threatLevel: -1 });

    res.json({ count: titans.length, titans });
  } catch (err) {
    res.status(500).json({ message: 'Could not load titan-kin.', error: err.message });
  }
}

export async function getTitanBySlug(req, res) {
  try {
    const titan = await TitanKin.findOne({ slug: req.params.slug }).populate(
      'boundCharacter',
      'name slug title portraitColor portraitUrl'
    );
    if (!titan) {
      return res.status(404).json({ message: 'No titan-kin found with that identifier.' });
    }
    res.json({ titan });
  } catch (err) {
    res.status(500).json({ message: 'Could not load titan-kin.', error: err.message });
  }
}

export async function getFeaturedTitans(_req, res) {
  try {
    const titans = await TitanKin.find({ featured: true }).select(
      'name slug classification heightMeters threatLevel portraitColor portraitUrl'
    );
    res.json({ titans });
  } catch (err) {
    res.status(500).json({ message: 'Could not load featured titan-kin.', error: err.message });
  }
}

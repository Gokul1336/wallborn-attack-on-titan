import User from '../models/User.js';
import Character from '../models/Character.js';
import TitanKin from '../models/TitanKin.js';

export async function toggleFavoriteCharacter(req, res) {
  try {
    const { slug } = req.params;
    const character = await Character.findOne({ slug });
    if (!character) return res.status(404).json({ message: 'Character not found.' });

    const user = req.user;
    const idx = user.favoriteCharacters.findIndex((id) => id.equals(character._id));
    let favorited;
    if (idx === -1) {
      user.favoriteCharacters.push(character._id);
      favorited = true;
    } else {
      user.favoriteCharacters.splice(idx, 1);
      favorited = false;
    }
    await user.save();
    res.json({ favorited, favoriteCharacters: user.favoriteCharacters });
  } catch (err) {
    res.status(500).json({ message: 'Could not update favorites.', error: err.message });
  }
}

export async function toggleFavoriteTitan(req, res) {
  try {
    const { slug } = req.params;
    const titan = await TitanKin.findOne({ slug });
    if (!titan) return res.status(404).json({ message: 'Titan-kin not found.' });

    const user = req.user;
    const idx = user.favoriteTitans.findIndex((id) => id.equals(titan._id));
    let favorited;
    if (idx === -1) {
      user.favoriteTitans.push(titan._id);
      favorited = true;
    } else {
      user.favoriteTitans.splice(idx, 1);
      favorited = false;
    }
    await user.save();
    res.json({ favorited, favoriteTitans: user.favoriteTitans });
  } catch (err) {
    res.status(500).json({ message: 'Could not update favorites.', error: err.message });
  }
}

export async function getMyFavorites(req, res) {
  try {
    const user = await User.findById(req.user._id)
      .populate('favoriteCharacters', 'name slug title portraitColor portraitUrl status')
      .populate('favoriteTitans', 'name slug classification portraitColor portraitUrl threatLevel');
    res.json({
      favoriteCharacters: user.favoriteCharacters,
      favoriteTitans: user.favoriteTitans,
    });
  } catch (err) {
    res.status(500).json({ message: 'Could not load favorites.', error: err.message });
  }
}

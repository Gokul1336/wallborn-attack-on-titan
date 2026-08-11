import { useEffect } from 'react';
import { useFavoriteStore } from '../store/favoriteStore';
import { useAuthStore } from '../store/authStore';
import CharacterCard from '../components/CharacterCard';
import TitanCard from '../components/TitanCard';
import './Favorites.css';

export default function Favorites() {
  const { user } = useAuthStore();
  const { favoriteCharacters, favoriteTitans, fetchFavorites, status } = useFavoriteStore();

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="container favorites-page">
      <span className="mono-label">PERSONAL DOSSIER</span>
      <h1>{user?.username}'s Saved Files</h1>

      {status === 'loading' && <p className="mono-label">Loading your dossier...</p>}

      <section className="favorites-section">
        <h2>Personnel</h2>
        {favoriteCharacters.length === 0 ? (
          <p className="mono-label">No personnel saved yet. Browse the roster to add some.</p>
        ) : (
          <div className="grid">
            {favoriteCharacters.map((c, i) => (
              <CharacterCard key={c.slug} character={c} index={i} />
            ))}
          </div>
        )}
      </section>

      <section className="favorites-section">
        <h2>Hollow Kin</h2>
        {favoriteTitans.length === 0 ? (
          <p className="mono-label">No Hollow Kin saved yet. Browse the bestiary to add some.</p>
        ) : (
          <div className="grid">
            {favoriteTitans.map((t, i) => (
              <TitanCard key={t.slug} titan={t} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

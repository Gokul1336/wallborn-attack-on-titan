import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useFavoriteStore } from '../store/favoriteStore';
import './FavoriteButton.css';

export default function FavoriteButton({ entityId, slug, type }) {
  const { status: authStatus } = useAuthStore();
  const {
    fetchFavorites,
    isCharacterFavorited,
    isTitanFavorited,
    toggleCharacter,
    toggleTitan,
    status,
  } = useFavoriteStore();

  useEffect(() => {
    if (authStatus === 'authenticated' && status === 'idle') {
      fetchFavorites();
    }
  }, [authStatus]);

  if (authStatus !== 'authenticated') return null;

  const favorited = type === 'character' ? isCharacterFavorited(entityId) : isTitanFavorited(entityId);

  function handleClick() {
    if (type === 'character') {
      toggleCharacter(slug);
    } else {
      toggleTitan(slug);
    }
  }

  return (
    <button
      className={`fav-btn ${favorited ? 'fav-btn--active' : ''}`}
      onClick={handleClick}
      aria-pressed={favorited}
    >
      <span className="fav-btn__icon">{favorited ? '★' : '☆'}</span>
      {favorited ? 'In your dossier' : 'Add to dossier'}
    </button>
  );
}

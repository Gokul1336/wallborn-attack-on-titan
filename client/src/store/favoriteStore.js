import { create } from 'zustand';
import api from '../api/client';

export const useFavoriteStore = create((set, get) => ({
  favoriteCharacters: [],
  favoriteTitans: [],
  status: 'idle',

  async fetchFavorites() {
    set({ status: 'loading' });
    try {
      const { data } = await api.get('/favorites');
      set({
        favoriteCharacters: data.favoriteCharacters,
        favoriteTitans: data.favoriteTitans,
        status: 'success',
      });
    } catch {
      set({ status: 'error' });
    }
  },

  isCharacterFavorited(characterId) {
    return get().favoriteCharacters.some((c) => c._id === characterId);
  },

  isTitanFavorited(titanId) {
    return get().favoriteTitans.some((t) => t._id === titanId);
  },

  async toggleCharacter(slug) {
    try {
      await api.post(`/favorites/characters/${slug}`);
      await get().fetchFavorites();
    } catch (err) {
      console.error('Could not toggle favorite character', err);
    }
  },

  async toggleTitan(slug) {
    try {
      await api.post(`/favorites/titans/${slug}`);
      await get().fetchFavorites();
    } catch (err) {
      console.error('Could not toggle favorite titan', err);
    }
  },
}));

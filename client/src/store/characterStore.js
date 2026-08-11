import { create } from 'zustand';
import api from '../api/client';

export const useCharacterStore = create((set, get) => ({
  characters: [],
  featured: [],
  current: null,
  status: 'idle',
  error: null,

  async fetchAll(filters = {}) {
    set({ status: 'loading', error: null });
    try {
      const { data } = await api.get('/characters', { params: filters });
      set({ characters: data.characters, status: 'success' });
    } catch (err) {
      set({ status: 'error', error: err.response?.data?.message || 'Could not load characters.' });
    }
  },

  async fetchFeatured() {
    try {
      const { data } = await api.get('/characters/featured');
      set({ featured: data.characters });
    } catch {
      // Non-critical; fail silently on homepage hero
    }
  },

  async fetchBySlug(slug) {
    set({ status: 'loading', error: null, current: null });
    try {
      const { data } = await api.get(`/characters/${slug}`);
      set({ current: data.character, status: 'success' });
    } catch (err) {
      set({ status: 'error', error: err.response?.data?.message || 'Character not found.' });
    }
  },
}));

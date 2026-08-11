import { create } from 'zustand';
import api from '../api/client';

export const useTitanStore = create((set) => ({
  titans: [],
  featured: [],
  current: null,
  status: 'idle',
  error: null,

  async fetchAll(filters = {}) {
    set({ status: 'loading', error: null });
    try {
      const { data } = await api.get('/titans', { params: filters });
      set({ titans: data.titans, status: 'success' });
    } catch (err) {
      set({ status: 'error', error: err.response?.data?.message || 'Could not load titan-kin.' });
    }
  },

  async fetchFeatured() {
    try {
      const { data } = await api.get('/titans/featured');
      set({ featured: data.titans });
    } catch {
      // Non-critical; fail silently on homepage hero
    }
  },

  async fetchBySlug(slug) {
    set({ status: 'loading', error: null, current: null });
    try {
      const { data } = await api.get(`/titans/${slug}`);
      set({ current: data.titan, status: 'success' });
    } catch (err) {
      set({ status: 'error', error: err.response?.data?.message || 'Titan-kin not found.' });
    }
  },
}));

import { create } from 'zustand';
import api from '../api/client';
import { useAuthStore } from './authStore';

export const useProfileStore = create((set) => ({
  stats: null,
  status: 'idle', // idle | loading | success | error
  uploading: false,
  uploadError: null,

  async fetchProfile() {
    set({ status: 'loading' });
    try {
      const { data } = await api.get('/users/profile');
      useAuthStore.setState({ user: data.user });
      set({ stats: data.stats, status: 'success' });
    } catch {
      set({ status: 'error' });
    }
  },

  async uploadAvatar(file) {
    set({ uploading: true, uploadError: null });
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const { data } = await api.patch('/users/avatar', formData);
      useAuthStore.setState({ user: data.user });
      set({ uploading: false });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Could not upload image.';
      set({ uploading: false, uploadError: message });
      return { success: false, message };
    }
  },
}));

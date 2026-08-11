import { create } from 'zustand';
import api from '../api/client';

export const useAuthStore = create((set, get) => ({
  user: null,
  status: 'idle', // idle | loading | authenticated | unauthenticated
  error: null,

  async checkSession() {
    set({ status: 'loading' });
    try {
      const { data } = await api.get('/auth/me');
      set({ user: data.user, status: 'authenticated', error: null });
    } catch {
      set({ user: null, status: 'unauthenticated' });
    }
  },

  async signup(payload) {
    set({ status: 'loading', error: null });
    try {
      const { data } = await api.post('/auth/signup', payload);
      set({ user: data.user, status: 'authenticated' });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Signup failed.';
      set({ status: 'unauthenticated', error: message });
      return { success: false, message };
    }
  },

  async login(payload) {
    set({ status: 'loading', error: null });
    try {
      const { data } = await api.post('/auth/login', payload);
      set({ user: data.user, status: 'authenticated' });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed.';
      set({ status: 'unauthenticated', error: message });
      return { success: false, message };
    }
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } finally {
      set({ user: null, status: 'unauthenticated' });
    }
  },

  async verifyEmail(code) {
    try {
      const { data } = await api.post('/auth/verify-email', { code });
      set({ user: data.user });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Verification failed.' };
    }
  },

  async resendOtp() {
    try {
      const { data } = await api.post('/auth/resend-otp');
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Could not resend code.' };
    }
  },

  async forgotPassword(email) {
    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Something went wrong.' };
    }
  },

  async resetPassword({ email, code, newPassword }) {
    try {
      const { data } = await api.post('/auth/reset-password', { email, code, newPassword });
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Could not reset password.' };
    }
  },

  clearError() {
    set({ error: null });
  },
}));

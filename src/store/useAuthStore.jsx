// src/store/useAuthStore.jsx

import { create } from 'zustand';
import { getMockUsers } from '../data/mockUsers';

const LOCAL_STORAGE_KEY = 'quickbook_current_user';

const getStoredUser = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

const useAuthStore = create((set) => ({
  user: getStoredUser(),

  login: ({ email, password }) => {
    const users = getMockUsers();
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(foundUser));
      set({ user: foundUser });
      return { success: true, role: foundUser.role };
    }

    return { success: false, message: 'Invalid credentials' };
  },

  logout: () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    set({ user: null });
  }
}));

export default useAuthStore;

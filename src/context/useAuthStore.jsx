// src/context/useAuthStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockUsers } from '../data/mockUsers';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: (email, password, role) => {
        const normalizedEmail = email.trim().toLowerCase();
        const foundUser = Object.values(mockUsers).find(
          (u) =>
            u.email.toLowerCase() === normalizedEmail &&
            u.password === password &&
            u.role === role
        );

        if (foundUser) {
          const { password: _, ...userData } = foundUser;
          set({ user: userData });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useAuthStore;

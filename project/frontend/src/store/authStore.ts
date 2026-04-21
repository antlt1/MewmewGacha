import { create } from 'zustand';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUserProfile,
  type UserProfile,
} from '../services/firebase';

interface AuthState {
  user: UserProfile | null;
  authUser: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;

  // Actions
  register: (email: string, password: string, username: string, position?: 'user' | 'loot_mapper') => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: UserProfile | null) => void;
  clearError: () => void;
  initializeAuth: () => void;
  checkAuthStatus: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  authUser: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,

  register: async (email, password, username, position = 'user') => {
    set({ isLoading: true, error: null });
    try {
      await registerUser(email, password, username, position);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Failed to register',
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const userProfile = await loginUser(email, password);
      set({
        user: userProfile,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Failed to login',
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await logoutUser();
      set({
        user: null,
        authUser: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Failed to logout',
      });
      throw error;
    }
  },

  setUser: (user) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },

  clearError: () => {
    set({ error: null });
  },

  initializeAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userProfile = await getCurrentUserProfile(firebaseUser.uid);
        set({
          authUser: firebaseUser,
          user: userProfile,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({
          authUser: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    });

    return unsubscribe;
  },

  checkAuthStatus: () => {
    if (auth.currentUser) {
      set({
        authUser: auth.currentUser,
        isAuthenticated: true,
      });
    } else {
      set({
        authUser: null,
        isAuthenticated: false,
      });
    }
  },
}));

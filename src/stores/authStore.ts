import { create } from 'zustand';
import { AuthState, User } from '../types';

interface AuthStore extends AuthState {
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  
  login: (token, user) => set({ 
    isAuthenticated: true, 
    token, 
    user 
  }),
  
  logout: () => set({ 
    isAuthenticated: false, 
    token: null, 
    user: null 
  }),
  
  updateUser: (userData) => set((state) => ({
    user: state.user ? { ...state.user, ...userData } : null
  })),
}));
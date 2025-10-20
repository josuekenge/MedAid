import { create } from 'zustand';
import { User } from '@/src/types';

interface SessionState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  initialize: () => void;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => {
    console.log('SessionStore: Logging in user', user);
    set({ user, isAuthenticated: true });
    
    // Set cookie for middleware
    if (typeof document !== 'undefined') {
      document.cookie = 'medaid-session=authenticated; path=/; max-age=86400'; // 24 hours
    }
  },
  logout: () => {
    console.log('SessionStore: Logging out');
    set({ user: null, isAuthenticated: false });
    
    // Clear cookie
    if (typeof document !== 'undefined') {
      document.cookie = 'medaid-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  },
  updateUser: (updates) => {
    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, ...updates } });
    }
  },
  initialize: () => {
    // Check if there's a session cookie
    if (typeof document !== 'undefined') {
      const hasSession = document.cookie.includes('medaid-session=authenticated');
      if (hasSession) {
        // Create a demo user for the session
        const demoUser: User = {
          id: 'demo-user',
          email: 'demo@medaid.ca',
          name: 'Demo User',
          role: 'coordinator',
          isActive: true,
          lastLoginAt: new Date(),
          preferences: { theme: 'system', notifications: true, language: 'en' },
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set({ user: demoUser, isAuthenticated: true });
        console.log('SessionStore: Initialized with existing session');
      }
    }
  },
}));

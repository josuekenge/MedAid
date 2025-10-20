import { describe, it, expect, beforeEach } from 'vitest';
import { useThemeStore } from '@/store/theme-store';
import { useSessionStore } from '@/store/session-store';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Theme Store', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default theme', () => {
    const { theme } = useThemeStore.getState();
    expect(theme).toBe('system');
  });

  it('should update theme', () => {
    const { setTheme } = useThemeStore.getState();
    setTheme('dark');
    
    const { theme } = useThemeStore.getState();
    expect(theme).toBe('dark');
  });
});

describe('Session Store', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with no user', () => {
    const { user, isAuthenticated } = useSessionStore.getState();
    expect(user).toBeNull();
    expect(isAuthenticated).toBe(false);
  });

  it('should login user', () => {
    const { login } = useSessionStore.getState();
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'admin' as const,
      isActive: true,
      preferences: { theme: 'light', notifications: true, language: 'en' },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    login(mockUser);
    
    const { user, isAuthenticated } = useSessionStore.getState();
    expect(user).toEqual(mockUser);
    expect(isAuthenticated).toBe(true);
  });

  it('should logout user', () => {
    const { login, logout } = useSessionStore.getState();
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'admin' as const,
      isActive: true,
      preferences: { theme: 'light', notifications: true, language: 'en' },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    login(mockUser);
    logout();
    
    const { user, isAuthenticated } = useSessionStore.getState();
    expect(user).toBeNull();
    expect(isAuthenticated).toBe(false);
  });
});









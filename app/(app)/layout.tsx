'use client';

import { useEffect } from 'react';
import { useSessionStore } from '@/store/session-store';
import { AppSidebar } from '@/components/navigation/app-sidebar';
import { AppTopbar } from '@/components/navigation/app-topbar';
import { useLayoutStore } from '@/store/layout-store';
import ErrorBoundary from '@/components/error-boundary';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { login } = useSessionStore();
  const { sidebarOpen, mobileMenuOpen, setMobileMenuOpen } = useLayoutStore();

  useEffect(() => {
    // Set a demo user for the app immediately
    const demoUser = {
      id: 'demo-user',
      email: 'demo@medaid.ca',
      name: 'Demo Coordinator',
      role: 'coordinator' as const,
      isActive: true,
      lastLoginAt: new Date(),
      preferences: { theme: 'system' as const, notifications: true, language: 'en' },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    login(demoUser);
  }, [login]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white flex">
        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-20 lg:hidden backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <AppSidebar />

        {/* Main content */}
        <div className="flex-1 transition-all duration-300 ease-in-out">
          {/* Top bar */}
          <AppTopbar />

          {/* Page content */}
          <main className="p-8 bg-gray-50 min-h-screen">
            {children}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}

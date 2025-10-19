'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLayoutStore } from '@/store/layout-store';
import { useSessionStore } from '@/store/session-store';
import {
  Search,
  Bell,
  Menu,
  LogOut,
  User,
  Settings,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react';
import { useTheme } from '@/components/providers/theme-provider';

export function AppTopbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { mobileMenuOpen, setMobileMenuOpen, sidebarOpen, setSidebarOpen } = useLayoutStore();
  const { user, logout } = useSessionStore();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleSignOut = () => {
    logout();
    router.push('/sign-in');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden hover:bg-gray-100 rounded-xl h-12 w-12"
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Desktop sidebar toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex hover:bg-gray-100 rounded-xl h-12 w-12"
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search patients, visits, nurses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 w-96 border-gray-200 bg-white text-gray-900 placeholder:text-gray-500 focus:border-primary-500 focus:ring-primary-500 rounded-2xl shadow-sm"
              />
            </div>
          </form>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme('light')}
              className={`h-12 w-12 rounded-xl hover:bg-gray-100 ${theme === 'light' ? 'bg-gray-100' : ''}`}
            >
              <Sun className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme('dark')}
              className={`h-12 w-12 rounded-xl hover:bg-gray-100 ${theme === 'dark' ? 'bg-gray-100' : ''}`}
            >
              <Moon className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme('system')}
              className={`h-12 w-12 rounded-xl hover:bg-gray-100 ${theme === 'system' ? 'bg-gray-100' : ''}`}
            >
              <Monitor className="h-5 w-5" />
            </Button>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-xl hover:bg-gray-100">
            <Bell className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              3
            </Badge>
          </Button>

          {/* User menu */}
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-sm font-bold text-white">
                {user?.name.charAt(0)}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              title="Sign out"
              className="h-12 w-12 rounded-xl hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

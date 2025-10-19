'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useLayoutStore } from '@/store/layout-store';
import { useSessionStore } from '@/store/session-store';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  FileText,
  DollarSign,
  AlertTriangle,
  Settings,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  Home,
  ClipboardList,
  Activity,
  Award,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'coordinator', 'nurse', 'viewer'],
  },
  {
    name: 'Patients',
    href: '/patients',
    icon: Users,
    roles: ['admin', 'coordinator', 'nurse', 'viewer'],
  },
  {
    name: 'Nurses',
    href: '/nurses',
    icon: UserCheck,
    roles: ['admin', 'coordinator'],
  },
  {
    name: 'Visits',
    href: '/visits',
    icon: Calendar,
    roles: ['admin', 'coordinator', 'nurse', 'viewer'],
  },
  {
    name: 'Schedule',
    href: '/schedule',
    icon: ClipboardList,
    roles: ['admin', 'coordinator'],
  },
  {
    name: 'Billing',
    href: '/billing',
    icon: DollarSign,
    roles: ['admin', 'coordinator'],
  },
  {
    name: 'Services',
    href: '/services',
    icon: Activity,
    roles: ['admin', 'coordinator', 'nurse', 'viewer'],
  },
  {
    name: 'Incidents',
    href: '/incidents',
    icon: AlertTriangle,
    roles: ['admin', 'coordinator', 'nurse'],
  },
  {
    name: 'Certifications',
    href: '/certifications',
    icon: Award,
    roles: ['admin', 'coordinator', 'nurse', 'viewer'],
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['admin'],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useLayoutStore();
  const { user } = useSessionStore();

  if (!user) return null;

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className={cn(
        'bg-white border-r border-gray-200 transition-all duration-300 ease-in-out shadow-xl flex-shrink-0',
        sidebarOpen ? 'w-64' : 'w-16'
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className={cn(
              'flex items-center space-x-3 transition-opacity duration-300',
              sidebarOpen ? 'opacity-100' : 'opacity-0 lg:opacity-100'
            )}>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MedAid</span>
            </div>
            <div className="ml-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex hover:bg-gray-100 rounded-xl h-12 w-12"
              >
                {sidebarOpen ? (
                  <ChevronLeft className="h-6 w-6" />
                ) : (
                  <ChevronRight className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 shadow-sm border border-primary-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm',
                    !sidebarOpen && 'lg:justify-center'
                  )}
                >
                  <item.icon className={cn(
                    'h-5 w-5 flex-shrink-0',
                    !sidebarOpen && 'lg:mx-auto'
                  )} />
                  <span className={cn(
                    'ml-3 transition-opacity duration-300',
                    sidebarOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'
                  )}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className={cn(
            'p-6 border-t border-gray-100',
            !sidebarOpen && 'lg:px-2'
          )}>
            <div className={cn(
              'flex items-center space-x-3',
              !sidebarOpen && 'lg:justify-center'
            )}>
              <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-sm font-bold text-white">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className={cn(
                'flex-1 min-w-0 transition-opacity duration-300',
                sidebarOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'
              )}>
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 capitalize font-medium">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:hidden shadow-xl',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MedAid</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="hover:bg-gray-100 rounded-xl h-10 w-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 shadow-sm border border-primary-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="ml-3">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="p-6 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-sm font-bold text-white">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 capitalize font-medium">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

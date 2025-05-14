"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Calculator,
  FileInput,
  ClipboardList,
  Settings,
  HelpCircle,
} from 'lucide-react';

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Leases',
    href: '/dashboard/leases',
    icon: FileText,
  },
  {
    title: 'Upload',
    href: '/dashboard/upload',
    icon: FileInput,
  },
  {
    title: 'Accounting',
    href: '/dashboard/accounting',
    icon: Calculator,
  },
  {
    title: 'Reports',
    href: '/dashboard/reports',
    icon: BarChart3,
  },
  {
    title: 'Audit Logs',
    href: '/dashboard/audit',
    icon: ClipboardList,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    title: 'Help',
    href: '/dashboard/help',
    icon: HelpCircle,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/dashboard')
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'hover:bg-muted'
          )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}
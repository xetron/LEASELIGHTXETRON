import Link from 'next/link';
import { FileText } from 'lucide-react';

interface DashboardHeaderProps {
  children?: React.ReactNode;
}

export function DashboardHeader({ children }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link 
          href="/dashboard" 
          className="flex items-center space-x-2"
        >
          <FileText className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">LeaseLight</span>
        </Link>
        <div className="flex items-center space-x-4">
          {children}
        </div>
      </div>
    </header>
  );
}
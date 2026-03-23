'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const appNavigation = [
    { label: 'Overview', href: '/apps', icon: 'home' },
    { label: 'Hotels', href: '/apps/hotel', icon: 'building' },
    { label: 'Vehicles', href: '/apps/vehicle', icon: 'car' },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <div className="flex flex-col lg:flex-row h-screen lg:h-[calc(100vh-64px)] bg-background">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={cn(
          'bg-sidebar border-r border-sidebar-border/60 overflow-y-auto',
          'fixed lg:relative inset-y-0 left-0 z-50 w-[280px] h-full transition-transform duration-300 ease-out shadow-xl lg:shadow-none',
          'lg:w-[280px] lg:h-[calc(100vh-64px)]',
          sidebarOpen ? 'translate-x-0 block' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between p-5 border-b border-sidebar-border/60 lg:hidden">
          <span className="font-semibold text-sm tracking-tight">Applications</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-sidebar-accent rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="p-5 space-y-1">
          {appNavigation.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  'flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200 relative',
                  isActive(item.href)
                    ? 'bg-primary/10 text-primary font-semibold shadow-sm'
                    : 'hover:bg-sidebar-accent/60 hover:translate-x-0.5'
                )}
              >
                {isActive(item.href) && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-primary rounded-r-full shadow-sm" />
                )}
                <span className="tracking-tight">{item.label}</span>
                {isActive(item.href) && <ChevronRight className="h-4 w-4" />}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 p-4 border-b border-border/60 bg-card/80 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="hover:bg-primary/10 rounded-lg"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-semibold text-sm tracking-tight">Applications</span>
        </div>

        {/* Breadcrumb on Desktop */}
        <div className="hidden lg:block px-8 py-4 border-b border-border/60 bg-card/50">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/apps" className="hover:text-foreground transition-colors">
              Applications
            </Link>
            {pathname !== '/apps' && (
              <>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">
                  {pathname.includes('hotel')
                    ? 'Hotels'
                    : pathname.includes('vehicle')
                    ? 'Vehicles'
                    : ''}
                </span>
              </>
            )}
          </nav>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 md:p-8 max-w-[1400px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}

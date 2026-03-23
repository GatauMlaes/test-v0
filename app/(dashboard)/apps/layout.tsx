'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

export default function AppsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    breadcrumbs.push({ label: 'Dashboard', href: '/dashboard' });
    
    if (segments.includes('apps')) {
      breadcrumbs.push({ label: 'Applications', href: '/apps' });
      
      if (segments.includes('hotel')) {
        breadcrumbs.push({ label: 'Hotels', href: '/apps/hotel' });
        if (segments.includes('create')) {
          breadcrumbs.push({ label: 'Create Hotel', href: null });
        } else if (segments[segments.indexOf('hotel') + 1] && segments[segments.indexOf('hotel') + 1] !== 'create') {
          breadcrumbs.push({ label: 'Hotel Details', href: null });
        }
      } else if (segments.includes('vehicle')) {
        breadcrumbs.push({ label: 'Vehicles', href: '/apps/vehicle' });
        if (segments.includes('create')) {
          breadcrumbs.push({ label: 'Create Vehicle', href: null });
        } else if (segments[segments.indexOf('vehicle') + 1] && segments[segments.indexOf('vehicle') + 1] !== 'create') {
          breadcrumbs.push({ label: 'Vehicle Details', href: null });
        }
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1 text-sm">
        {breadcrumbs.map((crumb, idx) => (
          <div key={idx} className="flex items-center gap-1">
            {idx > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{crumb.label}</span>
            )}
          </div>
        ))}
      </nav>

      {/* Page Content */}
      {children}
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { Building2, Car, Plus, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AppsPage() {
  const router = useRouter();

  const apps = [
    {
      id: 'hotel',
      name: 'Hotels',
      description: 'Manage your hotel listings and accommodations',
      icon: Building2,
      gradient: 'from-blue-500/20 to-blue-600/5',
      border: 'border-blue-200/50 hover:border-blue-300/50',
      badge: 'New',
      href: '/apps/hotel',
    },
    {
      id: 'vehicle',
      name: 'Vehicles',
      description: 'Manage your vehicle listings and rentals',
      icon: Car,
      gradient: 'from-green-500/20 to-green-600/5',
      border: 'border-green-200/50 hover:border-green-300/50',
      href: '/apps/vehicle',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
          Applications
        </h1>
        <p className="text-muted-foreground max-w-xl">
          Manage all your business applications in one place. Create, edit, and monitor your listings.
        </p>
      </div>

      {/* App Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <div
              key={app.id}
              className={`group bg-gradient-to-br ${app.gradient} backdrop-blur-sm border ${app.border} rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer`}
              onClick={() => router.push(app.href)}
            >
              {/* Top Badge */}
              {app.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-600 rounded-full text-xs font-semibold">
                    <Zap className="h-3 w-3" />
                    {app.badge}
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Icon and Title */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-foreground">{app.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {app.description}
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Stats Placeholder */}
                <div className="flex gap-4 text-xs">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Active</span>
                    <span className="text-lg font-semibold text-foreground">--</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Pending</span>
                    <span className="text-lg font-semibold text-foreground">--</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(app.href);
                    }}
                    className="flex-1 h-10 rounded-lg gap-2 border-border/60 hover:border-primary/50"
                  >
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`${app.href}/create`);
                    }}
                    className="flex-1 h-10 rounded-lg gap-2 bg-primary hover:bg-[oklch(0.42_0.18_25)] text-primary-foreground"
                  >
                    <Plus className="h-4 w-4" />
                    Add New
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Getting Started
          </h3>
          <p className="text-sm text-muted-foreground">
            Follow these steps to get the most out of your applications.
          </p>
        </div>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
            <span>
              <strong className="text-foreground">Create listings</strong> - Add your hotels and vehicles to get started
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
            <span>
              <strong className="text-foreground">Upload media</strong> - Add high-quality images and documents for better visibility
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
            <span>
              <strong className="text-foreground">Complete information</strong> - Fill in all required details to activate your listings
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
            <span>
              <strong className="text-foreground">Monitor & update</strong> - Keep your listings up-to-date from the dashboard
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

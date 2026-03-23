'use client';

import { useRouter } from 'next/navigation';
import { Building2, Car, Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AppsPage() {
  const router = useRouter();

  const apps = [
    {
      id: 'hotel',
      name: 'Hotels',
      description: 'Manage your hotel listings and accommodations',
      icon: Building2,
      color: 'from-blue-500 to-blue-600',
      href: '/apps/hotel',
    },
    {
      id: 'vehicle',
      name: 'Vehicles',
      description: 'Manage your vehicle listings and rentals',
      icon: Car,
      color: 'from-green-500 to-green-600',
      href: '/apps/vehicle',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Applications</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Manage your business applications and services
        </p>
      </div>

      {/* App Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <div
              key={app.id}
              className="group bg-card border border-border/60 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-200 hover:shadow-lg"
            >
              {/* Gradient Header */}
              <div className={`h-24 bg-gradient-to-r ${app.color} opacity-90`} />

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground">{app.name}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {app.description}
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => router.push(app.href)}
                    className="flex-1 h-10 rounded-lg gap-2"
                  >
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => router.push(`${app.href}/create`)}
                    className="flex-1 h-10 rounded-lg gap-2"
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

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Getting Started
        </h3>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
            <span>Create a new hotel or vehicle listing to get started</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
            <span>Upload high-quality images and documents for better visibility</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
            <span>Complete all required information to activate your listings</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
            <span>Monitor and update your listings anytime from the dashboard</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

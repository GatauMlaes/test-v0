'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle, Building2, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceholderLogo } from '@/components/common';
import { usePropertyStore, useAuthStore } from '@/store';

export default function DashboardPage() {
  const router = useRouter();
  const { details } = usePropertyStore();
  const { clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border bg-card">
        <div className="h-full px-6 flex items-center justify-between">
          <PlaceholderLogo size="md" />
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Welcome Section */}
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">
              Welcome to Nusago Partner Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your hotel and vehicle listings from one place
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hotels Card */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-200/50 rounded-2xl p-8 hover:border-blue-300/50 transition-colors group cursor-pointer"
              onClick={() => router.push('/apps/hotel')}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Hotels</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your accommodations
                  </p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-white hover:bg-blue-50"
              >
                View Hotels
              </Button>
            </div>

            {/* Vehicles Card */}
            <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-200/50 rounded-2xl p-8 hover:border-green-300/50 transition-colors group cursor-pointer"
              onClick={() => router.push('/apps/vehicle')}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Vehicles</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your rental fleet
                  </p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                  <Car className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-white hover:bg-green-50"
              >
                View Vehicles
              </Button>
            </div>
          </div>

          {/* Registration Summary */}
          {details.name && (
            <div className="bg-card rounded-2xl border border-border/60 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Your Registration
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Primary Property</span>
                  <span className="font-medium">{details.name}</span>
                </div>
                {details.propertyType && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Property Type</span>
                    <span className="font-medium capitalize">
                      {details.propertyType?.replace('_', ' ')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Status</span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-medium">
                    <CheckCircle className="h-4 w-4" />
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PlaceholderLogo } from '@/components/common';
import { usePropertyStore, useAuthStore } from '@/store';

export default function DashboardPage() {
  const router = useRouter();
  const { details, resetProperty } = usePropertyStore();
  const { clearAuth } = useAuthStore();

  // Check if onboarding is complete
  const isOnboardingComplete = details.name && details.propertyType;

  useEffect(() => {
    if (!isOnboardingComplete) {
      router.push('/onboarding/property-details');
    }
  }, [isOnboardingComplete, router]);

  const handleLogout = () => {
    clearAuth();
    resetProperty();
    router.push('/login');
  };

  if (!isOnboardingComplete) {
    return null;
  }

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
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-semibold text-foreground mb-4 text-balance">
            Property Registration Complete!
          </h1>
          <p className="text-muted-foreground mb-8 text-pretty">
            Thank you for registering <strong>{details.name}</strong> with Nusago Partner.
            Your property is now under review. We will notify you once it is approved.
          </p>

          {/* Property Summary */}
          <div className="bg-card rounded-xl border border-border p-6 text-left mb-8">
            <h2 className="text-lg font-medium text-foreground mb-4">
              Registration Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Property Name</span>
                <span className="font-medium">{details.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Property Type</span>
                <span className="font-medium capitalize">
                  {details.propertyType?.replace('_', ' ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="text-amber-600 font-medium">Under Review</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push('/onboarding/property-details')}
            >
              Edit Registration
            </Button>
            <Button
              className="bg-primary hover:bg-[oklch(0.42_0.18_25)] text-primary-foreground"
              onClick={() => {
                resetProperty();
                router.push('/onboarding/property-details');
              }}
            >
              Register Another Property
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

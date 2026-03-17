'use client';

import { DashboardLayout } from '@/components/layout';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

'use client';

import { useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { OnboardingSidebar } from './OnboardingSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex">
        <OnboardingSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        <main className="flex-1 min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}

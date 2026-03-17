'use client';

import Link from 'next/link';
import { PlaceholderLogo } from '@/components/common';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackToLogin?: boolean;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  showBackToLogin = false,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 h-14 md:h-16 flex items-center">
          <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
            <PlaceholderLogo size="md" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-lg border border-border/60 p-6 sm:p-8 md:p-10">
            {/* Title Section */}
            <div className="text-center mb-8 md:mb-10">
              <h1 className="text-xl md:text-2xl font-semibold text-foreground mb-3 text-balance tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Form Content */}
            {children}

            {/* Back to Login Link */}
            {showBackToLogin && (
              <div className="mt-8 text-center">
                <Link
                  href="/login"
                  className="text-sm text-primary hover:text-primary/80 font-semibold transition-colors duration-200"
                >
                  Back to Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-card/95 backdrop-blur-sm py-4 md:py-5">
        <div className="container mx-auto px-4 text-center text-xs md:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Nusago Partner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

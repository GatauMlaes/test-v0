'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
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
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/[0.03] via-transparent to-transparent pointer-events-none" />
      
      {/* Header */}
      <header className="relative border-b border-border/40 bg-card/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 h-14 md:h-16 flex items-center">
          <Link href="/" className="flex items-center transition-all duration-200 hover:opacity-80 hover:scale-[0.98]">
            <PlaceholderLogo size="md" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex-1 flex items-center justify-center p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-[440px]">
          <div className="bg-card rounded-2xl shadow-xl shadow-black/[0.04] border border-border/40 p-6 sm:p-8 md:p-10 backdrop-blur-sm">
            {/* Title Section */}
            <div className="text-center mb-8 md:mb-10">
              <h1 className="text-xl md:text-2xl font-semibold text-foreground mb-3 text-balance tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-muted-foreground text-sm leading-relaxed text-pretty max-w-sm mx-auto">
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
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-semibold transition-colors duration-200 group"
                >
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
                  Back to Login
                </Link>
              </div>
            )}
          </div>
          
          {/* Trust indicators */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground/60">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secure Login
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Data Protected
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border/40 bg-card/80 backdrop-blur-md py-4 md:py-5">
        <div className="container mx-auto px-4 text-center text-xs md:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Nusago Partner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

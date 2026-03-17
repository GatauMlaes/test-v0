'use client';

import Link from 'next/link';
import { ChevronDown, HelpCircle, Globe, Menu } from 'lucide-react';

import { PlaceholderLogo } from '@/components/common';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="h-14 md:h-16 border-b border-border/60 bg-card/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="h-full px-4 md:px-6 lg:px-8 flex items-center justify-between">
        {/* Left Side - Menu + Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-muted/80 transition-colors duration-200"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Logo */}
          <Link href="/onboarding/property-details" className="flex items-center transition-opacity hover:opacity-80">
            <PlaceholderLogo size="md" />
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Support Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1.5 md:gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/80 px-2.5 md:px-3.5 h-9 rounded-lg transition-all duration-200"
              >
                <HelpCircle className="h-4 w-4" />
                <span className="hidden sm:inline text-sm font-medium">Support</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border-border/60">
              <DropdownMenuItem className="rounded-lg cursor-pointer">Help Center</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer">Contact Support</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer">FAQs</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Separator */}
          <div className="hidden md:block w-px h-6 bg-border/60 mx-1" />

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1.5 md:gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/80 px-2.5 md:px-3.5 h-9 rounded-lg transition-all duration-200"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">EN</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border-border/60">
              <DropdownMenuItem className="rounded-lg cursor-pointer">English</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer">Bahasa Indonesia</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer">Thai</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer">Vietnamese</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

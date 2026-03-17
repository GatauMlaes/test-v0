'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePropertyStore } from '@/store';
import { ONBOARDING_STEPS, STEP_ORDER } from '@/lib/constants/onboarding';
import { Button } from '@/components/ui/button';
import type { OnboardingStep } from '@/types/property';

interface NavGroupProps {
  title: string;
  isExpanded: boolean;
  children: React.ReactNode;
  onToggle?: () => void;
}

function NavGroup({ title, isExpanded, children }: NavGroupProps) {
  return (
    <div className="mb-3">
      <div
        className={cn(
          'flex items-center justify-between px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200',
          isExpanded
            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm'
            : 'hover:bg-sidebar-accent/60'
        )}
      >
        <span className="text-sm tracking-tight">{title}</span>
        <ChevronRight
          className={cn(
            'h-4 w-4 transition-transform duration-200 opacity-60',
            isExpanded && 'rotate-90 opacity-100'
          )}
        />
      </div>
      {isExpanded && <div className="mt-2 ml-2 space-y-1">{children}</div>}
    </div>
  );
}

interface NavItemProps {
  step: OnboardingStep;
  label: string;
  href: string;
  isActive: boolean;
  isCompleted: boolean;
  isDisabled: boolean;
}

function NavItem({
  label,
  href,
  isActive,
  isCompleted,
  isDisabled,
}: NavItemProps) {
  const content = (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 relative',
        isActive && 'bg-primary/10 text-primary font-semibold shadow-sm',
        !isActive && !isDisabled && 'hover:bg-sidebar-accent/60 hover:translate-x-0.5',
        isDisabled && 'opacity-40 cursor-not-allowed'
      )}
    >
      {/* Active Indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-primary rounded-r-full shadow-sm" />
      )}
      
      {/* Completion Check */}
      {isCompleted && !isActive && (
        <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 shadow-sm">
          <Check className="h-3 w-3 text-white" strokeWidth={3} />
        </div>
      )}
      
      <span className={cn('tracking-tight', isCompleted && !isActive && 'ml-0')}>{label}</span>
    </div>
  );

  if (isDisabled) {
    return content;
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}

interface OnboardingSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function OnboardingSidebar({ isOpen = false, onClose }: OnboardingSidebarProps) {
  const pathname = usePathname();
  const completedSteps = usePropertyStore((state) => state.completedSteps);

  // Determine current step from pathname
  const currentStepId = pathname.split('/').pop() as OnboardingStep;
  
  // Property Overview steps
  const propertyOverviewSteps = ONBOARDING_STEPS.filter(
    (s) => s.parent === 'property-overview'
  );
  const otherSteps = ONBOARDING_STEPS.filter((s) => !s.parent);

  // Check if any property overview step is active
  const isPropertyOverviewActive = propertyOverviewSteps.some(
    (s) => s.id === currentStepId
  );

  const getStepIndex = (stepId: OnboardingStep) => STEP_ORDER.indexOf(stepId);
  const currentStepIndex = getStepIndex(currentStepId);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'bg-sidebar border-r border-sidebar-border/60 overflow-y-auto',
          // Desktop: static sidebar
          'hidden lg:block lg:w-[280px] lg:h-[calc(100vh-64px)]',
          // Mobile: slide-in drawer
          'fixed lg:relative inset-y-0 left-0 z-50 w-[300px] h-full transition-transform duration-300 ease-out shadow-xl lg:shadow-none',
          isOpen ? 'translate-x-0 block' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between p-5 border-b border-sidebar-border/60 lg:hidden">
          <span className="font-semibold text-sm tracking-tight">Navigation</span>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-sidebar-accent rounded-lg transition-colors">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-5">
          {/* Property Overview Group */}
          <NavGroup title="Property Overview" isExpanded={isPropertyOverviewActive}>
          {propertyOverviewSteps.map((step) => {
            const stepIndex = getStepIndex(step.id);
            const isCompleted = completedSteps.includes(step.id);
            const isDisabled = stepIndex > currentStepIndex && !isCompleted;

            return (
              <NavItem
                key={step.id}
                step={step.id}
                label={step.label}
                href={step.path}
                isActive={step.id === currentStepId}
                isCompleted={isCompleted}
                isDisabled={isDisabled}
              />
            );
          })}
        </NavGroup>

        {/* Other Steps */}
        {otherSteps.map((step) => {
          const stepIndex = getStepIndex(step.id);
          const isCompleted = completedSteps.includes(step.id);
          const isDisabled = stepIndex > currentStepIndex && !isCompleted;
          const isActive = step.id === currentStepId;

          return (
            <div key={step.id} className="mb-2">
              {isDisabled ? (
                <div className="flex items-center justify-between px-4 py-3 rounded-lg opacity-50 cursor-not-allowed">
                  <span className="text-sm">{step.label}</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              ) : (
                <Link href={step.path}>
                  <div
                    className={cn(
                      'flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors relative',
                      isActive
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'hover:bg-sidebar-accent/50'
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                    )}
                    <div className="flex items-center gap-3">
                      {isCompleted && !isActive && (
                        <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                      <span className="text-sm">{step.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </Link>
              )}
            </div>
          );
        })}
        </nav>
      </aside>
    </>
  );
}

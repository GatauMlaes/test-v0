'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import type { OnboardingStep } from '@/types/property';
import { getNextStep, getPreviousStep, getStepConfig } from '@/lib/constants/onboarding';

interface StickyActionBarProps {
  currentStep: OnboardingStep;
  onSave: () => void;
  isLoading?: boolean;
  isValid?: boolean;
}

export function StickyActionBar({
  currentStep,
  onSave,
  isLoading = false,
  isValid = true,
}: StickyActionBarProps) {
  const router = useRouter();
  
  const previousStep = getPreviousStep(currentStep);
  const nextStep = getNextStep(currentStep);
  const previousStepConfig = previousStep ? getStepConfig(previousStep) : null;
  
  const isLastStep = !nextStep;

  const handleBack = () => {
    if (previousStepConfig) {
      router.push(previousStepConfig.path);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="sticky bottom-0 bg-card/95 backdrop-blur-sm border-t border-border/60 px-4 md:px-6 lg:px-8 py-4 md:py-5 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)]">
      <div className="max-w-[900px] mx-auto flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        {/* Back Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={isLoading}
          className="border-primary/80 text-primary hover:bg-primary/5 hover:border-primary h-11 sm:h-11 px-6 w-full sm:w-auto rounded-xl font-semibold transition-all duration-200 active:scale-[0.98]"
        >
          {previousStep ? 'Back' : 'Back to Nusago'}
        </Button>

        {/* Save and Continue Button */}
        <Button
          type="button"
          onClick={onSave}
          disabled={isLoading || !isValid}
          className="bg-primary hover:bg-[oklch(0.42_0.18_25)] text-primary-foreground px-8 md:px-10 h-11 sm:h-11 w-full sm:w-auto rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
        >
          {isLoading ? (
            <>
              <Spinner className="mr-2" />
              Saving...
            </>
          ) : isLastStep ? (
            'Submit'
          ) : (
            'Save and Continue'
          )}
        </Button>
      </div>
    </div>
  );
}

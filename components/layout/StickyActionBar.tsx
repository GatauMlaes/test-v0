'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
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
    <div className="sticky bottom-0 bg-card/98 backdrop-blur-md border-t border-border/50 px-4 md:px-6 lg:px-8 py-4 md:py-5 shadow-[0_-8px_30px_-8px_rgba(0,0,0,0.08)]">
      <div className="max-w-[900px] mx-auto flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        {/* Back Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={isLoading}
          className="border-border hover:border-primary/50 text-foreground hover:text-primary hover:bg-primary/5 h-11 sm:h-12 px-5 sm:px-6 w-full sm:w-auto rounded-xl font-medium transition-all duration-200 active:scale-[0.98] group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
          {previousStep ? 'Back' : 'Exit'}
        </Button>

        {/* Save and Continue Button */}
        <Button
          type="button"
          onClick={onSave}
          disabled={isLoading || !isValid}
          className="bg-primary hover:bg-[oklch(0.42_0.18_25)] text-primary-foreground px-6 sm:px-8 md:px-10 h-11 sm:h-12 w-full sm:w-auto rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Spinner className="mr-2" />
              Saving...
            </>
          ) : isLastStep ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Submit Application
            </>
          ) : (
            <>
              Save and Continue
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

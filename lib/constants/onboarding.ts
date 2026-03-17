import type { OnboardingStep, OnboardingStepConfig } from '@/types/property';

export const ONBOARDING_STEPS: OnboardingStepConfig[] = [
  {
    id: 'property-details',
    label: 'Property Details',
    path: '/onboarding/property-details',
    parent: 'property-overview',
  },
  {
    id: 'property-address',
    label: 'Property Address',
    path: '/onboarding/property-address',
    parent: 'property-overview',
  },
  {
    id: 'property-contact',
    label: 'Property Contact',
    path: '/onboarding/property-contact',
    parent: 'property-overview',
  },
  {
    id: 'management',
    label: 'Management',
    path: '/onboarding/management',
  },
  {
    id: 'payment',
    label: 'Payment',
    path: '/onboarding/payment',
  },
  {
    id: 'contract',
    label: 'Contract',
    path: '/onboarding/contract',
  },
];

export const STEP_ORDER: OnboardingStep[] = [
  'property-details',
  'property-address',
  'property-contact',
  'management',
  'payment',
  'contract',
];

export function getNextStep(currentStep: OnboardingStep): OnboardingStep | null {
  const currentIndex = STEP_ORDER.indexOf(currentStep);
  if (currentIndex === -1 || currentIndex === STEP_ORDER.length - 1) {
    return null;
  }
  return STEP_ORDER[currentIndex + 1];
}

export function getPreviousStep(currentStep: OnboardingStep): OnboardingStep | null {
  const currentIndex = STEP_ORDER.indexOf(currentStep);
  if (currentIndex <= 0) {
    return null;
  }
  return STEP_ORDER[currentIndex - 1];
}

export function getStepConfig(step: OnboardingStep): OnboardingStepConfig | undefined {
  return ONBOARDING_STEPS.find((s) => s.id === step);
}

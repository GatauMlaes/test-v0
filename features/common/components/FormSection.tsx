'use client';

import { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function FormSection({
  title,
  description,
  children,
  className = '',
}: FormSectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
}

export function StepIndicator({
  currentStep,
  totalSteps,
  stepNames,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {stepNames.map((name, index) => (
        <div key={name} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200 ${
                index < currentStep
                  ? 'bg-green-500 text-white'
                  : index === currentStep
                    ? 'bg-primary text-primary-foreground ring-2 ring-primary/30'
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
            <span
              className={`text-xs font-medium mt-2 text-center transition-colors ${
                index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {name}
            </span>
          </div>

          {index < totalSteps - 1 && (
            <div
              className={`flex-1 h-1 mx-2 rounded-full transition-colors duration-200 ${
                index < currentStep ? 'bg-green-500' : 'bg-muted'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

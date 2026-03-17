'use client';

import { Suspense } from 'react';
import { AuthLayout } from '@/components/layout';
import { RegisterCompleteForm } from '@/features/auth/components';
import { Spinner } from '@/components/ui/spinner';

function RegisterCompleteFormWrapper() {
  return <RegisterCompleteForm />;
}

export default function RegisterCompletePage() {
  return (
    <AuthLayout
      title="Complete Your Registration"
      subtitle="Set up your profile and create a password"
      showBackToLogin
    >
      <Suspense
        fallback={
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        }
      >
        <RegisterCompleteFormWrapper />
      </Suspense>
    </AuthLayout>
  );
}

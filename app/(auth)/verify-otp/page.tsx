'use client';

import { Suspense } from 'react';
import { AuthLayout } from '@/components/layout';
import { OtpForm } from '@/features/auth/components';
import { Spinner } from '@/components/ui/spinner';

function OtpFormWrapper() {
  return <OtpForm />;
}

export default function VerifyOtpPage() {
  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="Enter the 6-digit code sent to your email"
      showBackToLogin
    >
      <Suspense
        fallback={
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        }
      >
        <OtpFormWrapper />
      </Suspense>
    </AuthLayout>
  );
}

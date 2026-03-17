'use client';

import { Suspense } from 'react';
import { AuthLayout } from '@/components/layout';
import { ResetPasswordForm } from '@/features/auth/components';
import { Spinner } from '@/components/ui/spinner';

function ResetPasswordFormWrapper() {
  return <ResetPasswordForm />;
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Create a new secure password for your account"
      showBackToLogin
    >
      <Suspense
        fallback={
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        }
      >
        <ResetPasswordFormWrapper />
      </Suspense>
    </AuthLayout>
  );
}

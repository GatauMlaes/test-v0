'use client';

import { AuthLayout } from '@/components/layout';
import { ForgotPasswordForm } from '@/features/auth/components';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot Your Password?"
      subtitle="Enter your email and we'll send you a reset link"
      showBackToLogin
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

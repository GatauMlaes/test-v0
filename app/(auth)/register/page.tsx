'use client';

import { AuthLayout } from '@/components/layout';
import { RegisterStepOneForm } from '@/features/auth/components';

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Enter your email to get started with Nusago Partner"
    >
      <RegisterStepOneForm />
    </AuthLayout>
  );
}

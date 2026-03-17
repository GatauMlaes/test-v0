'use client';

import { AuthLayout } from '@/components/layout';
import { LoginForm } from '@/features/auth/components';

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your Nusago Partner account to continue"
    >
      <LoginForm />
    </AuthLayout>
  );
}

'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '../services';
import { useAuthStore } from '@/store';
import { getDeviceId } from '@/lib/utils/device';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse, OAuthProvider, UserRole } from '@/types/api';

export function useRegisterStepOne() {
  const setRegistrationEmail = useAuthStore((state) => state.setRegistrationEmail);

  return useMutation({
    mutationFn: (email: string) => authService.registerStepOne({ email }),
    onSuccess: (_, email) => {
      setRegistrationEmail(email);
    },
  });
}

export function useRegisterStepTwo() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: { name: string; email: string; password: string }) =>
      authService.registerStepTwo(data),
    onSuccess: (user) => {
      setUser(user);
      router.push('/login');
    },
  });
}

export function useSendOtp() {
  return useMutation({
    mutationFn: (email: string) => authService.sendOtp({ email }),
  });
}

export function useVerifyOtp() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { otp: string; email: string }) => authService.verifyOtp(data),
    onSuccess: () => {
      router.push('/register/complete');
    },
  });
}

export function useLogin() {
  const router = useRouter();
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      authService.login(data.email, data.password),
    onSuccess: (response) => {
      setTokens(response.access_token, response.refresh_token);
      router.push('/onboarding/property-details');
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearAuth();
      router.push('/login');
    },
    onError: () => {
      // Even if logout fails, clear local auth state
      clearAuth();
      router.push('/login');
    },
  });
}

export function useOAuthLogin() {
  const router = useRouter();
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: ({ 
      provider, 
      role, 
      code 
    }: { 
      provider: OAuthProvider; 
      role: UserRole; 
      code: string;
    }) => {
      const deviceId = getDeviceId();
      return authService.oauthLogin(provider, role, { code, device_id: deviceId });
    },
    onSuccess: (response) => {
      setTokens(response.access_token, response.refresh_token);
      router.push('/onboarding/property-details');
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword({ email }),
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: {
      email: string;
      password: string;
      confirmPassword: string;
      token: string;
    }) =>
      authService.resetPassword({
        email: data.email,
        password: data.password,
        confirm_password: data.confirmPassword,
        token: data.token,
      }),
    onSuccess: () => {
      router.push('/login');
    },
  });
}

// Helper to extract error message from API response
export function getApiErrorMessage(error: unknown): string {
  const axiosError = error as AxiosError<ApiErrorResponse>;
  if (axiosError.response?.data?.errors?.[0]?.details) {
    return axiosError.response.data.errors[0].details;
  }
  if (axiosError.response?.data?.errors?.[0]?.title) {
    return axiosError.response.data.errors[0].title;
  }
  return 'An unexpected error occurred. Please try again.';
}

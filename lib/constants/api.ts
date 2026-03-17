export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  // Auth
  REGISTER_STEP_ONE: '/api/v1/auth/register/step-one',
  REGISTER_STEP_TWO: '/api/v1/auth/register/step-two',
  OTP_SEND: '/api/v1/auth/otp/send',
  OTP_VERIFY: '/api/v1/auth/otp/verify',
  LOGIN: '/api/v1/auth/login',
  OAUTH_LOGIN: (provider: string, role: string) => `/api/v1/auth/login/${provider}/${role}`,
  REFRESH_TOKEN: '/api/v1/auth/token/refresh',
  LOGOUT: '/api/v1/auth/logout',
  FORGOT_PASSWORD: '/api/v1/auth/password/forgot',
  RESET_PASSWORD: '/api/v1/auth/password/reset',
} as const;

export const TOKEN_KEYS = {
  ACCESS_TOKEN: 'nusago_access_token',
  REFRESH_TOKEN: 'nusago_refresh_token',
} as const;

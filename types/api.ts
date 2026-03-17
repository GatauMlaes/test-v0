// API Response Types
export interface ApiResponse<T> {
  title: string;
  status: string;
  code: number;
  meta: unknown[];
  data: T;
}

export interface ApiError {
  title: string;
  details: string;
  code: number;
  status: string;
  meta: unknown[];
}

export interface ApiErrorResponse {
  errors: ApiError[];
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'partner';
  email_verified: boolean;
  social_accounts: string[];
  created_at: string;
  updated_at: string;
}

// Auth Request Types
export interface RegisterStepOneRequest {
  email: string;
}

export interface RegisterStepTwoRequest {
  name: string;
  email: string;
  password: string;
}

export interface OtpSendRequest {
  email: string;
}

export interface OtpVerifyRequest {
  otp: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  confirm_password: string;
  device_id: string;
}

export interface OAuthLoginRequest {
  code: string;
  device_id: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
  device_id: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
  confirm_password: string;
  token: string;
}

// Auth Response Types
export interface RegisterStepOneResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  email_verified: boolean;
  social_accounts: string[];
  created_at: string;
  updated_at: string;
}

export interface RegisterStepTwoResponse extends RegisterStepOneResponse {}

export interface OtpSendResponse {
  message: string;
}

export interface OtpVerifyResponse {
  message: string;
  user: {
    email: string;
  };
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  access_token_expires_in: number;
  refresh_token_expires_in: number;
}

export interface RefreshTokenResponse extends LoginResponse {}

export interface ForgotPasswordResponse {
  message: string;
  user: {
    email: string;
  };
}

export interface ResetPasswordResponse {
  message: string;
  user: {
    email: string;
  };
}

// OAuth Types
export type OAuthProvider = 'google' | 'facebook';
export type UserRole = 'user' | 'partner';

// OAuth Config
export interface OAuthConfig {
  provider: OAuthProvider;
  clientId: string;
  redirectUri: string;
  scope: string;
  authUrl: string;
}

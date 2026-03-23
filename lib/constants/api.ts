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
  
  // File Management (from api-docs.yml)
  UPLOAD_IMAGE: '/api/v1/uploads/images',
  DELETE_IMAGE: '/api/v1/uploads/images',
  UPLOAD_DOCUMENT: '/api/v1/uploads/documents',
  DELETE_DOCUMENT: '/api/v1/uploads/documents',
  
  // Hotel Application Management
  HOTELS_LIST: '/api/v1/hotels',
  HOTEL_DETAIL: (id: string) => `/api/v1/hotels/${id}`,
  HOTEL_CREATE: '/api/v1/hotels',
  HOTEL_UPDATE: (id: string) => `/api/v1/hotels/${id}`,
  HOTEL_DELETE: (id: string) => `/api/v1/hotels/${id}`,
  
  // Vehicle Management
  VEHICLES_LIST: '/api/v1/vehicles',
  VEHICLE_DETAIL: (id: string) => `/api/v1/vehicles/${id}`,
  VEHICLE_CREATE: '/api/v1/vehicles',
  VEHICLE_UPDATE: (id: string) => `/api/v1/vehicles/${id}`,
  VEHICLE_DELETE: (id: string) => `/api/v1/vehicles/${id}`,
} as const;

export const TOKEN_KEYS = {
  ACCESS_TOKEN: 'nusago_access_token',
  REFRESH_TOKEN: 'nusago_refresh_token',
} as const;

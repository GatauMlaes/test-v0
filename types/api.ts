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

// Pagination Types
export interface PaginationMeta {
  page: number;
  size: number;
  total: number;
  total_pages: number;
}

export interface PaginatedResponse<T> {
  title: string;
  status: string;
  code: number;
  meta: PaginationMeta;
  data: T[];
}

// Hotel Types
export interface HotelAmenity {
  id: string;
  name: string;
}

export interface HotelRoom {
  id: string;
  room_type: string;
  total_rooms: number;
  price_per_night: number;
  bed_type: string;
  capacity: number;
}

export interface HotelAsset {
  id: string;
  file_path: string;
  file_type: 'image' | 'document';
  file_size: number;
  accessibility: 'public' | 'private';
  uploaded_at: string;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  country: string;
  province: string;
  city: string;
  address: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  website: string;
  check_in_time: string;
  check_out_time: string;
  amenities: HotelAmenity[];
  rooms: HotelRoom[];
  assets: HotelAsset[];
  created_at: string;
  updated_at: string;
}

export interface CreateHotelRequest {
  name: string;
  description: string;
  country: string;
  province: string;
  city: string;
  address: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  website: string;
  check_in_time: string;
  check_out_time: string;
  amenities?: { id: string; name: string }[];
  rooms?: Array<{
    room_type: string;
    total_rooms: number;
    price_per_night: number;
    bed_type: string;
    capacity: number;
  }>;
}

export interface UpdateHotelRequest extends Partial<CreateHotelRequest> {}

// Vehicle Types
export interface VehicleSpecification {
  id: string;
  key: string;
  value: string;
}

export interface VehicleAsset {
  id: string;
  file_path: string;
  file_type: 'image' | 'document';
  file_size: number;
  accessibility: 'public' | 'private';
  uploaded_at: string;
}

export interface Vehicle {
  id: string;
  type: 'car' | 'motorcycle' | 'van' | 'bus';
  brand: string;
  model: string;
  year: number;
  color: string;
  license_plate: string;
  capacity: number;
  price_per_day: number;
  description: string;
  country: string;
  province: string;
  city: string;
  address: string;
  postal_code: string;
  phone: string;
  email: string;
  specifications: VehicleSpecification[];
  assets: VehicleAsset[];
  created_at: string;
  updated_at: string;
}

export interface CreateVehicleRequest {
  type: 'car' | 'motorcycle' | 'van' | 'bus';
  brand: string;
  model: string;
  year: number;
  color: string;
  license_plate: string;
  capacity: number;
  price_per_day: number;
  description: string;
  country: string;
  province: string;
  city: string;
  address: string;
  postal_code: string;
  phone: string;
  email: string;
  specifications?: Array<{
    key: string;
    value: string;
  }>;
}

export interface UpdateVehicleRequest extends Partial<CreateVehicleRequest> {}

// File Upload Types - Updated from api-docs.yml
export interface FileUploadResponse {
  filename: string;
  folder: 'images/avatars' | 'images/hotels' | 'images/vehicles/units' | 'documents/hotels' | 'documents/vehicles';
  accessibility: 'public' | 'private';
  url: string;
}

export interface FileDeleteRequest {
  filename: string;
  folder: 'images/avatars' | 'images/hotels' | 'images/vehicles/units' | 'documents/hotels' | 'documents/vehicles';
  accessibility: 'public' | 'private';
}

export interface FileDeleteResponse {
  deleted: boolean;
}

import { apiClient, setTokens, clearTokens } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants/api';
import { getDeviceId } from '@/lib/utils/device';
import type {
  ApiResponse,
  RegisterStepOneRequest,
  RegisterStepOneResponse,
  RegisterStepTwoRequest,
  RegisterStepTwoResponse,
  OtpSendRequest,
  OtpSendResponse,
  OtpVerifyRequest,
  OtpVerifyResponse,
  LoginRequest,
  LoginResponse,
  OAuthLoginRequest,
  OAuthProvider,
  UserRole,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '@/types/api';

/**
 * Auth Service - handles all authentication API calls
 */
export const authService = {
  /**
   * Register Step One - Submit email to receive OTP
   */
  async registerStepOne(data: RegisterStepOneRequest): Promise<RegisterStepOneResponse> {
    const response = await apiClient.post<ApiResponse<RegisterStepOneResponse>>(
      API_ENDPOINTS.REGISTER_STEP_ONE,
      data
    );
    return response.data.data;
  },

  /**
   * Register Step Two - Complete registration with name and password
   */
  async registerStepTwo(data: RegisterStepTwoRequest): Promise<RegisterStepTwoResponse> {
    const response = await apiClient.post<ApiResponse<RegisterStepTwoResponse>>(
      API_ENDPOINTS.REGISTER_STEP_TWO,
      data
    );
    return response.data.data;
  },

  /**
   * Send OTP to email
   */
  async sendOtp(data: OtpSendRequest): Promise<OtpSendResponse> {
    const response = await apiClient.post<ApiResponse<OtpSendResponse>>(
      API_ENDPOINTS.OTP_SEND,
      data
    );
    return response.data.data;
  },

  /**
   * Verify OTP code
   */
  async verifyOtp(data: OtpVerifyRequest): Promise<OtpVerifyResponse> {
    const response = await apiClient.post<ApiResponse<OtpVerifyResponse>>(
      API_ENDPOINTS.OTP_VERIFY,
      data
    );
    return response.data.data;
  },

  /**
   * Login with email and password
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    const deviceId = getDeviceId();
    const loginData: LoginRequest = {
      email,
      password,
      confirm_password: password,
      device_id: deviceId,
    };

    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.LOGIN,
      loginData
    );

    const { access_token, refresh_token } = response.data.data;
    setTokens(access_token, refresh_token);

    return response.data.data;
  },

  /**
   * OAuth Login (Google, GitHub)
   */
  async oauthLogin(
    provider: OAuthProvider,
    role: UserRole,
    data: OAuthLoginRequest
  ): Promise<LoginResponse> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.OAUTH_LOGIN(provider, role),
      data
    );

    const { access_token, refresh_token } = response.data.data;
    setTokens(access_token, refresh_token);

    return response.data.data;
  },

  /**
   * Logout - revoke current session
   */
  async logout(): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.LOGOUT);
    } finally {
      clearTokens();
    }
  },

  /**
   * Forgot Password - send reset link
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const response = await apiClient.post<ApiResponse<ForgotPasswordResponse>>(
      API_ENDPOINTS.FORGOT_PASSWORD,
      data
    );
    return response.data.data;
  },

  /**
   * Reset Password - set new password
   */
  async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const response = await apiClient.post<ApiResponse<ResetPasswordResponse>>(
      API_ENDPOINTS.RESET_PASSWORD,
      data
    );
    return response.data.data;
  },
};

export default authService;

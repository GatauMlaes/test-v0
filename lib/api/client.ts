import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_ENDPOINTS, TOKEN_KEYS } from '@/lib/constants/api';
import { getDeviceId } from '@/lib/utils/device';
import { handleApiError } from '@/lib/services/errorHandler';
import { notification } from '@/lib/services/notification';
import type { ApiErrorResponse, RefreshTokenResponse, ApiResponse } from '@/types/api';

// Configuration for global error handling
interface ApiClientConfig {
  showGlobalErrors?: boolean;
}

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Track refresh state to handle concurrent requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Helper functions for token management
export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
};

export const setTokens = (accessToken: string, refreshToken: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
};

export const clearTokens = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
};

// Request interceptor - attach access token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors and token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      _skipGlobalErrorHandler?: boolean;
    };

    // If no config or already retried, handle error and reject
    if (!originalRequest || originalRequest._retry) {
      // Show global error notification unless explicitly disabled
      if (!originalRequest?._skipGlobalErrorHandler) {
        handleGlobalError(error);
      }
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      const refreshToken = getRefreshToken();

      // No refresh token available, redirect to login
      if (!refreshToken) {
        clearTokens();
        notification.warning('Your session has expired. Please sign in again.');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const deviceId = getDeviceId();
        const response = await axios.post<ApiResponse<RefreshTokenResponse>>(
          `${API_BASE_URL}${API_ENDPOINTS.REFRESH_TOKEN}`,
          {
            refresh_token: refreshToken,
            device_id: deviceId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );

        const { access_token, refresh_token } = response.data.data;
        setTokens(access_token, refresh_token);

        // Process queued requests
        processQueue(null, access_token);

        // Retry original request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        processQueue(refreshError as Error, null);
        clearTokens();
        notification.warning('Your session has expired. Please sign in again.');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other HTTP errors with global error handler
    if (!originalRequest._skipGlobalErrorHandler) {
      handleGlobalError(error);
    }

    return Promise.reject(error);
  }
);

/**
 * Handle global errors based on HTTP status codes
 */
function handleGlobalError(error: AxiosError<ApiErrorResponse>) {
  const status = error.response?.status;
  
  // Don't show notifications for certain status codes that are handled elsewhere
  // 401 is handled above, 422 validation errors are typically handled by forms
  if (status === 401 || status === 422) {
    return;
  }

  // Use the centralized error handler for all other errors
  handleApiError(error);
}

/**
 * Create a request config that skips global error handling
 * Useful when you want to handle errors locally in a component
 */
export function withLocalErrorHandling() {
  return {
    _skipGlobalErrorHandler: true,
  };
}

export default apiClient;

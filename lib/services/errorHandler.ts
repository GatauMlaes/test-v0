import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types/api';
import { notification } from './notification';

/**
 * User-friendly error messages mapping
 * Maps HTTP status codes and error types to clear, actionable messages
 */
const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: 'The request could not be processed. Please check your input and try again.',
  401: 'Your session has expired. Please sign in again.',
  403: 'You do not have permission to perform this action.',
  404: 'The requested resource could not be found.',
  408: 'The request timed out. Please try again.',
  409: 'A conflict occurred. The resource may have been modified.',
  422: 'Please check your input and correct any errors.',
  429: 'Too many requests. Please wait a moment and try again.',
  500: 'Something went wrong on our end. Please try again later.',
  502: 'Service temporarily unavailable. Please try again later.',
  503: 'Service is currently unavailable. Please try again later.',
  504: 'The request timed out. Please try again.',
};

/**
 * Default error message when no specific message is available
 */
const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.';

/**
 * Network error message
 */
const NETWORK_ERROR_MESSAGE = 'Unable to connect. Please check your internet connection.';

/**
 * Extracts a user-friendly error message from various error types
 */
export function getErrorMessage(error: unknown): string {
  // Handle Axios errors
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    
    // Network error (no response)
    if (!axiosError.response) {
      return NETWORK_ERROR_MESSAGE;
    }

    const { status, data } = axiosError.response;

    // Try to get message from API response
    if (data?.message) {
      return normalizeErrorMessage(data.message);
    }

    // Try to get first validation error message
    if (data?.errors && typeof data.errors === 'object') {
      const firstError = Object.values(data.errors)[0];
      if (Array.isArray(firstError) && firstError.length > 0) {
        return normalizeErrorMessage(firstError[0]);
      }
      if (typeof firstError === 'string') {
        return normalizeErrorMessage(firstError);
      }
    }

    // Fall back to HTTP status message
    return HTTP_ERROR_MESSAGES[status] || DEFAULT_ERROR_MESSAGE;
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return normalizeErrorMessage(error.message);
  }

  // Handle string errors
  if (typeof error === 'string') {
    return normalizeErrorMessage(error);
  }

  return DEFAULT_ERROR_MESSAGE;
}

/**
 * Extracts validation errors from API response
 * Returns a map of field names to error messages
 */
export function getValidationErrors(error: unknown): Record<string, string> {
  if (!isAxiosError(error)) {
    return {};
  }

  const axiosError = error as AxiosError<ApiErrorResponse>;
  const errors = axiosError.response?.data?.errors;

  if (!errors || typeof errors !== 'object') {
    return {};
  }

  const validationErrors: Record<string, string> = {};

  for (const [field, messages] of Object.entries(errors)) {
    if (Array.isArray(messages) && messages.length > 0) {
      validationErrors[field] = normalizeErrorMessage(messages[0]);
    } else if (typeof messages === 'string') {
      validationErrors[field] = normalizeErrorMessage(messages);
    }
  }

  return validationErrors;
}

/**
 * Handles API errors globally
 * Shows appropriate notifications based on error type
 */
export function handleApiError(error: unknown, options?: { silent?: boolean }): void {
  if (options?.silent) {
    return;
  }

  const message = getErrorMessage(error);
  
  // Check for specific status codes that need special handling
  if (isAxiosError(error)) {
    const status = (error as AxiosError).response?.status;
    
    switch (status) {
      case 401:
        notification.warning(message, {
          action: {
            label: 'Sign In',
            onClick: () => {
              if (typeof window !== 'undefined') {
                window.location.href = '/login';
              }
            },
          },
        });
        return;
      case 403:
        notification.error(message, {
          title: 'Access Denied',
        });
        return;
      case 429:
        notification.warning(message, {
          title: 'Rate Limited',
        });
        return;
      case 500:
      case 502:
      case 503:
      case 504:
        notification.error(message, {
          title: 'Server Error',
          action: {
            label: 'Retry',
            onClick: () => {
              if (typeof window !== 'undefined') {
                window.location.reload();
              }
            },
          },
        });
        return;
      default:
        notification.error(message);
    }
  } else {
    notification.error(message);
  }
}

/**
 * Normalizes error messages for user display
 * - Capitalizes first letter
 * - Adds period if missing
 * - Removes technical jargon
 */
function normalizeErrorMessage(message: string): string {
  if (!message) return DEFAULT_ERROR_MESSAGE;

  let normalized = message.trim();

  // Remove common technical prefixes
  normalized = normalized
    .replace(/^(error:?\s*)/i, '')
    .replace(/^(exception:?\s*)/i, '')
    .replace(/^(failed:?\s*)/i, '');

  // Capitalize first letter
  normalized = normalized.charAt(0).toUpperCase() + normalized.slice(1);

  // Add period if missing
  if (!/[.!?]$/.test(normalized)) {
    normalized += '.';
  }

  return normalized;
}

/**
 * Type guard to check if error is an Axios error
 */
function isAxiosError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as AxiosError).isAxiosError === true
  );
}

// Export utilities
export const errorHandler = {
  getMessage: getErrorMessage,
  getValidationErrors,
  handle: handleApiError,
};

export default errorHandler;

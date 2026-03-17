import { toast } from 'sonner';

/**
 * Global Notification Service
 * 
 * Centralized notification system that can be called from anywhere:
 * - Components
 * - Hooks
 * - API services
 * - Authentication flow
 * - Form submission handlers
 */

export interface NotificationOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Show success notification
 */
export function showSuccess(message: string, options?: NotificationOptions) {
  toast.success(options?.title || message, {
    description: options?.title ? message : options?.description,
    duration: options?.duration ?? 4000,
    action: options?.action
      ? {
          label: options.action.label,
          onClick: options.action.onClick,
        }
      : undefined,
  });
}

/**
 * Show error notification
 */
export function showError(message: string, options?: NotificationOptions) {
  toast.error(options?.title || message, {
    description: options?.title ? message : options?.description,
    duration: options?.duration ?? 5000,
    action: options?.action
      ? {
          label: options.action.label,
          onClick: options.action.onClick,
        }
      : undefined,
  });
}

/**
 * Show warning notification
 */
export function showWarning(message: string, options?: NotificationOptions) {
  toast.warning(options?.title || message, {
    description: options?.title ? message : options?.description,
    duration: options?.duration ?? 4500,
    action: options?.action
      ? {
          label: options.action.label,
          onClick: options.action.onClick,
        }
      : undefined,
  });
}

/**
 * Show info notification
 */
export function showInfo(message: string, options?: NotificationOptions) {
  toast.info(options?.title || message, {
    description: options?.title ? message : options?.description,
    duration: options?.duration ?? 4000,
    action: options?.action
      ? {
          label: options.action.label,
          onClick: options.action.onClick,
        }
      : undefined,
  });
}

/**
 * Show loading notification with promise
 */
export function showLoading<T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: Error) => string);
  }
) {
  return toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error,
  });
}

/**
 * Dismiss all notifications
 */
export function dismissAll() {
  toast.dismiss();
}

/**
 * Dismiss specific notification by id
 */
export function dismiss(toastId: string | number) {
  toast.dismiss(toastId);
}

// Export as a unified service object
export const notification = {
  success: showSuccess,
  error: showError,
  warning: showWarning,
  info: showInfo,
  loading: showLoading,
  dismissAll,
  dismiss,
};

export default notification;

const DEVICE_ID_KEY = 'nusago_device_id';

/**
 * Get or create a unique device ID for authentication.
 * The device ID persists in localStorage and is reused for all future requests.
 */
export function getDeviceId(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const existing = localStorage.getItem(DEVICE_ID_KEY);

  if (existing) {
    return existing;
  }

  const newId = crypto.randomUUID();
  localStorage.setItem(DEVICE_ID_KEY, newId);

  return newId;
}

/**
 * Clear the device ID from storage (used on logout or when needed)
 */
export function clearDeviceId(): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(DEVICE_ID_KEY);
}

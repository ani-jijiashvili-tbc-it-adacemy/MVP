import { environment } from '../../../environments/environment';
export const API_CONFIG = {
  BASE_URL: environment.apiUrl,
  TIMEOUT: 30000,
} as const;


export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    ME: '/api/auth/me',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    SEND_OTP: '/api/auth/send-otp',
    VERIFY_OTP: '/api/auth/verify-otp',
  },
  ADMIN: {
    EVENTS: '/api/events',
    EVENT_BY_ID: (id: number) => `/api/events/${id}`,
    REGISTRATIONS: (eventId: number) => `/api/events/${eventId}/registrations`,
    PROMOTE_WAITLIST: (eventId: number, registrationId: number) =>
      `/api/events/${eventId}/promote-waitlist/${registrationId}`,
    EXPORT_REGISTRATIONS: (eventId: number) => `/api/events/${eventId}/export`,
    ANALYTICS: '/api/analytics',
  },
  EVENTS: {
    LIST: '/api/events',
    BY_ID: (id: number) => `/api/events/${id}`,
    CATEGORIES: '/api/events/categories',
    LOCATIONS: '/api/events/locations',
    REGISTER: (id: number) => `/api/events/${id}/register`,
    CANCEL_REGISTRATION: (id: number) => `/api/events/${id}/cancel-registration`,
  },
  NOTIFICATIONS: {
    LIST: '/api/notifications',
    MARK_READ: (id: number) => `/api/notifications/${id}/mark-read`,
  },
  REGISTRATIONS: {
    MY_REGISTRATIONS: '/api/my-registrations',
  },
} as const;
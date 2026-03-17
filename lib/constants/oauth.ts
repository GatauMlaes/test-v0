import type { OAuthProvider } from '@/types/api';

export interface OAuthProviderConfig {
  provider: OAuthProvider;
  clientId: string;
  authUrl: string;
  scope: string;
  label: string;
}

// OAuth provider configurations
export const OAUTH_PROVIDERS: Record<OAuthProvider, OAuthProviderConfig> = {
  google: {
    provider: 'google',
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    scope: 'openid email profile',
    label: 'Continue with Google',
  },
  facebook: {
    provider: 'facebook',
    clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || '',
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    scope: 'email,public_profile',
    label: 'Continue with Facebook',
  },
};

// Get OAuth redirect URI
export function getOAuthRedirectUri(provider: OAuthProvider): string {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return `${baseUrl}/auth/callback/${provider}`;
}

// Generate OAuth authorization URL
export function getOAuthAuthUrl(provider: OAuthProvider): string {
  const config = OAUTH_PROVIDERS[provider];
  const redirectUri = getOAuthRedirectUri(provider);
  
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: config.scope,
  });

  // Add provider-specific parameters
  if (provider === 'google') {
    params.append('access_type', 'offline');
    params.append('prompt', 'consent');
  }

  return `${config.authUrl}?${params.toString()}`;
}

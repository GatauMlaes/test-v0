'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

import { AuthLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { useOAuthLogin, getApiErrorMessage } from '@/features/auth/hooks';
import type { OAuthProvider } from '@/types/api';

type CallbackStatus = 'loading' | 'success' | 'error';

export default function OAuthCallbackPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const oauthLoginMutation = useOAuthLogin();
  
  const [status, setStatus] = useState<CallbackStatus>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const provider = params.provider as OAuthProvider;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  useEffect(() => {
    async function handleCallback() {
      // Handle OAuth error from provider
      if (error) {
        setStatus('error');
        setErrorMessage('Authentication was cancelled or failed. Please try again.');
        return;
      }

      // Validate authorization code
      if (!code) {
        setStatus('error');
        setErrorMessage('No authorization code received. Please try again.');
        return;
      }

      // Validate provider
      if (!['google', 'facebook'].includes(provider)) {
        setStatus('error');
        setErrorMessage('Invalid OAuth provider.');
        return;
      }

      try {
        // Exchange code for tokens via backend
        await oauthLoginMutation.mutateAsync({
          provider,
          role: 'partner',
          code,
        });
        
        setStatus('success');
        toast.success('Successfully signed in!');
        // Navigation is handled by the mutation onSuccess
      } catch (err) {
        setStatus('error');
        setErrorMessage(getApiErrorMessage(err));
      }
    }

    handleCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, error, provider]);

  const handleRetry = () => {
    router.push('/login');
  };

  return (
    <AuthLayout
      title={
        status === 'loading'
          ? 'Signing you in...'
          : status === 'success'
          ? 'Welcome!'
          : 'Authentication Failed'
      }
      subtitle={
        status === 'loading'
          ? 'Please wait while we complete your sign in.'
          : status === 'success'
          ? 'You have been successfully authenticated.'
          : errorMessage
      }
    >
      <div className="flex flex-col items-center justify-center py-8 space-y-6">
        {status === 'loading' && (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground animate-pulse">
              Processing your authentication...
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm text-muted-foreground">
              Redirecting to dashboard...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
            <Button
              onClick={handleRetry}
              className="w-full h-12 rounded-xl font-semibold"
            >
              Back to Login
            </Button>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}

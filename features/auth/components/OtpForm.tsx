'use client';

import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Spinner } from '@/components/ui/spinner';

import { otpSchema, type OtpFormData } from '../schemas';
import { useVerifyOtp, useSendOtp, getApiErrorMessage } from '../hooks';

const RESEND_TIMER_SECONDS = 60;

export function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  const [resendTimer, setResendTimer] = useState(RESEND_TIMER_SECONDS);
  const [canResend, setCanResend] = useState(false);

  const verifyMutation = useVerifyOtp();
  const resendMutation = useSendOtp();

  const form = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
      email: email,
    },
  });

  // Redirect if no email
  useEffect(() => {
    if (!email) {
      router.push('/register');
    }
  }, [email, router]);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const onSubmit = async (data: OtpFormData) => {
    try {
      await verifyMutation.mutateAsync({
        otp: data.otp,
        email: email,
      });
      toast.success('Email verified successfully!');
      router.push(`/register/complete?email=${encodeURIComponent(email)}`);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  const handleResend = useCallback(async () => {
    if (!canResend) return;
    
    try {
      await resendMutation.mutateAsync(email);
      toast.success('OTP resent to your email!');
      setResendTimer(RESEND_TIMER_SECONDS);
      setCanResend(false);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }, [canResend, email, resendMutation]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">
            We sent a verification code to
          </p>
          <p className="text-sm font-medium text-foreground">{email}</p>
        </div>

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormControl>
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={verifyMutation.isPending}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-[oklch(0.42_0.18_25)] text-primary-foreground"
          disabled={verifyMutation.isPending || form.watch('otp').length !== 6}
        >
          {verifyMutation.isPending ? (
            <>
              <Spinner className="mr-2" />
              Verifying...
            </>
          ) : (
            'Verify OTP'
          )}
        </Button>

        <div className="text-center">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              disabled={resendMutation.isPending}
              className="text-sm text-primary hover:underline font-medium disabled:opacity-50"
            >
              {resendMutation.isPending ? 'Sending...' : 'Resend OTP'}
            </button>
          ) : (
            <p className="text-sm text-muted-foreground">
              Resend OTP in {formatTime(resendTimer)}
            </p>
          )}
        </div>
      </form>
    </Form>
  );
}

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Mail, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';

import { forgotPasswordSchema, type ForgotPasswordFormData } from '../schemas';
import { useForgotPassword, getApiErrorMessage } from '../hooks';

export function ForgotPasswordForm() {
  const [emailSent, setEmailSent] = useState(false);
  const forgotPasswordMutation = useForgotPassword();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPasswordMutation.mutateAsync(data.email);
      setEmailSent(true);
      toast.success('Password reset link sent!');
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  if (emailSent) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-foreground">Check Your Email</h3>
        <p className="text-sm text-muted-foreground">
          We have sent a password reset link to your email address.
          Please check your inbox and follow the instructions.
        </p>
        <Button
          variant="outline"
          onClick={() => setEmailSent(false)}
          className="mt-4"
        >
          Try Another Email
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    disabled={forgotPasswordMutation.isPending}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-[oklch(0.42_0.18_25)] text-primary-foreground"
          disabled={forgotPasswordMutation.isPending}
        >
          {forgotPasswordMutation.isPending ? (
            <>
              <Spinner className="mr-2" />
              Sending Link...
            </>
          ) : (
            'Send Reset Link'
          )}
        </Button>
      </form>
    </Form>
  );
}

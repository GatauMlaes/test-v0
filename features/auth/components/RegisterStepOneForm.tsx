'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Mail, ArrowRight } from 'lucide-react';

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

import { registerStepOneSchema, type RegisterStepOneFormData } from '../schemas';
import { useRegisterStepOne, getApiErrorMessage } from '../hooks';
import { OAuthButtons, OAuthDivider } from './OAuthButtons';

export function RegisterStepOneForm() {
  const router = useRouter();
  const registerMutation = useRegisterStepOne();

  const form = useForm<RegisterStepOneFormData>({
    resolver: zodResolver(registerStepOneSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: RegisterStepOneFormData) => {
    try {
      await registerMutation.mutateAsync(data.email);
      toast.success('OTP sent to your email!');
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <div className="space-y-6">
      {/* OAuth Buttons */}
      <OAuthButtons disabled={registerMutation.isPending} />
      
      {/* Divider */}
      <OAuthDivider />
      
      {/* Email Registration Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">Email Address</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                    <Input
                      {...field}
                      type="email"
                      placeholder="name@company.com"
                      className="pl-11 h-12 rounded-xl border-border/60 hover:border-border focus:border-primary/50 bg-background transition-all duration-200"
                      disabled={registerMutation.isPending}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-[oklch(0.42_0.18_25)] text-primary-foreground rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] group"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? (
              <>
                <Spinner className="mr-2" />
                Sending OTP...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </>
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground pt-2">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:text-primary/80 font-semibold transition-colors duration-200 hover:underline underline-offset-2">
              Sign In
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}

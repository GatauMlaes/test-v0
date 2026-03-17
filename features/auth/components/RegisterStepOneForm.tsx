'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';

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
          className="w-full bg-primary hover:bg-[oklch(0.42_0.18_25)] text-primary-foreground"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? (
            <>
              <Spinner className="mr-2" />
              Sending OTP...
            </>
          ) : (
            'Continue'
          )}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  );
}

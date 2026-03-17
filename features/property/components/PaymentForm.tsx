'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Building, CreditCard, User } from 'lucide-react';

import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { StickyActionBar } from '@/components/layout';
import { usePropertyStore } from '@/store';
import { propertyPaymentSchema, type PropertyPaymentFormData } from '../schemas';
import { getNextStep, getStepConfig } from '@/lib/constants/onboarding';

export function PaymentForm() {
  const router = useRouter();
  const { payment, setPayment, markStepComplete } = usePropertyStore();

  const form = useForm<PropertyPaymentFormData>({
    resolver: zodResolver(propertyPaymentSchema),
    defaultValues: {
      bankName: payment.bankName || '',
      accountNumber: payment.accountNumber || '',
      accountName: payment.accountName || '',
    },
  });

  const onSubmit = (data: PropertyPaymentFormData) => {
    setPayment(data);
    markStepComplete('payment');
    
    const nextStep = getNextStep('payment');
    if (nextStep) {
      const nextStepConfig = getStepConfig(nextStep);
      if (nextStepConfig) {
        toast.success('Payment details saved!');
        router.push(nextStepConfig.path);
      }
    }
  };

  return (
    <Form {...form}>
      <form className="flex-1 flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-[900px] mx-auto space-y-8">
            {/* Payment Card */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Payment Details
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Enter your bank account details for receiving payments
              </p>

              <div className="space-y-6">
                {/* Bank Name */}
                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormDescription>
                        The name of your bank
                      </FormDescription>
                      <FormControl>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="Enter bank name"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Account Number */}
                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormDescription>
                        Your bank account number
                      </FormDescription>
                      <FormControl>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="Enter account number"
                            className="pl-10"
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '');
                              field.onChange(value);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Account Name */}
                <FormField
                  control={form.control}
                  name="accountName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Name</FormLabel>
                      <FormDescription>
                        The name registered with your bank account
                      </FormDescription>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="Enter account holder name"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Bar */}
        <StickyActionBar
          currentStep="payment"
          onSave={form.handleSubmit(onSubmit)}
          isValid={form.formState.isValid}
        />
      </form>
    </Form>
  );
}

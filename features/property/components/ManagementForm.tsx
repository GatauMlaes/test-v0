'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { User, Mail } from 'lucide-react';

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
import { propertyManagementSchema, type PropertyManagementFormData } from '../schemas';
import { getNextStep, getStepConfig } from '@/lib/constants/onboarding';

export function ManagementForm() {
  const router = useRouter();
  const { management, setManagement, markStepComplete } = usePropertyStore();

  const form = useForm<PropertyManagementFormData>({
    resolver: zodResolver(propertyManagementSchema),
    defaultValues: {
      managerName: management.managerName || '',
      managerEmail: management.managerEmail || '',
    },
  });

  const onSubmit = (data: PropertyManagementFormData) => {
    setManagement(data);
    markStepComplete('management');
    
    const nextStep = getNextStep('management');
    if (nextStep) {
      const nextStepConfig = getStepConfig(nextStep);
      if (nextStepConfig) {
        toast.success('Management details saved!');
        router.push(nextStepConfig.path);
      }
    }
  };

  return (
    <Form {...form}>
      <form className="flex-1 flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-[900px] mx-auto space-y-8">
            {/* Management Card */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Management
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Provide details about the property manager or main contact person
              </p>

              <div className="space-y-6">
                {/* Manager Name */}
                <FormField
                  control={form.control}
                  name="managerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manager Name</FormLabel>
                      <FormDescription>
                        The person responsible for managing this property
                      </FormDescription>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="Enter manager's full name"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Manager Email */}
                <FormField
                  control={form.control}
                  name="managerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manager Email</FormLabel>
                      <FormDescription>
                        Contact email for property-related communications
                      </FormDescription>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter manager's email address"
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
          currentStep="management"
          onSave={form.handleSubmit(onSubmit)}
          isValid={form.formState.isValid}
        />
      </form>
    </Form>
  );
}

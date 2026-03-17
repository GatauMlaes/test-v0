'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StickyActionBar } from '@/components/layout';
import { usePropertyStore } from '@/store';
import { propertyContactSchema, type PropertyContactFormData } from '../schemas';
import { getNextStep, getStepConfig } from '@/lib/constants/onboarding';

const COUNTRY_CODES = [
  { value: '+62', label: '+62 (Indonesia)' },
  { value: '+66', label: '+66 (Thailand)' },
  { value: '+84', label: '+84 (Vietnam)' },
  { value: '+60', label: '+60 (Malaysia)' },
  { value: '+65', label: '+65 (Singapore)' },
  { value: '+63', label: '+63 (Philippines)' },
  { value: '+1', label: '+1 (USA)' },
  { value: '+44', label: '+44 (UK)' },
];

export function PropertyContactForm() {
  const router = useRouter();
  const { contact, setContact, markStepComplete } = usePropertyStore();

  const form = useForm<PropertyContactFormData>({
    resolver: zodResolver(propertyContactSchema),
    defaultValues: {
      countryCode: contact.countryCode || '',
      phoneNumber: contact.phoneNumber || '',
    },
  });

  const onSubmit = (data: PropertyContactFormData) => {
    setContact(data);
    markStepComplete('property-contact');
    
    const nextStep = getNextStep('property-contact');
    if (nextStep) {
      const nextStepConfig = getStepConfig(nextStep);
      if (nextStepConfig) {
        toast.success('Property contact saved!');
        router.push(nextStepConfig.path);
      }
    }
  };

  return (
    <Form {...form}>
      <form className="flex-1 flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-[900px] mx-auto space-y-8">
            {/* Property Phone Number Card */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Property Phone Number
              </h2>

              <div className="grid grid-cols-[160px_1fr] gap-4">
                {/* Country Code */}
                <FormField
                  control={form.control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">Country Code</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {COUNTRY_CODES.map((code) => (
                            <SelectItem key={code.value} value={code.value}>
                              {code.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="Input number"
                          onChange={(e) => {
                            // Only allow numbers
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            field.onChange(value);
                          }}
                        />
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
          currentStep="property-contact"
          onSave={form.handleSubmit(onSubmit)}
          isValid={form.formState.isValid}
        />
      </form>
    </Form>
  );
}

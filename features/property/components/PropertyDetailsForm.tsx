'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
import { propertyDetailsSchema, type PropertyDetailsFormData } from '../schemas';
import { getNextStep, getStepConfig } from '@/lib/constants/onboarding';

const PROPERTY_TYPES = [
  { value: 'hotel', label: 'Hotel' },
  { value: 'villa', label: 'Villa' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'guest_house', label: 'Guest House' },
  { value: 'resort', label: 'Resort' },
  { value: 'hostel', label: 'Hostel' },
  { value: 'homestay', label: 'Homestay' },
  { value: 'motel', label: 'Motel' },
];

export function PropertyDetailsForm() {
  const router = useRouter();
  const { details, setDetails, markStepComplete } = usePropertyStore();

  const form = useForm<PropertyDetailsFormData>({
    resolver: zodResolver(propertyDetailsSchema),
    defaultValues: {
      name: details.name || '',
      localName: details.localName || '',
      noLocalName: details.noLocalName || false,
      propertyType: details.propertyType,
    },
  });

  const noLocalName = form.watch('noLocalName');

  // Reset local name when checkbox is checked
  useEffect(() => {
    if (noLocalName) {
      form.setValue('localName', '');
    }
  }, [noLocalName, form]);

  const onSubmit = (data: PropertyDetailsFormData) => {
    setDetails(data);
    markStepComplete('property-details');
    
    const nextStep = getNextStep('property-details');
    if (nextStep) {
      const nextStepConfig = getStepConfig(nextStep);
      if (nextStepConfig) {
        toast.success('Property details saved!');
        router.push(nextStepConfig.path);
      }
    }
  };

  return (
    <Form {...form}>
      <form className="flex-1 flex flex-col">
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-[900px] mx-auto space-y-6 md:space-y-8">
            {/* Property Details Card */}
            <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-5 sm:p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-6 md:mb-8 tracking-tight">
                Property Details
              </h2>

              <div className="space-y-6 md:space-y-7">
                {/* Property Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Type your property name using alphanumeric characters."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Property Name in Local Language */}
                <FormField
                  control={form.control}
                  name="localName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Name in Local Language</FormLabel>
                      <FormDescription className="text-primary text-sm">
                        Fill in this field if you have a different property name in your local language
                      </FormDescription>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Type your property name using your local writing system."
                          disabled={noLocalName}
                          className={noLocalName ? 'bg-muted' : ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* No Local Name Checkbox */}
                <FormField
                  control={form.control}
                  name="noLocalName"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start gap-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal text-primary cursor-pointer">
                        {"This property doesn't have a different name in my local language"}
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {/* Property Type */}
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property type</FormLabel>
                      <div className="flex items-center justify-between gap-4 p-4 md:p-5 border border-border/60 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors duration-200">
                        <span className="text-sm text-primary font-medium">
                          Select your property type
                        </span>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value || undefined}
                        >
                          <FormControl>
                            <SelectTrigger className="w-auto min-w-[140px] rounded-lg border-border/60 hover:border-primary/50 transition-colors">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl shadow-lg border-border/60">
                            {PROPERTY_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value} className="rounded-lg cursor-pointer">
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
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
          currentStep="property-details"
          onSave={form.handleSubmit(onSubmit)}
          isValid={form.formState.isValid}
        />
      </form>
    </Form>
  );
}

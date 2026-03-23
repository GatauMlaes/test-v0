'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormSection, StepIndicator } from '@/features/common/components';
import { hotelBasicInfoSchema, type HotelBasicInfoData } from '@/features/hotel/schemas';
import { useHotelFormStore } from '@/store/hotelStore';

const steps = ['Basic Info', 'Facilities', 'Rooms', 'Contact', 'Assets', 'Review'];
const currentStepIndex = 0;

export function HotelBasicInfoStep() {
  const router = useRouter();
  const { formData, updateFormData, setCurrentStep } = useHotelFormStore();

  const form = useForm<HotelBasicInfoData>({
    resolver: zodResolver(hotelBasicInfoSchema),
    defaultValues: {
      name: (formData.name as string) || '',
      description: (formData.description as string) || '',
      country: (formData.country as string) || '',
      province: (formData.province as string) || '',
      city: (formData.city as string) || '',
      address: (formData.address as string) || '',
      postal_code: (formData.postal_code as string) || '',
      latitude: (formData.latitude as number) || 0,
      longitude: (formData.longitude as number) || 0,
    },
  });

  const onSubmit = (data: HotelBasicInfoData) => {
    updateFormData(data);
    setCurrentStep('facilities');
  };

  return (
    <div className="space-y-8">
      <StepIndicator currentStep={currentStepIndex} totalSteps={steps.length} stepNames={steps} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormSection
            title="Basic Information"
            description="Tell us about your hotel"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hotel Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., Grand Hotel Resort"
                      className="h-11 rounded-xl border-border/60 focus:border-primary/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe your hotel, its unique features, and what guests can expect..."
                      className="min-h-24 rounded-xl border-border/60 focus:border-primary/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          <FormSection
            title="Location"
            description="Where is your hotel located?"
          >
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., Indonesia"
                      className="h-11 rounded-xl border-border/60 focus:border-primary/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., Bali"
                        className="h-11 rounded-xl border-border/60 focus:border-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., Denpasar"
                        className="h-11 rounded-xl border-border/60 focus:border-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., Jalan Pantai Kuta No. 123"
                      className="h-11 rounded-xl border-border/60 focus:border-primary/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="postal_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="80361"
                        className="h-11 rounded-xl border-border/60 focus:border-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="-8.6854"
                        className="h-11 rounded-xl border-border/60 focus:border-primary/50"
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="115.2126"
                        className="h-11 rounded-xl border-border/60 focus:border-primary/50"
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FormSection>

          <div className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="h-12 px-6 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 gap-2 rounded-xl group"
            >
              Next Step
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

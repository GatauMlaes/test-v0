'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Search } from 'lucide-react';

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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { StickyActionBar } from '@/components/layout';
import { usePropertyStore } from '@/store';
import { propertyAddressSchema, type PropertyAddressFormData } from '../schemas';
import { getNextStep, getStepConfig } from '@/lib/constants/onboarding';

const COUNTRIES = [
  { value: 'ID', label: 'Indonesia' },
  { value: 'TH', label: 'Thailand' },
  { value: 'VN', label: 'Vietnam' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'SG', label: 'Singapore' },
  { value: 'PH', label: 'Philippines' },
];

const LOCATIONS = [
  { value: 'jakarta', label: 'Jakarta, Indonesia' },
  { value: 'bali', label: 'Bali, Indonesia' },
  { value: 'bandung', label: 'Bandung, Indonesia' },
  { value: 'surabaya', label: 'Surabaya, Indonesia' },
  { value: 'yogyakarta', label: 'Yogyakarta, Indonesia' },
  { value: 'bangkok', label: 'Bangkok, Thailand' },
  { value: 'phuket', label: 'Phuket, Thailand' },
  { value: 'hochiminh', label: 'Ho Chi Minh City, Vietnam' },
  { value: 'hanoi', label: 'Hanoi, Vietnam' },
  { value: 'kualalumpur', label: 'Kuala Lumpur, Malaysia' },
];

export function PropertyAddressForm() {
  const router = useRouter();
  const { address, setAddress, markStepComplete } = usePropertyStore();
  const [locationOpen, setLocationOpen] = useState(false);

  const form = useForm<PropertyAddressFormData>({
    resolver: zodResolver(propertyAddressSchema),
    defaultValues: {
      country: address.country || '',
      location: address.location || '',
      streetAddress: address.streetAddress || '',
      postalCode: address.postalCode || '',
    },
  });

  const selectedLocation = form.watch('location');

  const onSubmit = (data: PropertyAddressFormData) => {
    setAddress(data);
    markStepComplete('property-address');
    
    const nextStep = getNextStep('property-address');
    if (nextStep) {
      const nextStepConfig = getStepConfig(nextStep);
      if (nextStepConfig) {
        toast.success('Property address saved!');
        router.push(nextStepConfig.path);
      }
    }
  };

  return (
    <Form {...form}>
      <form className="flex-1 flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-[900px] mx-auto space-y-8">
            {/* Property Address Card */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Property Address
              </h2>

              <div className="space-y-6">
                {/* Country */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {COUNTRIES.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Location */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">Location</FormLabel>
                      <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search location"
                                className="pl-10 cursor-pointer"
                                value={
                                  LOCATIONS.find((l) => l.value === selectedLocation)
                                    ?.label || ''
                                }
                                readOnly
                              />
                            </div>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search location..." />
                            <CommandList>
                              <CommandEmpty>No location found.</CommandEmpty>
                              <CommandGroup>
                                {LOCATIONS.map((location) => (
                                  <CommandItem
                                    key={location.value}
                                    value={location.label}
                                    onSelect={() => {
                                      field.onChange(location.value);
                                      setLocationOpen(false);
                                    }}
                                  >
                                    {location.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Property Phone Number Card - preview for next step */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Property Phone Number
              </h2>

              <div className="grid grid-cols-[120px_1fr] gap-4">
                <div>
                  <FormLabel className="text-muted-foreground text-sm">Country Code</FormLabel>
                  <div className="mt-2 h-10 bg-muted rounded-md" />
                </div>
                <div>
                  <FormLabel className="text-muted-foreground text-sm">Phone Number</FormLabel>
                  <Input
                    placeholder="Input number"
                    className="mt-2"
                    disabled
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                You will fill this in the next step
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Action Bar */}
        <StickyActionBar
          currentStep="property-address"
          onSave={form.handleSubmit(onSubmit)}
          isValid={form.formState.isValid}
        />
      </form>
    </Form>
  );
}

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { StickyActionBar } from '@/components/layout';
import { usePropertyStore } from '@/store';
import { propertyContractSchema, type PropertyContractFormData } from '../schemas';

export function ContractForm() {
  const router = useRouter();
  const { contract, setContract, markStepComplete } = usePropertyStore();

  const form = useForm<PropertyContractFormData>({
    resolver: zodResolver(propertyContractSchema),
    defaultValues: {
      agreed: contract.agreed || false,
    },
  });

  const onSubmit = (data: PropertyContractFormData) => {
    setContract(data);
    markStepComplete('contract');
    toast.success('Property registration complete!');
    router.push('/dashboard');
  };

  return (
    <Form {...form}>
      <form className="flex-1 flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-[900px] mx-auto space-y-8">
            {/* Contract Card */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Terms and Conditions
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Please review and accept the terms and conditions to complete your registration
              </p>

              {/* Contract Content */}
              <div className="bg-muted rounded-lg p-4 mb-6 max-h-[400px] overflow-y-auto">
                <h3 className="font-medium text-foreground mb-4">
                  Nusago Partner Agreement
                </h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    This Partner Agreement ("Agreement") is entered into between Nusago 
                    ("Company") and the property owner/manager ("Partner") who registers 
                    their property on the Nusago Partner platform.
                  </p>
                  <h4 className="font-medium text-foreground">1. Services</h4>
                  <p>
                    The Company provides a platform for Partners to list and manage their 
                    properties, receive bookings, and process payments from guests.
                  </p>
                  <h4 className="font-medium text-foreground">2. Partner Obligations</h4>
                  <p>
                    Partner agrees to provide accurate and up-to-date information about 
                    their property, maintain appropriate standards of service, and comply 
                    with all applicable laws and regulations.
                  </p>
                  <h4 className="font-medium text-foreground">3. Commission and Payments</h4>
                  <p>
                    The Company will collect payments from guests and remit to Partner 
                    the booking amount less the agreed commission rate. Payments will be 
                    processed according to the payment schedule outlined in the Partner dashboard.
                  </p>
                  <h4 className="font-medium text-foreground">4. Cancellation Policy</h4>
                  <p>
                    Partner agrees to honor the cancellation policy set for their property. 
                    Any disputes will be handled according to the dispute resolution process.
                  </p>
                  <h4 className="font-medium text-foreground">5. Liability</h4>
                  <p>
                    Partner is responsible for the safety and condition of their property. 
                    The Company is not liable for any incidents that occur at the property.
                  </p>
                  <h4 className="font-medium text-foreground">6. Termination</h4>
                  <p>
                    Either party may terminate this Agreement with 30 days written notice. 
                    All pending bookings must be honored.
                  </p>
                </div>
              </div>

              {/* Agreement Checkbox */}
              <FormField
                control={form.control}
                name="agreed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start gap-3 rounded-lg border border-border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer">
                        I have read and agree to the Terms and Conditions
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        By checking this box, you confirm that you have read, understood, 
                        and agree to be bound by the Partner Agreement.
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Sticky Action Bar */}
        <StickyActionBar
          currentStep="contract"
          onSave={form.handleSubmit(onSubmit)}
          isValid={form.formState.isValid}
        />
      </form>
    </Form>
  );
}

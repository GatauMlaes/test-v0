import { z } from 'zod';

export const propertyDetailsSchema = z.object({
  name: z
    .string()
    .min(2, 'Property name must be at least 2 characters')
    .max(200, 'Property name must be less than 200 characters')
    .regex(/^[a-zA-Z0-9\s\-'&]+$/, 'Please use alphanumeric characters only'),
  localName: z.string().optional(),
  noLocalName: z.boolean(),
  propertyType: z
    .enum(['hotel', 'villa', 'apartment', 'guest_house', 'resort', 'hostel', 'homestay', 'motel'])
    .nullable()
    .refine((val) => val !== null, {
      message: 'Please select a property type',
    }),
}).refine(
  (data) => data.noLocalName || (data.localName && data.localName.length >= 2),
  {
    message: 'Local name is required when checkbox is not checked',
    path: ['localName'],
  }
);

export const propertyAddressSchema = z.object({
  country: z.string().min(1, 'Please select a country'),
  location: z.string().min(2, 'Please enter or select a location'),
  streetAddress: z.string().optional(),
  postalCode: z.string().optional(),
});

export const propertyContactSchema = z.object({
  countryCode: z.string().min(1, 'Please select a country code'),
  phoneNumber: z
    .string()
    .min(6, 'Phone number must be at least 6 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .regex(/^\d+$/, 'Phone number must contain only numbers'),
});

export const propertyManagementSchema = z.object({
  managerName: z.string().optional(),
  managerEmail: z.string().email('Please enter a valid email').optional().or(z.literal('')),
});

export const propertyPaymentSchema = z.object({
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  accountName: z.string().optional(),
});

export const propertyContractSchema = z.object({
  agreed: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

// Type exports
export type PropertyDetailsFormData = z.infer<typeof propertyDetailsSchema>;
export type PropertyAddressFormData = z.infer<typeof propertyAddressSchema>;
export type PropertyContactFormData = z.infer<typeof propertyContactSchema>;
export type PropertyManagementFormData = z.infer<typeof propertyManagementSchema>;
export type PropertyPaymentFormData = z.infer<typeof propertyPaymentSchema>;
export type PropertyContractFormData = z.infer<typeof propertyContractSchema>;

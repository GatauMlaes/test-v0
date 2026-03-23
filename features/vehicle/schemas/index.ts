import { z } from 'zod';

// Vehicle Basic Info Step
export const vehicleBasicInfoSchema = z.object({
  type: z.enum(['car', 'motorcycle', 'van', 'bus'], {
    errorMap: () => ({ message: 'Select a valid vehicle type' }),
  }),
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1, 'Invalid year'),
  color: z.string().min(1, 'Color is required'),
  license_plate: z.string().min(1, 'License plate is required'),
  capacity: z.number().int().min(1, 'Capacity must be at least 1'),
  price_per_day: z.number().min(0, 'Price must be greater than 0'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
});

export type VehicleBasicInfoData = z.infer<typeof vehicleBasicInfoSchema>;

// Vehicle Specifications Step
export const vehicleSpecSchema = z.object({
  key: z.string().min(1, 'Specification key is required'),
  value: z.string().min(1, 'Specification value is required'),
});

export const vehicleSpecificationsSchema = z.object({
  specifications: z.array(vehicleSpecSchema).optional(),
});

export type VehicleSpecData = z.infer<typeof vehicleSpecSchema>;
export type VehicleSpecificationsData = z.infer<typeof vehicleSpecificationsSchema>;

// Vehicle Contact Step
export const vehicleContactSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  province: z.string().min(1, 'Province is required'),
  city: z.string().min(1, 'City is required'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  postal_code: z.string().regex(/^\d+$/, 'Postal code must contain only numbers'),
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
});

export type VehicleContactData = z.infer<typeof vehicleContactSchema>;

// Vehicle Assets Step
export const vehicleAssetsSchema = z.object({
  images: z.array(z.string()).min(1, 'Upload at least one image'),
  documents: z.array(z.string()).optional(),
});

export type VehicleAssetsData = z.infer<typeof vehicleAssetsSchema>;

// Complete Vehicle Form
export const createVehicleSchema = z.object({
  ...vehicleBasicInfoSchema.shape,
  ...vehicleSpecificationsSchema.shape,
  ...vehicleContactSchema.shape,
  ...vehicleAssetsSchema.shape,
});

export type CreateVehicleFormData = z.infer<typeof createVehicleSchema>;

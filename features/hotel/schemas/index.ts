import { z } from 'zod';

// Hotel Basic Info Step
export const hotelBasicInfoSchema = z.object({
  name: z.string().min(3, 'Hotel name must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  country: z.string().min(1, 'Country is required'),
  province: z.string().min(1, 'Province is required'),
  city: z.string().min(1, 'City is required'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  postal_code: z.string().regex(/^\d+$/, 'Postal code must contain only numbers'),
  latitude: z.number().min(-90).max(90, 'Invalid latitude'),
  longitude: z.number().min(-180).max(180, 'Invalid longitude'),
});

export type HotelBasicInfoData = z.infer<typeof hotelBasicInfoSchema>;

// Hotel Facilities Step
export const hotelFacilitySchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Facility name is required'),
});

export const hotelFacilitiesSchema = z.object({
  amenities: z.array(hotelFacilitySchema).min(1, 'Select at least one amenity'),
});

export type HotelFacilitiesData = z.infer<typeof hotelFacilitiesSchema>;

// Hotel Rooms Step
export const hotelRoomSchema = z.object({
  room_type: z.string().min(1, 'Room type is required'),
  total_rooms: z.number().int().min(1, 'Total rooms must be at least 1'),
  price_per_night: z.number().min(0, 'Price must be greater than 0'),
  bed_type: z.string().min(1, 'Bed type is required'),
  capacity: z.number().int().min(1, 'Capacity must be at least 1'),
});

export const hotelRoomsSchema = z.object({
  rooms: z.array(hotelRoomSchema).min(1, 'Add at least one room type'),
});

export type HotelRoomData = z.infer<typeof hotelRoomSchema>;
export type HotelRoomsData = z.infer<typeof hotelRoomsSchema>;

// Hotel Contact Step
export const hotelContactSchema = z.object({
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  check_in_time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
  check_out_time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
});

export type HotelContactData = z.infer<typeof hotelContactSchema>;

// Hotel Assets Step
export const hotelAssetsSchema = z.object({
  images: z.array(z.string()).min(1, 'Upload at least one image'),
  documents: z.array(z.string()).optional(),
});

export type HotelAssetsData = z.infer<typeof hotelAssetsSchema>;

// Complete Hotel Form
export const createHotelSchema = z.object({
  ...hotelBasicInfoSchema.shape,
  ...hotelFacilitiesSchema.shape,
  ...hotelRoomsSchema.shape,
  ...hotelContactSchema.shape,
  ...hotelAssetsSchema.shape,
});

export type CreateHotelFormData = z.infer<typeof createHotelSchema>;

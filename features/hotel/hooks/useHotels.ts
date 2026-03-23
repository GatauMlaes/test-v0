import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/constants/api';
import { notification } from '@/lib/services/notification';
import type { Hotel, CreateHotelRequest, UpdateHotelRequest, PaginatedResponse } from '@/types/api';

const hotelKeys = {
  all: ['hotels'] as const,
  lists: () => [...hotelKeys.all, 'list'] as const,
  list: (page: number, size: number, search?: string) =>
    [...hotelKeys.lists(), { page, size, search }] as const,
  details: () => [...hotelKeys.all, 'detail'] as const,
  detail: (id: string) => [...hotelKeys.details(), id] as const,
};

// Hooks for hotel operations
export function useHotels(page: number = 1, size: number = 10, search?: string) {
  return useQuery({
    queryKey: hotelKeys.list(page, size, search),
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        ...(search && { search }),
      });

      const response = await apiClient.get<PaginatedResponse<Hotel>>(
        `${API_ENDPOINTS.HOTELS_LIST}?${params}`
      );

      return response.data;
    },
  });
}

export function useHotelDetail(id: string) {
  return useQuery({
    queryKey: hotelKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<{ data: Hotel }>(
        API_ENDPOINTS.HOTEL_DETAIL(id)
      );
      return response.data.data;
    },
    enabled: !!id,
  });
}

export function useCreateHotel() {
  return useMutation({
    mutationFn: async (data: CreateHotelRequest) => {
      const response = await apiClient.post<{ data: Hotel }>(
        API_ENDPOINTS.HOTEL_CREATE,
        data
      );
      return response.data.data;
    },
    onSuccess: () => {
      notification.showSuccess('Hotel created successfully');
    },
    onError: () => {
      notification.showError('Failed to create hotel');
    },
  });
}

export function useUpdateHotel(id: string) {
  return useMutation({
    mutationFn: async (data: UpdateHotelRequest) => {
      const response = await apiClient.put<{ data: Hotel }>(
        API_ENDPOINTS.HOTEL_UPDATE(id),
        data
      );
      return response.data.data;
    },
    onSuccess: () => {
      notification.showSuccess('Hotel updated successfully');
    },
    onError: () => {
      notification.showError('Failed to update hotel');
    },
  });
}

export function useDeleteHotel() {
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(API_ENDPOINTS.HOTEL_DELETE(id));
    },
    onSuccess: () => {
      notification.showSuccess('Hotel deleted successfully');
    },
    onError: () => {
      notification.showError('Failed to delete hotel');
    },
  });
}

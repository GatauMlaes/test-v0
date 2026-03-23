import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/constants/api';
import { notification } from '@/lib/services/notification';
import type { Vehicle, CreateVehicleRequest, UpdateVehicleRequest, PaginatedResponse } from '@/types/api';

const vehicleKeys = {
  all: ['vehicles'] as const,
  lists: () => [...vehicleKeys.all, 'list'] as const,
  list: (page: number, size: number, search?: string) =>
    [...vehicleKeys.lists(), { page, size, search }] as const,
  details: () => [...vehicleKeys.all, 'detail'] as const,
  detail: (id: string) => [...vehicleKeys.details(), id] as const,
};

export function useVehicles(page: number = 1, size: number = 10, search?: string) {
  return useQuery({
    queryKey: vehicleKeys.list(page, size, search),
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        ...(search && { search }),
      });

      const response = await apiClient.get<PaginatedResponse<Vehicle>>(
        `${API_ENDPOINTS.VEHICLES_LIST}?${params}`
      );

      return response.data;
    },
  });
}

export function useVehicleDetail(id: string) {
  return useQuery({
    queryKey: vehicleKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<{ data: Vehicle }>(
        API_ENDPOINTS.VEHICLE_DETAIL(id)
      );
      return response.data.data;
    },
    enabled: !!id,
  });
}

export function useCreateVehicle() {
  return useMutation({
    mutationFn: async (data: CreateVehicleRequest) => {
      const response = await apiClient.post<{ data: Vehicle }>(
        API_ENDPOINTS.VEHICLE_CREATE,
        data
      );
      return response.data.data;
    },
    onSuccess: () => {
      notification.showSuccess('Vehicle created successfully');
    },
    onError: () => {
      notification.showError('Failed to create vehicle');
    },
  });
}

export function useUpdateVehicle(id: string) {
  return useMutation({
    mutationFn: async (data: UpdateVehicleRequest) => {
      const response = await apiClient.put<{ data: Vehicle }>(
        API_ENDPOINTS.VEHICLE_UPDATE(id),
        data
      );
      return response.data.data;
    },
    onSuccess: () => {
      notification.showSuccess('Vehicle updated successfully');
    },
    onError: () => {
      notification.showError('Failed to update vehicle');
    },
  });
}

export function useDeleteVehicle() {
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(API_ENDPOINTS.VEHICLE_DELETE(id));
    },
    onSuccess: () => {
      notification.showSuccess('Vehicle deleted successfully');
    },
    onError: () => {
      notification.showError('Failed to delete vehicle');
    },
  });
}

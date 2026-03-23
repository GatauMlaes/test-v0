import { create } from 'zustand';
import type { CreateVehicleFormData } from '@/features/vehicle/schemas';

interface VehicleFormState {
  currentStep: 'basic-info' | 'specifications' | 'contact' | 'assets' | 'review';
  formData: Partial<CreateVehicleFormData>;
  isLoading: boolean;
  error: string | null;

  // Actions
  setCurrentStep: (step: VehicleFormState['currentStep']) => void;
  updateFormData: (data: Partial<CreateVehicleFormData>) => void;
  setFormData: (data: Partial<CreateVehicleFormData>) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetForm: () => void;
}

export const useVehicleFormStore = create<VehicleFormState>((set) => ({
  currentStep: 'basic-info',
  formData: {},
  isLoading: false,
  error: null,

  setCurrentStep: (step) => set({ currentStep: step }),

  updateFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),

  setFormData: (data) => set({ formData: data }),

  setIsLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  resetForm: () =>
    set({
      currentStep: 'basic-info',
      formData: {},
      isLoading: false,
      error: null,
    }),
}));

// Separate store for vehicle list and management
interface VehicleListState {
  vehicles: any[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  page: number;
  pageSize: number;
  total: number;

  // Actions
  setVehicles: (vehicles: any[]) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  setPagination: (page: number, pageSize: number, total: number) => void;
  reset: () => void;
}

export const useVehicleListStore = create<VehicleListState>((set) => ({
  vehicles: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  page: 1,
  pageSize: 10,
  total: 0,

  setVehicles: (vehicles) => set({ vehicles }),

  setIsLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  setSearchQuery: (query) => set({ searchQuery: query, page: 1 }),

  setPage: (page) => set({ page }),

  setPagination: (page, pageSize, total) =>
    set({ page, pageSize, total }),

  reset: () =>
    set({
      vehicles: [],
      isLoading: false,
      error: null,
      searchQuery: '',
      page: 1,
      pageSize: 10,
      total: 0,
    }),
}));

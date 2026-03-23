import { create } from 'zustand';
import type { CreateHotelFormData } from '@/features/hotel/schemas';

interface HotelFormState {
  currentStep: 'basic-info' | 'facilities' | 'rooms' | 'contact' | 'assets' | 'review';
  formData: Partial<CreateHotelFormData>;
  isLoading: boolean;
  error: string | null;

  // Actions
  setCurrentStep: (step: HotelFormState['currentStep']) => void;
  updateFormData: (data: Partial<CreateHotelFormData>) => void;
  setFormData: (data: Partial<CreateHotelFormData>) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetForm: () => void;
}

export const useHotelFormStore = create<HotelFormState>((set) => ({
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

// Separate store for hotel list and management
interface HotelListState {
  hotels: any[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  page: number;
  pageSize: number;
  total: number;

  // Actions
  setHotels: (hotels: any[]) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  setPagination: (page: number, pageSize: number, total: number) => void;
  reset: () => void;
}

export const useHotelListStore = create<HotelListState>((set) => ({
  hotels: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  page: 1,
  pageSize: 10,
  total: 0,

  setHotels: (hotels) => set({ hotels }),

  setIsLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  setSearchQuery: (query) => set({ searchQuery: query, page: 1 }),

  setPage: (page) => set({ page }),

  setPagination: (page, pageSize, total) =>
    set({ page, pageSize, total }),

  reset: () =>
    set({
      hotels: [],
      isLoading: false,
      error: null,
      searchQuery: '',
      page: 1,
      pageSize: 10,
      total: 0,
    }),
}));

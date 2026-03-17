import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  PropertyDetails,
  PropertyAddress,
  PropertyContact,
  PropertyManagement,
  PropertyPayment,
  PropertyContract,
  OnboardingStep,
} from '@/types/property';

interface PropertyState {
  // Form data
  details: PropertyDetails;
  address: PropertyAddress;
  contact: PropertyContact;
  management: PropertyManagement;
  payment: PropertyPayment;
  contract: PropertyContract;

  // Navigation state
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];

  // Actions
  setDetails: (details: Partial<PropertyDetails>) => void;
  setAddress: (address: Partial<PropertyAddress>) => void;
  setContact: (contact: Partial<PropertyContact>) => void;
  setManagement: (management: Partial<PropertyManagement>) => void;
  setPayment: (payment: Partial<PropertyPayment>) => void;
  setContract: (contract: Partial<PropertyContract>) => void;
  setCurrentStep: (step: OnboardingStep) => void;
  markStepComplete: (step: OnboardingStep) => void;
  resetProperty: () => void;
}

const initialDetails: PropertyDetails = {
  name: '',
  localName: '',
  noLocalName: false,
  propertyType: null,
};

const initialAddress: PropertyAddress = {
  country: '',
  location: '',
  streetAddress: '',
  postalCode: '',
};

const initialContact: PropertyContact = {
  countryCode: '',
  phoneNumber: '',
};

const initialManagement: PropertyManagement = {
  managerName: '',
  managerEmail: '',
};

const initialPayment: PropertyPayment = {
  bankName: '',
  accountNumber: '',
  accountName: '',
};

const initialContract: PropertyContract = {
  agreed: false,
};

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set) => ({
      details: initialDetails,
      address: initialAddress,
      contact: initialContact,
      management: initialManagement,
      payment: initialPayment,
      contract: initialContract,
      currentStep: 'property-details',
      completedSteps: [],

      setDetails: (details) =>
        set((state) => ({
          details: { ...state.details, ...details },
        })),

      setAddress: (address) =>
        set((state) => ({
          address: { ...state.address, ...address },
        })),

      setContact: (contact) =>
        set((state) => ({
          contact: { ...state.contact, ...contact },
        })),

      setManagement: (management) =>
        set((state) => ({
          management: { ...state.management, ...management },
        })),

      setPayment: (payment) =>
        set((state) => ({
          payment: { ...state.payment, ...payment },
        })),

      setContract: (contract) =>
        set((state) => ({
          contract: { ...state.contract, ...contract },
        })),

      setCurrentStep: (step) =>
        set({
          currentStep: step,
        }),

      markStepComplete: (step) =>
        set((state) => ({
          completedSteps: state.completedSteps.includes(step)
            ? state.completedSteps
            : [...state.completedSteps, step],
        })),

      resetProperty: () =>
        set({
          details: initialDetails,
          address: initialAddress,
          contact: initialContact,
          management: initialManagement,
          payment: initialPayment,
          contract: initialContract,
          currentStep: 'property-details',
          completedSteps: [],
        }),
    }),
    {
      name: 'nusago-property-storage',
    }
  )
);

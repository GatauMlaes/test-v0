// Property Types
export type PropertyType = 
  | 'hotel'
  | 'villa'
  | 'apartment'
  | 'guest_house'
  | 'resort'
  | 'hostel'
  | 'homestay'
  | 'motel';

export interface PropertyDetails {
  name: string;
  localName: string;
  noLocalName: boolean;
  propertyType: PropertyType | null;
}

export interface PropertyAddress {
  country: string;
  location: string;
  streetAddress?: string;
  postalCode?: string;
}

export interface PropertyContact {
  countryCode: string;
  phoneNumber: string;
}

export interface PropertyManagement {
  managerName?: string;
  managerEmail?: string;
}

export interface PropertyPayment {
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
}

export interface PropertyContract {
  agreed: boolean;
}

export interface PropertyOnboardingData {
  details: PropertyDetails;
  address: PropertyAddress;
  contact: PropertyContact;
  management: PropertyManagement;
  payment: PropertyPayment;
  contract: PropertyContract;
}

// Step Navigation Types
export type OnboardingStep = 
  | 'property-details'
  | 'property-address'
  | 'property-contact'
  | 'management'
  | 'payment'
  | 'contract';

export interface OnboardingStepConfig {
  id: OnboardingStep;
  label: string;
  path: string;
  parent?: string;
}

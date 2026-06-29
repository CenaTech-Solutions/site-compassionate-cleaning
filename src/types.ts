export type ServiceType = 
  | 'gentle-reset' 
  | 'maintenance' 
  | 'deep-transition' 
  | 'neurodivergent' 
  | 'custom-care';

export type ContactMethod = 'email' | 'text' | 'call';

export type BoroughType = 
  | 'manhattan' 
  | 'brooklyn' 
  | 'queens' 
  | 'bronx' 
  | 'staten-island' 
  | 'out-of-area';

export interface IntakeSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: ServiceType;
  preferredContact: ContactMethod;
  borough: BoroughType;
  message: string;
  preferences: {
    quietVisit: boolean;
    anxiousPets: boolean;
    scentSensitive: boolean;
    traumaInformed: boolean;
  };
  submittedAt: string;
  preferredDate?: string;
  preferredTime?: string;
  status: 'received' | 'reviewing' | 'matched';
}

export interface FeelingOption {
  id: string;
  emoji: string;
  label: string;
  message: string;
  validation: string;
  recommendation: {
    title: string;
    description: string;
    serviceType: ServiceType;
  };
}

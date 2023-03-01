import { ReactNode } from 'react';

export interface ICustomAccordion {
  accordionSummary: string;
  icon?: ReactNode;
  accordionDetails: {
    icon: ReactNode;
    name: string;
    path: string;
    nested?: string;
  }[];
}

export interface IPayloadProfile {
  fullName: string;
  birthDay: string;
  city: string;
  address: string;
  phone: string;
  gender: string;
  id_user?: string;
  email: string;
}

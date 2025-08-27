// User data types
export interface UserDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  employmentStatus: 'Student' | 'Full time' | 'Part time';
  annualIncome: number;
  houseNumber: string;
  postcode: string;
  avatar?: string; // Optional avatar URL
}

// Credit card types
export interface CreditCard {
  id: string;
  name: string;
  apr: number;
  balanceTransferOfferDuration: number; // months
  purchaseOfferDuration: number; // months
  creditAvailable: number; // pounds
  description: string;
}

// Eligibility rule types
export type EligibilityRule = (user: UserDetails) => boolean;

export interface CreditCardWithRules extends CreditCard {
  eligibilityRules: EligibilityRule[];
}
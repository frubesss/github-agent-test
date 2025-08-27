import { UserDetails } from '../types';
import { generateAvatarUrl } from '../utils/avatarUtils';

// Test customer data from the problem statement
export const testCustomers: UserDetails[] = [
  {
    firstName: 'Ollie',
    lastName: 'Murphree',
    dateOfBirth: '1970-07-01',
    employmentStatus: 'Full time',
    annualIncome: 34000,
    houseNumber: '700',
    postcode: 'BS14 9PR',
    avatar: generateAvatarUrl('Ollie', 'Murphree')
  },
  {
    firstName: 'Elizabeth',
    lastName: 'Edmundson',
    dateOfBirth: '1984-06-29',
    employmentStatus: 'Student',
    annualIncome: 17000,
    houseNumber: '177',
    postcode: 'PH12 8UW',
    avatar: generateAvatarUrl('Elizabeth', 'Edmundson')
  },
  {
    firstName: 'Trevor',
    lastName: 'Rieck',
    dateOfBirth: '1990-09-07',
    employmentStatus: 'Part time',
    annualIncome: 15000,
    houseNumber: '343',
    postcode: 'TS25 2NF',
    avatar: generateAvatarUrl('Trevor', 'Rieck')
  }
];
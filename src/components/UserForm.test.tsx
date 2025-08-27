import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserForm from '../components/UserForm';
import { testCustomers } from '../data/testCustomers';

describe('UserForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnLoadTestCustomer = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnLoadTestCustomer.mockClear();
  });

  test('renders form with all required fields', () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/employment status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/annual income/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/house number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/postcode/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /find my credit cards/i })).toBeInTheDocument();
  });

  test('displays test customer buttons when test customers are provided', () => {
    render(
      <UserForm 
        onSubmit={mockOnSubmit} 
        onLoadTestCustomer={mockOnLoadTestCustomer}
        testCustomers={testCustomers} 
      />
    );
    
    expect(screen.getByText('Ollie Murphree')).toBeInTheDocument();
    expect(screen.getByText('Elizabeth Edmundson')).toBeInTheDocument();
    expect(screen.getByText('Trevor Rieck')).toBeInTheDocument();
  });

  test('loads test customer data when test customer button is clicked', () => {
    render(
      <UserForm 
        onSubmit={mockOnSubmit} 
        onLoadTestCustomer={mockOnLoadTestCustomer}
        testCustomers={testCustomers} 
      />
    );
    
    fireEvent.click(screen.getByText('Ollie Murphree'));
    
    expect(screen.getByDisplayValue('Ollie')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Murphree')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Full time')).toBeInTheDocument();
    expect(screen.getByDisplayValue('34000')).toBeInTheDocument();
  });

  test('shows validation errors for empty required fields', async () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /find my credit cards/i }));
    });
    
    expect(screen.getByText('First name is required')).toBeInTheDocument();
    expect(screen.getByText('Last name is required')).toBeInTheDocument();
    expect(screen.getByText('Date of birth is required')).toBeInTheDocument();
    expect(screen.getByText('Annual income must be greater than 0')).toBeInTheDocument();
    expect(screen.getByText('House number is required')).toBeInTheDocument();
    expect(screen.getByText('Postcode is required')).toBeInTheDocument();
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('submits form with valid data', async () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/date of birth/i), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByLabelText(/employment status/i), { target: { value: 'Full time' } });
    fireEvent.change(screen.getByLabelText(/annual income/i), { target: { value: '25000' } });
    fireEvent.change(screen.getByLabelText(/house number/i), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/postcode/i), { target: { value: 'AB12 3CD' } });
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /find my credit cards/i }));
    });
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      employmentStatus: 'Full time',
      annualIncome: 25000,
      houseNumber: '123',
      postcode: 'AB12 3CD'
    });
  });

  test('clears error when user starts typing in field with error', async () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    // Trigger validation
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /find my credit cards/i }));
    });
    expect(screen.getByText('First name is required')).toBeInTheDocument();
    
    // Start typing in first name field
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'J' } });
    });
    
    // Error should be cleared
    expect(screen.queryByText('First name is required')).not.toBeInTheDocument();
  });
});
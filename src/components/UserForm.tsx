import React from 'react';
import { useForm } from '@tanstack/react-form';
import { UserDetails } from '../types';
import './UserForm.css';

interface UserFormProps {
  onSubmit: (userDetails: UserDetails) => void;
  onLoadTestCustomer?: (customer: UserDetails) => void;
  testCustomers?: UserDetails[];
}

const UserForm: React.FC<UserFormProps> = ({ 
  onSubmit, 
  onLoadTestCustomer, 
  testCustomers = [] 
}) => {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      employmentStatus: 'Full time' as UserDetails['employmentStatus'],
      annualIncome: 0,
      houseNumber: '',
      postcode: ''
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  const handleLoadTestCustomer = (customer: UserDetails) => {
    form.setFieldValue('firstName', customer.firstName);
    form.setFieldValue('lastName', customer.lastName);
    form.setFieldValue('dateOfBirth', customer.dateOfBirth);
    form.setFieldValue('employmentStatus', customer.employmentStatus);
    form.setFieldValue('annualIncome', customer.annualIncome);
    form.setFieldValue('houseNumber', customer.houseNumber);
    form.setFieldValue('postcode', customer.postcode);
    
    if (onLoadTestCustomer) {
      onLoadTestCustomer(customer);
    }
  };

  return (
    <div className="user-form">
      <h2>Enter Your Details</h2>
      
      {testCustomers.length > 0 && (
        <div className="test-customers">
          <h3>Quick Test</h3>
          <p>Load test customer data:</p>
          <div className="test-customer-buttons">
            {testCustomers.map((customer, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleLoadTestCustomer(customer)}
                className="test-customer-btn"
              >
                {customer.firstName} {customer.lastName}
              </button>
            ))}
          </div>
        </div>
      )}

      <form 
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }} 
        className="form"
      >
        <div className="form-row">
          <form.Field
            name="firstName"
            validators={{
              onSubmit: ({ value }) =>
                !value || !value.trim() ? 'First name is required' : undefined,
              onChange: ({ value, fieldApi }) => {
                // Clear error if the field was touched and now has value
                if (fieldApi.state.meta.errors.length > 0 && value && value.trim()) {
                  return undefined;
                }
                return;
              },
            }}
            children={(field) => (
              <div className="form-group">
                <label htmlFor={field.name}>First Name *</label>
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={field.state.meta.errors.length ? 'error' : ''}
                />
                {field.state.meta.errors.length > 0 && (
                  <span className="error-message">{field.state.meta.errors[0]}</span>
                )}
              </div>
            )}
          />

          <form.Field
            name="lastName"
            validators={{
              onSubmit: ({ value }) =>
                !value || !value.trim() ? 'Last name is required' : undefined,
              onChange: ({ value, fieldApi }) => {
                // Clear error if the field was touched and now has value
                if (fieldApi.state.meta.errors.length > 0 && value && value.trim()) {
                  return undefined;
                }
                return;
              },
            }}
            children={(field) => (
              <div className="form-group">
                <label htmlFor={field.name}>Last Name *</label>
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={field.state.meta.errors.length ? 'error' : ''}
                />
                {field.state.meta.errors.length > 0 && (
                  <span className="error-message">{field.state.meta.errors[0]}</span>
                )}
              </div>
            )}
          />
        </div>

        <form.Field
          name="dateOfBirth"
          validators={{
            onSubmit: ({ value }) =>
              !value ? 'Date of birth is required' : undefined,
          }}
          children={(field) => (
            <div className="form-group">
              <label htmlFor={field.name}>Date of Birth *</label>
              <input
                type="date"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={field.state.meta.errors.length ? 'error' : ''}
              />
              {field.state.meta.errors.length > 0 && (
                <span className="error-message">{field.state.meta.errors[0]}</span>
              )}
            </div>
          )}
        />

        <form.Field
          name="employmentStatus"
          children={(field) => (
            <div className="form-group">
              <label htmlFor={field.name}>Employment Status *</label>
              <select
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value as UserDetails['employmentStatus'])}
              >
                <option value="Full time">Full time</option>
                <option value="Part time">Part time</option>
                <option value="Student">Student</option>
              </select>
            </div>
          )}
        />

        <form.Field
          name="annualIncome"
          validators={{
            onSubmit: ({ value }) =>
              value <= 0 ? 'Annual income must be greater than 0' : undefined,
          }}
          children={(field) => (
            <div className="form-group">
              <label htmlFor={field.name}>Annual Income (£) *</label>
              <input
                type="number"
                id={field.name}
                name={field.name}
                value={field.state.value || ''}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                min="0"
                step="1000"
                className={field.state.meta.errors.length ? 'error' : ''}
              />
              {field.state.meta.errors.length > 0 && (
                <span className="error-message">{field.state.meta.errors[0]}</span>
              )}
            </div>
          )}
        />

        <div className="form-row">
          <form.Field
            name="houseNumber"
            validators={{
              onSubmit: ({ value }) =>
                !value || !value.trim() ? 'House number is required' : undefined,
            }}
            children={(field) => (
              <div className="form-group">
                <label htmlFor={field.name}>House Number *</label>
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={field.state.meta.errors.length ? 'error' : ''}
                />
                {field.state.meta.errors.length > 0 && (
                  <span className="error-message">{field.state.meta.errors[0]}</span>
                )}
              </div>
            )}
          />

          <form.Field
            name="postcode"
            validators={{
              onSubmit: ({ value }) =>
                !value || !value.trim() ? 'Postcode is required' : undefined,
            }}
            children={(field) => (
              <div className="form-group">
                <label htmlFor={field.name}>Postcode *</label>
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={field.state.meta.errors.length ? 'error' : ''}
                />
                {field.state.meta.errors.length > 0 && (
                  <span className="error-message">{field.state.meta.errors[0]}</span>
                )}
              </div>
            )}
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
        >
          Find My Credit Cards
        </button>
      </form>
    </div>
  );
};

export default UserForm;
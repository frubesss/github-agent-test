import React, { useState } from 'react';
import { UserDetails } from '../types';
import { isDevToolsEnabled } from '../utils/urlUtils';
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
  const [formData, setFormData] = useState<UserDetails>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    employmentStatus: 'Full time',
    annualIncome: 0,
    houseNumber: '',
    postcode: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (formData.annualIncome <= 0) newErrors.annualIncome = 'Annual income must be greater than 0';
    if (!formData.houseNumber.trim()) newErrors.houseNumber = 'House number is required';
    if (!formData.postcode.trim()) newErrors.postcode = 'Postcode is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'annualIncome' ? Number(value) : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleLoadTestCustomer = (customer: UserDetails) => {
    setFormData(customer);
    setErrors({});
    if (onLoadTestCustomer) {
      onLoadTestCustomer(customer);
    }
  };

  return (
    <div className="user-form">
      <h2>Enter Your Details</h2>
      
      {testCustomers.length > 0 && isDevToolsEnabled() && (
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

      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={errors.firstName ? 'error' : ''}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={errors.lastName ? 'error' : ''}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth *</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className={errors.dateOfBirth ? 'error' : ''}
          />
          {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="employmentStatus">Employment Status *</label>
          <select
            id="employmentStatus"
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleInputChange}
          >
            <option value="Full time">Full time</option>
            <option value="Part time">Part time</option>
            <option value="Student">Student</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="annualIncome">Annual Income (£) *</label>
          <input
            type="number"
            id="annualIncome"
            name="annualIncome"
            value={formData.annualIncome || ''}
            onChange={handleInputChange}
            min="0"
            step="1000"
            className={errors.annualIncome ? 'error' : ''}
          />
          {errors.annualIncome && <span className="error-message">{errors.annualIncome}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="houseNumber">House Number *</label>
            <input
              type="text"
              id="houseNumber"
              name="houseNumber"
              value={formData.houseNumber}
              onChange={handleInputChange}
              className={errors.houseNumber ? 'error' : ''}
            />
            {errors.houseNumber && <span className="error-message">{errors.houseNumber}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="postcode">Postcode *</label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              value={formData.postcode}
              onChange={handleInputChange}
              className={errors.postcode ? 'error' : ''}
            />
            {errors.postcode && <span className="error-message">{errors.postcode}</span>}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Find My Credit Cards
        </button>
      </form>
    </div>
  );
};

export default UserForm;
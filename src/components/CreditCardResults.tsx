import React, { useState } from 'react';
import { CreditCardWithRules, UserDetails } from '../types';
import { calculateTotalCredit, formatCurrency } from '../utils/cardUtils';
import CreditCard from './CreditCard';
import Avatar from './Avatar';
import './CreditCardResults.css';

interface CreditCardResultsProps {
  user: UserDetails;
  eligibleCards: CreditCardWithRules[];
  onStartOver: () => void;
}

const CreditCardResults: React.FC<CreditCardResultsProps> = ({
  user,
  eligibleCards,
  onStartOver
}) => {
  const [selectedCardIds, setSelectedCardIds] = useState<Set<string>>(new Set());

  const selectedCards = eligibleCards.filter(card => 
    selectedCardIds.has(card.id)
  );

  const totalCredit = calculateTotalCredit(selectedCards);

  const handleToggleSelect = (cardId: string) => {
    setSelectedCardIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedCardIds.size === eligibleCards.length) {
      setSelectedCardIds(new Set());
    } else {
      setSelectedCardIds(new Set(eligibleCards.map(card => card.id)));
    }
  };

  if (eligibleCards.length === 0) {
    return (
      <div className="results-container">
        <div className="no-results">
          <div className="user-greeting">
            <Avatar 
              firstName={user.firstName} 
              lastName={user.lastName}
              src={user.avatar}
              size="large"
            />
            <div>
              <h2>No Eligible Cards Found</h2>
              <p>
                Unfortunately, {user.firstName} {user.lastName}, you don't meet the 
                eligibility criteria for any of our current credit cards.
              </p>
            </div>
          </div>
          <button onClick={onStartOver} className="start-over-btn">
            Try Different Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <div className="user-greeting">
          <Avatar 
            firstName={user.firstName} 
            lastName={user.lastName}
            src={user.avatar}
            size="large"
          />
          <div>
            <h2>Your Eligible Credit Cards</h2>
            <p>
              Hello {user.firstName} {user.lastName}! Based on your details, 
              you're eligible for {eligibleCards.length} credit card
              {eligibleCards.length === 1 ? '' : 's'}.
            </p>
          </div>
        </div>
        <button onClick={onStartOver} className="start-over-btn secondary">
          Start Over
        </button>
      </div>

      <div className="selection-controls">
        <button 
          onClick={handleSelectAll}
          className="select-all-btn"
        >
          {selectedCardIds.size === eligibleCards.length ? 'Deselect All' : 'Select All'}
        </button>
        
        {selectedCards.length > 0 && (
          <div className="total-credit">
            <span className="total-label">Total Credit Available:</span>
            <span className="total-amount">{formatCurrency(totalCredit)}</span>
          </div>
        )}
      </div>

      <div className="cards-grid">
        {eligibleCards.map(card => (
          <CreditCard
            key={card.id}
            card={card}
            isSelected={selectedCardIds.has(card.id)}
            onToggleSelect={handleToggleSelect}
          />
        ))}
      </div>

      {selectedCards.length > 0 && (
        <div className="selected-summary">
          <h3>Selected Cards Summary</h3>
          <div className="summary-grid">
            {selectedCards.map(card => (
              <div key={card.id} className="summary-item">
                <span className="summary-name">{card.name}</span>
                <span className="summary-credit">{formatCurrency(card.creditAvailable)}</span>
              </div>
            ))}
            <div className="summary-total">
              <span className="summary-name">Total Available Credit</span>
              <span className="summary-credit total">{formatCurrency(totalCredit)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditCardResults;
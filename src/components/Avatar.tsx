import React from 'react';
import { generateAvatarUrl, getInitials } from '../utils/avatarUtils';
import './Avatar.css';

interface AvatarProps {
  firstName: string;
  lastName: string;
  src?: string; // Optional custom avatar URL
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  firstName, 
  lastName, 
  src, 
  size = 'medium',
  className = ''
}) => {
  const avatarUrl = src || generateAvatarUrl(firstName, lastName, getSizePixels(size));
  const initials = getInitials(firstName, lastName);
  const fullName = `${firstName} ${lastName}`;
  
  return (
    <div className={`avatar avatar-${size} ${className}`}>
      <img
        src={avatarUrl}
        alt={`${fullName}'s avatar`}
        title={fullName}
        className="avatar-image"
        onError={(e) => {
          // Fallback to initials if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent && !parent.querySelector('.avatar-fallback')) {
            const fallback = document.createElement('div');
            fallback.className = 'avatar-fallback';
            fallback.textContent = initials;
            parent.appendChild(fallback);
          }
        }}
      />
    </div>
  );
};

const getSizePixels = (size: 'small' | 'medium' | 'large'): number => {
  switch (size) {
    case 'small': return 32;
    case 'medium': return 48;
    case 'large': return 64;
    default: return 48;
  }
};

export default Avatar;
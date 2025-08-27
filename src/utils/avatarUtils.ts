/**
 * Utility functions for generating user avatars
 */

/**
 * Generate avatar URL using UI Avatars service
 * @param firstName User's first name
 * @param lastName User's last name
 * @param size Avatar size in pixels (default: 100)
 * @returns Avatar URL
 */
export const generateAvatarUrl = (
  firstName: string, 
  lastName: string, 
  size: number = 100
): string => {
  const name = `${firstName}+${lastName}`;
  
  // Using UI Avatars service with a professional color scheme
  return `https://ui-avatars.com/api/?name=${name}&size=${size}&background=6366f1&color=white&bold=true&format=png`;
};

/**
 * Get initials from a name
 * @param firstName User's first name
 * @param lastName User's last name
 * @returns User initials
 */
export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};
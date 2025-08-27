/**
 * Utility functions for URL parameter handling
 */

/**
 * Check if dev tools is enabled via query parameter
 * Looks for ?devtools=true or ?dev=true in the URL
 */
export const isDevToolsEnabled = (): boolean => {
  if (typeof window === 'undefined') {
    return false; // SSR safe
  }
  
  const params = new URLSearchParams(window.location.search);
  return params.get('devtools') === 'true' || params.get('dev') === 'true';
};

/**
 * Get a specific query parameter value
 */
export const getQueryParam = (param: string): string | null => {
  if (typeof window === 'undefined') {
    return null; // SSR safe
  }
  
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
};
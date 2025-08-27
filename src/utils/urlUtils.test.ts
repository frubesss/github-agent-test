import { isDevToolsEnabled, getQueryParam } from './urlUtils';

// Mock window.location
const mockLocation = (search: string) => {
  // @ts-ignore
  delete window.location;
  window.location = { search } as Location;
};

describe('urlUtils', () => {
  beforeEach(() => {
    // Reset location
    mockLocation('');
  });

  describe('isDevToolsEnabled', () => {
    it('should return false when no query parameters', () => {
      mockLocation('');
      expect(isDevToolsEnabled()).toBe(false);
    });

    it('should return true when devtools=true', () => {
      mockLocation('?devtools=true');
      expect(isDevToolsEnabled()).toBe(true);
    });

    it('should return true when dev=true', () => {
      mockLocation('?dev=true');
      expect(isDevToolsEnabled()).toBe(true);
    });

    it('should return false when devtools=false', () => {
      mockLocation('?devtools=false');
      expect(isDevToolsEnabled()).toBe(false);
    });

    it('should return false when dev=false', () => {
      mockLocation('?dev=false');
      expect(isDevToolsEnabled()).toBe(false);
    });

    it('should return true when devtools=true with other parameters', () => {
      mockLocation('?foo=bar&devtools=true&baz=qux');
      expect(isDevToolsEnabled()).toBe(true);
    });

    it('should return true when dev=true with other parameters', () => {
      mockLocation('?foo=bar&dev=true&baz=qux');
      expect(isDevToolsEnabled()).toBe(true);
    });
  });

  describe('getQueryParam', () => {
    it('should return null when parameter does not exist', () => {
      mockLocation('?foo=bar');
      expect(getQueryParam('nonexistent')).toBe(null);
    });

    it('should return parameter value when it exists', () => {
      mockLocation('?foo=bar&baz=qux');
      expect(getQueryParam('foo')).toBe('bar');
      expect(getQueryParam('baz')).toBe('qux');
    });

    it('should return null when no query parameters', () => {
      mockLocation('');
      expect(getQueryParam('foo')).toBe(null);
    });
  });
});
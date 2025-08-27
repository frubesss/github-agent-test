import { generateAvatarUrl, getInitials } from './avatarUtils';

describe('avatarUtils', () => {
  describe('generateAvatarUrl', () => {
    test('generates correct URL with default size', () => {
      const url = generateAvatarUrl('John', 'Doe');
      expect(url).toBe('https://ui-avatars.com/api/?name=John+Doe&size=100&background=6366f1&color=white&bold=true&format=png');
    });

    test('generates correct URL with custom size', () => {
      const url = generateAvatarUrl('Jane', 'Smith', 50);
      expect(url).toBe('https://ui-avatars.com/api/?name=Jane+Smith&size=50&background=6366f1&color=white&bold=true&format=png');
    });

    test('handles names with spaces', () => {
      const url = generateAvatarUrl('Mary Jane', 'Watson');
      expect(url).toBe('https://ui-avatars.com/api/?name=Mary Jane+Watson&size=100&background=6366f1&color=white&bold=true&format=png');
    });
  });

  describe('getInitials', () => {
    test('returns correct initials for regular names', () => {
      expect(getInitials('John', 'Doe')).toBe('JD');
    });

    test('returns correct initials for names with lowercase', () => {
      expect(getInitials('jane', 'smith')).toBe('JS');
    });

    test('handles single character names', () => {
      expect(getInitials('A', 'B')).toBe('AB');
    });

    test('handles empty names gracefully', () => {
      expect(getInitials('', 'Doe')).toBe('D');
      expect(getInitials('John', '')).toBe('J');
    });
  });
});
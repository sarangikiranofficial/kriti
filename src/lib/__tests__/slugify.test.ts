import { describe, it, expect } from 'vitest';
import { generateSlug } from '../slugify';

describe('generateSlug', () => {
  it('converts standard Latin names and art forms into URL-friendly slugs', () => {
    expect(generateSlug('Narayan Marar', 'Kerala Mural')).toBe('narayan-marar-kerala-mural');
    expect(generateSlug('Sunita Devi', 'Madhubani')).toBe('sunita-devi-madhubani');
  });

  it('strips accents and combining diacritical marks', () => {
    expect(generateSlug('Jivya Soma Mâshé', 'Warli')).toBe('jivya-soma-mashe-warli');
  });

  it('handles special punctuation, symbols, and extra whitespace', () => {
    expect(generateSlug('  Bapu   Chitrakar & Sons!  ', 'Pattachitra (Odisha)')).toBe(
      'bapu-chitrakar-sons-pattachitra-odisha'
    );
  });

  it('provides a deterministic, clean hash slug when name is purely in non-Latin regional script', () => {
    const slug = generateSlug('നാരായണൻ മാരാർ');
    expect(slug).toMatch(/^artist-[a-z0-9]+$/);
    expect(slug.length).toBeGreaterThan(6);
  });

  it('handles empty or whitespace-only inputs without crashing', () => {
    const slug = generateSlug('   ');
    expect(slug).toMatch(/^artist-[a-z0-9]+$/);
  });
});

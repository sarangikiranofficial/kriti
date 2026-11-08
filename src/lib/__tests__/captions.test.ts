import { describe, it, expect } from 'vitest';
import { generateCaption } from '../captions';
import type { Artwork, Artist } from '../../types/database.types';

const mockArtist: Artist = {
  id: 'artist-123',
  slug: 'narayan-marar-kerala-mural',
  name: 'Narayan Marar',
  name_regional: 'നാരായണൻ മാരാർ',
  art_form: 'Kerala Mural',
  location_state: 'Kerala',
  location_district: 'Thrissur',
  bio: 'Traditional temple mural artist preserving natural mineral pigments.',
  languages_spoken: ['Malayalam', 'English'],
  portrait_url: 'https://example.com/portrait.jpg',
  whatsapp_number: '+919876543210',
  phone: '+919876543210',
  instagram: '@narayanmurals',
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
};

const mockArtwork: Artwork = {
  id: 'artwork-456',
  artist_id: 'artist-123',
  title: 'Tree of Life',
  title_regional: 'ജീവവൃക്ഷം',
  image_url: 'https://example.com/tree-of-life.jpg',
  image_alt: 'Traditional Kerala mural depicting tree of life with peacocks',
  medium: 'Natural vegetable dyes on handmade canvas',
  year: '2024',
  dimensions: '24 x 36 inches',
  price: 25000,
  is_price_on_request: false,
  availability: 'available',
  cultural_context: 'Depicts the eternal sacred banyan tree symbolizing cosmic continuity in ancient Kerala murals.',
  ownership_declared: true,
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
};

describe('generateCaption', () => {
  it('generates Malayalam captions with regional title and cultural context in story tone', () => {
    const caption = generateCaption({
      language: 'ml',
      tone: 'story',
      artwork: mockArtwork,
      artist: mockArtist,
      portfolioUrl: 'https://kriti.art/a/narayan-marar-kerala-mural',
    });

    expect(caption).toContain('ജീവവൃക്ഷം');
    expect(caption).toContain('നാരായണൻ മാരാർ');
    expect(caption).toContain('Kerala Mural');
    expect(caption).toContain(mockArtwork.cultural_context);
    expect(caption).toContain('https://kriti.art/a/narayan-marar-kerala-mural');
    expect(caption).toContain('#KeralaArt');
  });

  it('generates English captions in announcement tone with material details', () => {
    const caption = generateCaption({
      language: 'en',
      tone: 'announcement',
      artwork: mockArtwork,
      artist: mockArtist,
      portfolioUrl: 'https://kriti.art/a/narayan-marar-kerala-mural',
    });

    expect(caption).toContain('Tree of Life');
    expect(caption).toContain('Narayan Marar');
    expect(caption).toContain('Natural vegetable dyes on handmade canvas');
    expect(caption).toContain('24 x 36 inches');
    expect(caption).toContain('#IndianArt');
  });

  it('generates English captions in story tone with Kriti branding', () => {
    const caption = generateCaption({
      language: 'en',
      tone: 'story',
      artwork: mockArtwork,
      artist: mockArtist,
      portfolioUrl: 'https://kriti.art/a/narayan-marar-kerala-mural',
    });

    expect(caption).toContain('Tree of Life');
    expect(caption).toContain('Kriti');
    expect(caption).toContain('#Kriti');
  });

  it('generates Hindi captions in commission tone', () => {
    const caption = generateCaption({
      language: 'hi',
      tone: 'commission',
      artwork: mockArtwork,
      artist: mockArtist,
      portfolioUrl: 'https://kriti.art/a/narayan-marar-kerala-mural',
    });

    expect(caption).toContain('पारंपरिक Kerala Mural');
    expect(caption).toContain('Narayan Marar');
    expect(caption).toContain('Thrissur, Kerala');
    expect(caption).toContain('#ArtCommission');
  });

  it('generates Tamil captions in story tone', () => {
    const caption = generateCaption({
      language: 'ta',
      tone: 'story',
      artwork: mockArtwork,
      artist: mockArtist,
      portfolioUrl: 'https://kriti.art/a/narayan-marar-kerala-mural',
    });

    expect(caption).toContain('பாரம்பரியக் கலையின் தொன்மை');
    expect(caption).toContain('Tree of Life');
    expect(caption).toContain('Narayan Marar');
    expect(caption).toContain('#TamilArt');
  });
});

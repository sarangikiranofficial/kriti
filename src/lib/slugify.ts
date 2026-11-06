/**
 * Creates a clean, URL-safe slug from an artist name and optional art form.
 * Handles spaces, accents, punctuation, and non-Latin characters.
 */
export function generateSlug(name: string, artForm?: string): string {
  if (!name || !name.trim()) {
    return `artist-${Math.random().toString(36).substring(2, 8)}`;
  }

  const base = `${name} ${artForm || ''}`.trim();

  // Normalize Unicode characters (NFKD) and strip combining diacritical marks
  const normalized = base
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

  // Replace non-alphanumeric chars (excluding hyphens) with hyphens
  let slug = normalized
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // If name was entirely in non-Latin script (e.g. Malayalam or Devanagari)
  // slug might be empty after regex. In that case, generate a clean fallback with phonetic/hash.
  if (!slug || slug.length < 2) {
    const hash = Math.abs(
      name.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
    ).toString(36);
    slug = `artist-${hash.substring(0, 6)}`;
  }

  return slug;
}

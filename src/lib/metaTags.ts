/**
 * Dynamically updates document title and Open Graph meta tags for client-side routing.
 * Ensures previews render properly on social media and chat apps when links are shared.
 */
export interface MetaTagProps {
  title: string;
  description: string;
  image?: string | null;
  url?: string;
}

export function updateMetaTags({ title, description, image, url }: MetaTagProps) {
  // Update document title
  document.title = title;

  // Helper to set or create a meta tag
  const setMeta = (nameOrProperty: 'name' | 'property', key: string, content: string) => {
    let element = document.querySelector(`meta[${nameOrProperty}="${key}"]`) as HTMLMetaElement | null;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(nameOrProperty, key);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // Standard metadata
  setMeta('name', 'description', description);

  // Open Graph metadata
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:type', 'website');
  if (url) {
    setMeta('property', 'og:url', url);
  }
  if (image) {
    setMeta('property', 'og:image', image);
  }

  // Twitter metadata
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  if (image) {
    setMeta('name', 'twitter:image', image);
  }
}

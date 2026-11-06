/**
 * Kala Katha Application Configuration
 * All product naming, branding, and metadata can be edited here in a single place.
 */

export const APP_CONFIG = {
  name: 'Kala Katha',
  workingTitle: 'Kala Katha',
  tagline: 'From Craft to Click — Cultural Stories of Traditional Indian Art',
  shortTagline: 'From Craft to Click',
  description:
    'A digital platform empowering traditional Indian folk, tribal, and classical artists to create professional portfolios, preserve the cultural context of their craft, and share their stories with the world.',
  socialShareHashtags: ['#IndianArt', '#TraditionalArt', '#KalaKatha', '#FolkArt', '#HeritageCrafts'],
  contactEmail: 'hello@kalakatha.art',
  languages: [
    { code: 'en', label: 'English', speechCode: 'en-IN' },
    { code: 'ml', label: 'മലയാളം (Malayalam)', speechCode: 'ml-IN' },
    { code: 'hi', label: 'हिन्दी (Hindi)', speechCode: 'hi-IN' },
    { code: 'ta', label: 'தமிழ் (Tamil)', speechCode: 'ta-IN' },
  ],
  defaultLanguage: 'en',
  defaultSpeechLanguage: 'en-IN',
  maxUploadSizeBytes: 5 * 1024 * 1024, // 5 MB
  acceptedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
};
